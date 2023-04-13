export const goTarget = (url ='/pages/index/index')=> {
	uni.switchTab({url});
}

export const goLogin = ()=> {
	uni.navigateTo({
		url: '/pages/login/login'
	})
}