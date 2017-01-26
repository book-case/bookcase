<!--
	Volume.vue
	Shows volume information
	Gives option for download, read
-->

<template>
	<section class="volume">
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
				loading: false,
				items: [],
				err: null
			};
		},

		created(){
			this.fetchVolume();
		},

		methods: {
			fetchVolume(){
				fetch(`/book/${this.$route.params.id}`, {method: 'GET'}).then((res) => {
					return res.json();
				}).then((v) => {
					this.items = v;
				}).catch((err) => {
					this.err = err;
				});
			}
		},

		components: {
			AppLoader
		}
	};
</script>
