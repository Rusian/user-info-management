import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n);

const index = new VueI18n({
  locale: localStorage.getItem("locale") || "zh",
  messages: {
    'zh': require('./lang/zh'),
    //'en': require('./lang/en')
  }
});

export default index
