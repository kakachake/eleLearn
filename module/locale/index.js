/*
 * @Description: 
 * @Version: 2.0
 * @Autor: kakachake
 * @Date: 2019-08-16 10:23:59
 * @LastEditors: kakachake
 * @LastEditTime: 2019-08-16 11:40:30
 */
import defaultLang from './lang/zh-CN';

let lang = defaultLang;
import deepmerge from 'deepmerge';
let merged = false;
let i18nHandler = function() {
  const vuei18n = Object.getPrototypeOf(this || Vue).$t;
  if (typeof vuei18n === 'function' && !!Vue.locale) {
    if (!merged) {
      merged= true;
      Vue.locale(
        Vue.config.lang,
        deepmerge(lang, Vue.locale(Vue.config.lang) || {}, { clone: true })
      );
    }
    return vuei18n.apply(this, arguments);
  }
};


export const t = function(path, options) {
    let value = ''
    const array = path.split('.');
    let current = lang;
    
    // console.log(current);
    
    for (let i = 0, j = array.length; i < j; i++) {
      const property = array[i];
    //   console.log(property)
      value = current[property];
    //   console.log(value);
      if (i === j - 1) return value
      if (!value) return '';
      current = value;
    }
    return '';
};