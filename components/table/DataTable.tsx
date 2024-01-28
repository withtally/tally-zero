import { ParsedProposal } from "@/types/proposal";

export default function DataTable({
  proposals,
  notActive,
}: {
  proposals: ParsedProposal[];
  notActive: ParsedProposal[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Active Proposals</h2>
      <div className="flex flex-col gap-4">
        {proposals.map((proposal) => (
          <div key={proposal.id}>
            <p className="text-lg font-bold">{proposal.id}</p>
            <p className="text-sm">{proposal.description}</p>
          </div>
        ))}
      </div>
      <h2 className="text-2xl font-bold">Not Active Proposals</h2>
      <div className="flex flex-col gap-4">
        {notActive.map((proposal) => (
          <div key={proposal.id}>
            <p className="text-lg font-bold">{proposal.id}</p>
            <p className="text-sm">{proposal.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
