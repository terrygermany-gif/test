export function activeSectionAtReadingLine(positions:readonly {id:string;top:number}[],readingLine:number,atEnd=false){
 if(atEnd)return positions[positions.length-1]?.id;
 let active=positions[0]?.id;
 for(const section of positions){if(section.top<=readingLine)active=section.id;}
 return active;
}
