<template>
	<view>
		<view class="loginContainer">
			<view class="login-form">
				<view class="login-avatar"><u-avatar src="/static/images/avator.png" mode="circle"></u-avatar></view>
				<u-form :model="form" ref="uForm">
					<u-form-item label="账号" prop="name">
						<u-input v-model="form.name" placeholder="请输入账号"/>
					</u-form-item>
					<u-form-item label="密码" prop="password">
						<u-input v-model="form.password" type="password" placeholder="请输入密码"/>
					</u-form-item>
				</u-form>
				<u-button @click="submit" type="success" style="margin-top: 30px;" shape="circle" :loading="loginLoading">登录</u-button>
				<u-button @click="regster" type="primary" style="margin-top: 30px;" shape="circle" :loading="regsterLoading">注册</u-button>
			</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {goTarget} from '@/tools/util.js'
	import Users from '@/tools/user.js'
	
	export default {
		data() {
			return {
				form: {
					name: '',
					password: ''
				},
				loginLoading: false,
				regsterLoading: false,
				rules: {
					name: [
						{
							required: true,
							message: '请输入账号',
							trigger: ['change']
						}
					],
					password: [
						{
							required: true,
							message: '请输入密码',
							trigger: ['change']
						},
						{
							pattern: /^[0-9a-zA-Z]{6}$/g,
							// 正则检验前先将值转为字符串
							transform(value) {
								return String(value);
							},
							message: '密码由6位字母或数字组成'
						},
					]
				}
			}
		},
		methods: {
			async submit() {
				await this.$refs.uForm.validate()
				this.loginLoading = true
				let users = Users.getAll()

				if (users.some(u=> u.name === this.form.name && u.pass === this.form.password)) {
					uni.setStorageSync('storage_loginUser', {isLogin: true, name: this.form.name})
					this.loginLoading = false
					goTarget()
					return
				}else if(users.some(u=> u.name === this.form.name || u.pass === this.form.password)){
					this.loginLoading = false
					return this.showToast('账号密码错误', 'error')
				}else{
					this.loginLoading = false
					return this.showToast('该账号未注册, 请注册', 'error')
				}
			},
			async regster() {
				await this.$refs.uForm.validate()
				this.regsterLoading = true
				let users = Users.getAll()

				if (users.some(u=> u.name === this.form.name)) {
					this.regsterLoading = false
					return this.showToast('该账号已注册, 请登录', 'warnning')
				}
				
				users.push({name: this.form.name, pass: this.form.password, record: []});
				
				uni.setStorageSync('storage_user', users)
				this.regsterLoading = false
				this.form.password = ''
				this.showToast('注册成功, 请登录', 'success')
			},
			showToast(message, type) {
				this.$refs.uToast.show({
					message,
					type,
					position: 'bottom'
				})
			}
		},
		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		onShow() {
			const user = Users.get()
			if (user.isLogin) {
				goTarget()
			}
		}
	}
</script>

<style lang="scss">
	.loginContainer {
		width: 100%;
		height: 100vh;
		display: flex;
		justify-content: center;
		
		.login-form {
			width: 70%;
			margin-top: calc(100vh - calc(100vh - 190px)/2 - 250px);
			
			.login-avatar {
				display: flex;
				justify-content: center;
				margin-bottom: 30px;
			}
		}
	}
	
</style>

