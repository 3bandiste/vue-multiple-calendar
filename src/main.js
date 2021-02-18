import Vue from 'vue'
import FunctionalCalendar from '../index'
import Demo from './DemoRol'
Vue.use(FunctionalCalendar, {
  showWeekNumbers: false
})
Vue.config.productionTip = false

new Vue({
  el: '#app',
  template: '<Demo/>',
  components: { Demo }
})
