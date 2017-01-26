<template>
	<app-header>
		<app-link-menu href="/">Home</app-link-menu>
		<app-link-menu href="/tags" icon="tag" icon-before>Tags</app-link-menu>
		<!-- TODO change -->
		<app-link-menu href="/upload" icon="plus" icon-before>New Book</app-link-menu>
	</app-header>
</template>

<script>
	import AppHeader from '../components/AppHeader.vue';
	import AppLinkMenu from '../components/AppLinkMenu.vue';

	export default {
		components: {
			AppButtonMenu,
			AppHeader,
			AppLinkMenu
		},
		methods: {
			newBook(){

			}
		}
	}
</script>
