const solution = (timestamps) => {
  if (!timestamps.length) return [];

  timestamps.sort((a, b) => a.startPx - b.startPx);

  const result = [];
  let currentInterval = timestamps[0];

  for (let i = 1; i < timestamps.length; i++) {
    const interval = timestamps[i];

    if (currentInterval.endPx >= interval.startPx) {
      currentInterval.endPx = Math.max(currentInterval.endPx, interval.endPx);
    } else {
      result.push(currentInterval);
      currentInterval = interval;
    }
  }

  result.push(currentInterval);

  return result;
};

//generate some test cases
const testCases = [
  [
    { startPx: 10, endPx: 30 },
    { startPx: 20, endPx: 40 },
    { startPx: 60, endPx: 80 },
  ],
  [
    { startPx: 10, endPx: 30 },
    { startPx: 20, endPx: 40 },
    { startPx: 60, endPx: 80 },
    { startPx: 70, endPx: 90 },
  ],
  [
    { startPx: 10, endPx: 30 },
    { startPx: 20, endPx: 40 },
    { startPx: 60, endPx: 80 },
    { startPx: 70, endPx: 90 },
    { startPx: 85, endPx: 100 },
    { startPx: 95, endPx: 110 },
  ],
  [],
  [{ startPx: 10, endPx: 30 }],
  [
    { startPx: 10, endPx: 30 },
    { startPx: 40, endPx: 50 },
  ],
];

//run test cases
testCases.forEach((test, index) => {
  console.log(`Test case ${index + 1}:`);
  console.log(solution(test));
  console.log();
});
