<template>
	<div class="app-loader">
		<dot-loader :color="color" :size="size" :loading="loading"></dot-loader>
	</div>
</template>

<style scoped>
	.app-loader {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		background: rgba(0, 0, 0, 0.6);
		padding: 30px;
		border-radius: 30px;
	}
</style>

<script>
	import DotLoader from 'vue-spinner/src/DotLoader.vue';

	export default {
		props: ['color', 'size', 'loading'],
		components: {
			DotLoader
		}
	};
</script>
