<template>
	<div class="bookcase-dialog ui modal" :id="id">
		<i class="close icon"></i>
		<div class="header">
			<slot name="header"></slot>
		</div>
		<div class="content">
			<slot></slot>
		</div>
		<div class="actions">
			<slot name="buttons"></slot>
		</div>
	</div>
</template>

<script>
	import 'semantic-ui-css/semantic.css';
	import 'semantic-ui-css/semantic.js';

	export default {
		props: {
			id: {
				type: String
			}
		},
		mounted(){
			$('.ui.modal')
				.modal({
					transition: 'fade up'
				});
		}
	};
</script>
