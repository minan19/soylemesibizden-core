export const calculateYieldDensity = (assets: any[]) => {
  return assets.map(asset => {
    const score = (asset.roiNum * asset.iq) / 100;
    return { ...asset, densityScore: score.toFixed(2) };
  });
};
