export function truncateWithEllipsis(input: string, maxLength: number): string {
    if (input.length <= maxLength) {
      return input;
    }
  
    const halfLength = Math.floor((maxLength - 3) / 2);
    return input.slice(0, halfLength) + '...' + input.slice(-halfLength);
  }