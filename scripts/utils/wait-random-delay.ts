export const waitForRandomDelay = ([minMs, maxMs]: [number, number]) => {
  // maxMs should be > minMs or error
  if (maxMs <= minMs) {
    throw new Error("maxMs should be greater than minMs");
  }

  const delay = Math.floor(Math.random() * (maxMs - minMs + 1) + minMs);
  console.log(`Waiting for a random delay of ${delay} ms`);

  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};
