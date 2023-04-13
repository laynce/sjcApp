<script>
	import {goTarget, goLogin} from '@/tools/util.js'
	import Users from '@/tools/user.js'
	
	export default {
		onShow: function() {
			const user = Users.get()
			if (!user.isLogin) {
				goLogin()
			}
		},
		onLoad(){},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	/*每个页面公共css */
	body {
		font-size: 14px;
	}
	.pointer {
		cursor: pointer;
	}
</style>
