<template>
	<section class="not-found">
		<h1>404</h1>
		<h3>Not Found!</h3>
	</section>
</template>

<style scoped>
	.not-found {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	h1 {
		text-align: center;
		font-size: 200px;
		font-weight: 100;
	}

	h3 {
		text-align: center;
		font-size: 45px;
		font-weight: 300;
	}
</style>

<script>
	import BookcaseHeader from '../layouts/BookcaseHeader.vue';
	import BookcaseMain from '../layouts/BookcaseMain.vue';

	export default {
		components: {
			BookcaseHeader,
			BookcaseMain
		}
	}
</script>
