<template>
	<div class="app-header">
		<div class="ui inverted menu">
			<div class="ui container">
				<slot></slot>

				<app-search></app-search>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.app-header {
		z-index: 10;
	}
</style>

<script>
	import 'semantic-ui-css/semantic.css';
	import AppSearch from './AppSearch.vue';

	export default {
		components: {
			AppSearch
		}
	};
</script>
