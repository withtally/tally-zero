import { daos } from "@config/data";
import Image from "next/image";

export function NetworkIcon({
  address,
  className,
}: {
  address: string;
  className?: string;
}) {
  const dao = daos.find((dao) =>
    dao.ethAddresses.some((ethAddress) => ethAddress === address?.toLowerCase())
  );
  return (
    <div className="flex items-center space-x-3 cursor-pointer">
      <Image
        src={dao?.imageUrl || "/favicon/favicon.ico"}
        alt={dao?.name || "Tally Zero"}
        width={50}
        height={50}
        className={className}
        layout="fixed"
      />
      {dao?.name || "Tally Zero"}
    </div>
  );
}
