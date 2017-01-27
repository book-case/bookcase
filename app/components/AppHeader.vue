<template>
	<div class="app-header ui grid">
		<div class="computer tablet only row">
			<div class="ui inverted navbar menu">
				<div class="ui container">
					<slot></slot>

					<app-header-right>
						<app-search></app-search>
						<app-user-menu></app-user-menu>
					</app-header-right>
				</div>
			</div>
		</div>
		<div class="mobile only narrow row">
			<div class="ui inverted navbar menu">
				<slot name="mobileVisible"></slot>
				<app-user-menu></app-user-menu>
				<div class="ui dropdown right item">
					<i class="mdi mdi-menu"></i>
					<div class="menu">
						<slot name="mobileHidden"></slot>
						<app-search></app-search>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.app-header {
		z-index: 10;
		margin-right: 0 !important;
		margin-left: 0 !important;
	}

	.navbar {
		width: 100%;
		border-radius: 0 !important;
	}
</style>

<script>
	import 'semantic-ui-css/semantic.css';
	import AppHeaderRight from './AppHeaderRight.vue';
	import AppSearch from './AppSearch.vue';
	import AppUserMenu from './AppUserMenu.vue';

	export default {
		components: {
			AppHeaderRight,
			AppSearch,
			AppUserMenu
		}
	};
</script>
