<template>
	<a class="app-button-menu item" @click="click">
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
			click: {
				type: Function,
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
