<template>
	<div class="app-error" v-if="error">
		<div class="error-box">
			<h1><i class="mdi mdi-alert-box"></i></h1>
			<h3>Oops!</h3>
			<button class="ui button" @click="refresh">
				<i class="mdi mdi-refresh"></i>
				Refresh
			</button>
		</div>
	</div>
</template>

<style scoped>
	.app-error {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.7);
		z-index: 9;
	}

	.error-box {
		background: #fff;
		width: 300px;
		height: 200px;
		position: absolute;
		top: 50%;
		left: 50%;
		text-align: center;
		transform: translate(-50%, -50%);
	}

	.error-box h1 {
		text-align: center;
		margin-top: 30px;
	}

	.error-box h3 {
		margin-top: 0;
		margin-bottom: 20px;
		text-align: center;
	}
</style>

<script>
	import 'mdi/css/materialdesignicons.css';

	export default {
		props: ['error'],
		methods: {
			refresh(){
				this.$router.go();
			}
		}
	};
</script>
