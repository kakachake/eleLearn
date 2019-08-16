/*
 * @Description: 
 * @Version: 2.0
 * @Autor: kakachake
 * @Date: 2019-08-16 12:48:40
 * @LastEditors: kakachake
 * @LastEditTime: 2019-08-16 12:48:45
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