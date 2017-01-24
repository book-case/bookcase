<template>
	<div class="app-header">
		<div class="ui inverted menu">
			<div class="ui container">
				<content></content>
			</div>
			
			<app-search></app-search>
		</div>
	</div>
</template>

<script>
	import 'semantic-ui-css/semantic.css';
	import AppSearch from './AppSearch.vue';

	export default {
		data(){
			return {};
		},
		components: {
			AppSearch
		}
	};
</script>
