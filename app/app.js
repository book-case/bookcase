import 'babel-polyfill';
import 'whatwg-fetch';
import App from './App.vue';
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './src/routes';

Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'history',
	base: __dirname,
	routes
});

const app = new Vue({
	el: '#app',
	router,
	render(h){
		return h(App);
	}
});
