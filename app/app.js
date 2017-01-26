import 'babel-polyfill';
import Vue from 'vue';
import Loading from './pages/Loading.vue';
import page from 'page';
import routes from './routes';

const app = new Vue({
	el: '#app',
	data: {
		ViewComponent: {
			render(h){
				h(Loading);
			}
		}
	},
	render(h){
		return h(this.ViewComponent);
	}
});

Object.keys(routes).forEach((route) => {
	page(route, () => app.ViewComponent = routes[route]);
});

page('*', () => app.ViewComponent = require('./pages/Status_404.vue'));
page();
