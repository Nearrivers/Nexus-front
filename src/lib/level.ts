const levelThresholds = [
  300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000, 85000, 100000,
  120000, 140000, 165000, 195000, 225000, 265000, 305000, 355000,
];

export function getLevel(totalXp: number): number {
  let level = 1;

  for (let i = 0; i <= levelThresholds.length; i++) {
    const threshold = levelThresholds[i];

    if (totalXp < threshold) {
      return level;
    }

    level++;
  }

  return level;
}

export function getNextLevelNeededXp(totalXp: number): number {
  const level = getLevel(totalXp);

  if (level === 20) {
    return 0;
  }

  const nextLevelThreshold = levelThresholds[level - 1];

  return nextLevelThreshold - totalXp;
}
