<template>
	<div id="app">
		<bookcase-header></bookcase-header>
		<bookcase-main>
			<transition name="slide-fade" mode="out-in">
				<keep-alive>
					<router-view></router-view>
				</keep-alive>
			</transition>
		</bookcase-main>
	</div>
</template>

<style scoped>
	.slide-fade-enter-active {
		transition: all .3s ease-in-out;
	}
	.slide-fade-leave-active {
		transition: all .3s ease-in-out;
	}
	.slide-fade-enter, .slide-fade-leave-to{
		/*transform: translateX(-50px);*/
		opacity: 0;
	}
</style>

<script>
	import BookcaseHeader from './layouts/BookcaseHeader.vue';
	import BookcaseMain from './layouts/BookcaseMain.vue';

	export default {
		components: {
			BookcaseHeader,
			BookcaseMain
		}
	}
</script>
