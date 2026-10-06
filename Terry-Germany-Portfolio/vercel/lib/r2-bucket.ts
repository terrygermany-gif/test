import { createHash, createHmac } from 'node:crypto';
export const storageConfigured=()=>['R2_ENDPOINT','R2_BUCKET','R2_ACCESS_KEY_ID','R2_SECRET_ACCESS_KEY'].every(key=>!!process.env[key]);
const sha256=(value:string|Buffer)=>createHash('sha256').update(value).digest('hex');
const hmac=(key:string|Buffer,value:string)=>createHmac('sha256',key).update(value).digest();
const encode=(s:string)=>encodeURIComponent(s).replace(/[!'()*]/g,c=>`%${c.charCodeAt(0).toString(16).toUpperCase()}`);
export async function r2Request(method:string,key:string,body?:Buffer,extra:Record<string,string>={}) {
 if(!storageConfigured())throw new Error('R2 storage is not configured.');
 const endpoint=new URL(process.env.R2_ENDPOINT!);
 if(endpoint.protocol!=='https:' || !/^[a-z0-9.-]+\.r2\.cloudflarestorage\.com$/.test(endpoint.hostname))throw new Error('Use your HTTPS R2 S3 endpoint.');
 const path='/'+[process.env.R2_BUCKET!,...key.split('/')].map(encode).join('/');
 const timestamp=new Date().toISOString().replace(/[:-]|\.\d{3}/g,'');const day=timestamp.slice(0,8);
 const payloadHash=sha256(body??Buffer.alloc(0));
 const headers:Record<string,string>={...extra,host:endpoint.host,'x-amz-date':timestamp,'x-amz-content-sha256':payloadHash};
 const names=Object.keys(headers).sort();const signed=names.join(';');
 const canonical=[method,path,'',names.map(name=>`${name}:${headers[name].trim()}\n`).join(''),signed,payloadHash].join('\n');
 const scope=`${day}/auto/s3/aws4_request`;
 const signingKey=hmac(hmac(hmac(hmac(`AWS4${process.env.R2_SECRET_ACCESS_KEY}`,day),'auto'),'s3'),'aws4_request');
 const signature=createHmac('sha256',signingKey).update(`AWS4-HMAC-SHA256\n${timestamp}\n${scope}\n${sha256(canonical)}`).digest('hex');
 headers.authorization=`AWS4-HMAC-SHA256 Credential=${process.env.R2_ACCESS_KEY_ID}/${scope}, SignedHeaders=${signed}, Signature=${signature}`;
 const response=await fetch(endpoint.origin+path,{method,headers,body:body?new Uint8Array(body):undefined,cache:'no-store',signal:AbortSignal.timeout(30000)});
 if(response.status===412||response.status===409)throw new Error('conflict');
 if(!response.ok&&response.status!==404)throw new Error(`Storage request failed (${response.status}).`);
 return response;
}
export const r2Bucket={
 async head(key:string){if(!storageConfigured())return null;const response=await r2Request('HEAD',key);if(response.status===404)return null;return {size:Number(response.headers.get('content-length')),httpEtag:response.headers.get('etag')??'',writeHttpMetadata(headers:Headers){headers.set('Content-Type',response.headers.get('content-type')??'application/octet-stream');}};},
 async get(key:string,options?:{range?:{offset:number;length:number}}){if(!storageConfigured())return null;const range=options?.range;const response=await r2Request('GET',key,undefined,range?{range:`bytes=${range.offset}-${range.offset+range.length-1}`} : {});if(response.status===404)return null;if(range&&response.status!==206)throw new Error('Range request failed');return {body:response.body,json:async<T>()=>await response.json() as T};},
 async put(key:string,body:string|ReadableStream<Uint8Array>|null,options?:{httpMetadata?:{contentType:string}}){if(body===null)throw new Error('Empty media');const buffer=typeof body==='string'?Buffer.from(body):Buffer.from(await new Response(body).arrayBuffer());return r2Request('PUT',key,buffer,{'content-type':options?.httpMetadata?.contentType??'application/octet-stream'});},
 async delete(key:string){return r2Request('DELETE',key);}
};
