<template>
	<section class="tags">
		<app-loader color="#fff" size="50px" :loading="loading"></app-loader>
		<ul>
			<li v-for="item in items">
				<!-- TODO -->
			</li>
		</ul>

		<app-error :error="err"></app-error>
	</section>
</template>

<script>
	import AppLoader from '../components/AppLoader.vue';
	import AppError from '../components/AppError.vue';

	export default {
		data(){
			return {
				loading: true,
				items: [],
				err: null
			};
		},

		created(){
			this.fetchTags();
		},

		methods: {
			fetchTags(){

			}
		},

		components: {
			AppError,
			AppLoader
		}
	};
</script>
