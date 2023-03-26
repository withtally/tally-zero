enum ProposalState {
  Pending,
  Active,
  Canceled,
  Defeated,
  Succeeded,
  Queued,
  Expired,
  Executed,
}

function getProposalState(stateNumber: number): string | undefined {
  const stateKeys = Object.keys(ProposalState).filter(
    (k) => typeof ProposalState[k as any] === "number"
  ) as (keyof typeof ProposalState)[];

  const stateKey = stateKeys.find((key) => ProposalState[key] === stateNumber);
  if (stateKey !== undefined) {
    return stateKey;
  } else {
    return undefined;
  }
}

export { getProposalState, ProposalState };
