import Portfolio from "@/components/portfolio";
export default async function Home({searchParams}:{searchParams:Promise<{hero?:string}>}) {
  const params=await searchParams;
  return <Portfolio heroVariant={params.hero==="original"?"original":"showcase"}/>;
}
