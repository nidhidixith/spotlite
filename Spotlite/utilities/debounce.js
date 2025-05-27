export function debounce(func, delay) {
  let timer;
  const debounced = (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
  debounced.cancel = () => {
    clearTimeout(timer);
  };
  return debounced;
}

// export const debounce = (fn, delay) => {
//   let timeoutId;
//   return function (...args) {
//     if (timeoutId) clearTimeout(timeoutId);
//     timeoutId = setTimeout(() => fn.apply(this, args), delay);
//   };
// };
