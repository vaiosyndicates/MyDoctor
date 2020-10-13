export const uniqueId =
  Math.random()
    .toString(36)
    .substring(2) + Date.now().toString(36);

export const createUUID =
  Math.random()
    .toString(36)
    .substring(2, 15) +
  Math.random()
    .toString(36)
    .substring(2, 15);
