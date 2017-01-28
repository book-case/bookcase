<template>
	<div class="bookcase-book-view">

	</div>
</template>

<script>
	export default {
		props: {
			book: {
				type: String,
				required: true
			},

			author: {
				type: String,
				required: true
			}

			tags: {
				type: Array,
				required: true
			},

			language: {
				type: String,
				required: true
			},

			id: {
				type: String,
				required: true
			},

			volumes: {
				type: Array,
				required: true
			}
		}
	};
</script>
