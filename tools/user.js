class User {
	get() {
		let users = uni.getStorageSync('storage_loginUser') || {};
		return users
	}
	getAll() {
		let users = uni.getStorageSync('storage_user') || [];
		return users
	}
}

export default new User()