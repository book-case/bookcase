<template>
	<app-header>
		<app-link-menu href="/">Home</app-link-menu>
		<app-link-menu href="/tags" icon="tag" icon-before>Tags</app-link-menu>
		<!-- TODO change -->
		<app-link-menu href="/upload" icon="plus" icon-before>New Book</app-link-menu>
		<template slot="mobileVisible">
			<app-link-menu href="/">Home</app-link-menu>
			<app-link-menu href="/tags" icon="tag" icon-before>Tags</app-link-menu>
		</template>
		<template slot="mobileHidden">
			<app-link-menu href="/upload" icon="plus" icon-before>New Book</app-link-menu>
		</template>
	</app-header>
</template>

<script>
	import AppHeader from '../components/AppHeader.vue';
	import AppLinkMenu from '../components/AppLinkMenu.vue';

	export default {
		components: {
			AppHeader,
			AppLinkMenu
		}
	}
</script>
