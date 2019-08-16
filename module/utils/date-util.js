/*
 * @Description: 
 * @Version: 2.0
 * @Autor: kakachake
 * @Date: 2019-08-16 09:59:55
 * @LastEditors: kakachake
 * @LastEditTime: 2019-08-16 14:00:59
 */

 /**
  * 
  * @param {*} date 
  * @param {*} amount 
  */
export const prevDate = function(date, amount = 1) { 
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - amount);
};

export const nextDate = function(date, amount = 1) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount);
};

export const isDate = function(date) {
    if (date === null || date === undefined) return false;
    if (isNaN(new Date(date).getTime())) return false;
    if (Array.isArray(date)) return false; // deal with `new Date([ new Date() ]) -> new Date()`
    return true;
};
  
export const clearTime = function(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};


  

export const getDateTimestamp = function(time) {
    if (typeof time === 'number' || typeof time === 'string') {
      return clearTime(new Date(time)).getTime();
    } else if (time instanceof Date) {
      return clearTime(time).getTime();
    } else {
      return NaN;
    }
};

export const getWeekNumber = function(date) { //获取当前周
    if (!isDate(date)) return null;
    const temp = new Date(date.getTime());
    temp.setHours(0, 0, 0, 0);
    temp.setDate(temp.getDate() + 4 - temp.getDay());//获取本周周四的日期
    // January 4 is always in week 1.
    const week1 = new Date(temp.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from temp to week 1.
    // Rounding should be fine for Daylight Saving Time. Its shift should never be more than 12 hours.
    return 1 + Math.round(((temp.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
};

export const getStartDateOfMonth = function(year, month) {
    const result = new Date(year, month, 1);
    const day = result.getDay();
  
    if (day === 0) {
      return prevDate(result, 7);
    } else {
      return prevDate(result, day);
    }
};

export const getFirstDayOfMonth = function(date) { //获取本月的第一天
    const temp = new Date(date.getTime());
    temp.setDate(1); //设置为当月一号
    return temp.getDay(); //0为星期天
};


export const getDayCountOfMonth = function(year, month) { //获取当前月的天数
    if (month === 3 || month === 5 || month === 8 || month === 10) {
      return 30;
    }
  
    if (month === 1) {
      if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) { //判断闰年
        return 29;
      } else {
        return 28;
      }
    }
  
    return 31;
  };