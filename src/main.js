import { createApp} from 'vue'
import App from './App.vue'
import router from './router'
import '../src/style.css'
import axios from 'axios'

// import moment from 'moment';
// import 'moment-timezone'; // Optional: for time zone support
// import 'moment-jalaali'; // Load Jalali calendar support

// Vue.filter('jalaliMoment', (date, format = 'YYYY/MM/DD HH:mm') => {
//   const formattedDate = moment(date).locale('fa').format(format);
//   return formattedDate;
// });

const token = localStorage.getItem("token");
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

createApp(App).use(router).mount('#app')
