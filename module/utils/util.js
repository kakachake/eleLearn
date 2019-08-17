/*
 * @Description: 
 * @Version: 2.0
 * @Autor: kakachake
 * @Date: 2019-08-16 12:48:40
 * @LastEditors: kakachake
 * @LastEditTime: 2019-08-17 10:57:37
 */
export const coerceTruthyValueToArray = function(val) {
    if (Array.isArray(val)) {
      return val;
    } else if (val) {
      return [val];
    } else {
      return [];
    }
};

export const arrayFindIndex = function(arr, pred) {
  for (let i = 0; i !== arr.length; ++i) {
    if (pred(arr[i])) {
      return i;
    }
  }
  return -1;
};


export const arrayFind = function(arr, pred) {
  const idx = arrayFindIndex(arr, pred);
  return idx !== -1 ? arr[idx] : undefined;
};
