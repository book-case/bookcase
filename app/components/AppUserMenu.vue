<template>
	<div class="app-user-menu">
		<template v-if="username">
			<div class="ui dropdown item">
				{{username}}
				<div class="menu">
					<div class="item">
						<img :src="src">
						{{username}}
					</div>
				</div>
			</div>
		</template>
		<template v-else>
			<router-link to="/login" class="ui item">Login</router-link>
		</template>
	</div>
</template>

<script>
	import 'semantic-ui-css/semantic.css';
	import 'semantic-ui-css/semantic.js';

	export default {
		props: {
			username: {
				type: String
			},

			emailhash: {
				type: String
			}
		},

		mounted(){
			jQuery('.ui.dropdown').dropdown();
		},

		computed: {
			src(){
				return `//gravatar.com/avatar/${this.emailhash}?size=128&d=identicon`;
			}
		}
	};
</script>
