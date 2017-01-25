<template>
	<app-header>
		<app-menu href="/">Home</app-menu>
		<app-menu href="/tags" icon="tag" icon-before>Tags</app-menu>
		<app-menu href="/upload" icon="upload" icon-before>Upload</app-menu>
	</app-header>
</template>

<script>
	import AppHeader from '../components/AppHeader.vue';
	import AppMenu from '../components/AppMenu.vue';

	export default {
		components: {
			AppHeader,
			AppMenu
		}
	}
</script>
