export default [
	{path: '/', component: require('../pages/Index.vue')},
	{path: '/book/:id', component: require('../pages/Book.vue')},
	{path: '/book/:id/:volume', component: require('../pages/Volume.vue')},
	{path: '/read/:id/:volume', component: require('../pages/Reader.vue')},
	{path: '/tags', component: require('../pages/Tags.vue')},
	{path: '*', component: require('../pages/NotFound.vue')}
];
