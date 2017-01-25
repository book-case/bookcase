<template>
	<a class="app-menu item" :href="href">
		<i v-if="iconBefore" :class="iconClass"></i>
		<slot></slot>
		<i v-if="!iconBefore" :class="iconClass"></i>
	</a>
</template>

<script>
	import 'semantic-ui-css/semantic.css';
	import 'mdi/css/materialdesignicons.css';

	export default {
		props: {
			href: {
				type: String,
				required: true
			},

			icon: {
				type: String
			},

			'icon-before': {
				type: Boolean
			}
		},

		computed: {
			iconClass(){
				return this.icon ? `mdi mdi-${this.icon}` : '';
			}
		}
	};
</script>
