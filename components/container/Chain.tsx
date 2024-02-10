import Image from "next/image";

async function getImageUrl(icon: string) {
  const res = await fetch(
    `https://raw.githubusercontent.com/ethereum-lists/chains/master/_data/icons/${icon}.json`
  );
  const data = await res.json();
  return data.url;
}

export async function ChainCard({
  name,
  url,
}: {
  name: string;
  url: string;
}) {
  return (
    <>
      <Image
        src={await getImageUrl(url)}
        width={24}
        height={24}
        alt={name}
        className="rounded-md"
      />
      {name}
    </>
  );
}
