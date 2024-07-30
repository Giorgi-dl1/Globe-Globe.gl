import dynamic from "next/dynamic";

export default function Home() {
  const Globe = dynamic(() => import("../components/Map2"), {
    ssr: false,
  });
  return (
    <main>
      <Globe />
    </main>
  );
}
