import Vue from 'vue';
import moment from 'moment';


Vue.filter('money', (value) => {
  if (isNaN(value) || value === null) {
    return '--';
  }
  return (+value / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
});

//时间戳转换(毫秒)
Vue.filter('timeReturn', (value, type = '') => {
  value = value*1000;
  switch (type) {
    case '':
      if (value === 0){
        return '--';
      } else {
        return moment(Number(value)).format('YYYY-MM-DD hh:mm:ss') || '--';
      }
    case 'D':
    case 'd':
    case 'day':
    case 'Day':
      return value ? moment(+value).format('YYYY-MM-DD') : '--';
    default:
      return value;
  }
});