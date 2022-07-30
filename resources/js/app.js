import Vue from 'vue'



import Index from './components/Index.vue'


import router from './router.js'
require('./bootstrap');

new Vue({
	el: '#app',
	components: {
		Index
	},
	router
})
