export const runMonteCarlo = (initial: number, years: number, volatility: number) => {
  const results = [];
  for (let i = 0; i < 5; i++) {
    let current = initial;
    const path = [];
    for (let y = 0; y <= years; y++) {
      const growth = 1 + (Math.random() * volatility - volatility / 2);
      current *= growth;
      path.push(current);
    }
    results.push(path);
  }
  return results;
};
