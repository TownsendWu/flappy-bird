export const randomRange = (min, max) => {
  return Math.ceil(Math.random() * (min - max + 1) + min);
};
