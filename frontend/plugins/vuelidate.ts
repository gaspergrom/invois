import Vue from 'vue'
import Component from 'vue-class-component'
import Vuelidate from 'vuelidate'

Component.registerHooks(['validations'])
Vue.use(Vuelidate)
