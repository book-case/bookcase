<template>
	<div id="app">
		<bookcase-header></bookcase-header>
		<bookcase-main>
			<app-loader color="#fff" size="50px" loading></app-loader>
		</bookcase-main>
	</div>
</template>

<script>
	import AppLoader from '../components/AppLoader.vue';
	import BookcaseHeader from '../layouts/BookcaseHeader.vue';
	import BookcaseMain from '../layouts/BookcaseMain.vue';

	export default {
		components: {
			AppLoader,
			BookcaseHeader,
			BookcaseMain
		}
	};
</script>
