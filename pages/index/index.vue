<template>
	<view>
		<view class="index-setting">
			<u-icon name="setting" color="#2979ff" size="20" @click="logoutShow = true"></u-icon>
		</view>
		<view class="content">
			<view class="tips">
				<u-notice-bar :text="tip" bgColor="null"></u-notice-bar>
			</view>
			<view class="content-main">
				<view>主人, 今天心情怎么样, 简单写下吧</view>
				<view class="content-head mt-10">
					<u-textarea v-model="textVal" count maxlength=500></u-textarea>
					<view class="mt-20" style="text-align: right;width: 100%;">
						<u-button type="primary" style="width: 100px;" @click="record" :loading="recordLoading">记录一下</u-button>
						<ListContent class="mt-20" :list="listData"/>
					</view>
				</view>
			</view>
		</view>
		<u-popup :show="logoutShow" mode="right" closeOnClickOverlay closeable @close="close">
			<view style="margin-top: 50px; padding: 5px;">
				<view class="mb-10">个人信息</view>
				<view class="pointer" @click="logout">退出登录</view>
			</view>
		</u-popup>
		<u-modal :show="show" :content="content" showCancelButton @confirm="outConfirm" @cancel="show = false"></u-modal>
	</view>
</template>

<script>
	import {goLogin, goTarget} from '@/tools/util.js'
	import ListContent from '@/components/ListContent.vue'
	import moment from 'moment'
	import Users from '@/tools/user.js'
	
	export default {
		components: {
			ListContent
		},
		data() {
			return {
				logoutShow: false,
				content: '确认退出?',
				show: false,
				textVal: '',
				tip: '在人生的旅途中，我们都是匆匆的过客，匆匆的相遇，又匆匆的相离，就在这来去匆匆中，留下了一串串说不完的故事，就在这来去匆匆认识到拥有的珍贵，就在这来去匆匆中懂得了应该珍惜每一份真诚珍惜每一份友谊。',
				listData: [],
				user: '',
				recordLoading: false
			}
		},
		onShow(){
			const allUsers = Users.getAll()
			const user = Users.get()
			const current = allUsers.find(s=> s.name === user.name) || {}
			this.listData = JSON.parse(JSON.stringify(current.record || []))
		},
		methods: {
			logout(flag) {
				this.logoutShow = false;
				this.show = true
			},
			outConfirm() {
				this.show = false;
				const users = Users.get()
				try {
					uni.removeStorageSync('storage_loginUser');
				}catch(e){
					// console.log(111)
				}
				
				goLogin()
			},
			close() {
				this.logoutShow = false;
			},
			async record() {
				if (this.textVal.trim()) {
					this.recordLoading = true
					const allUsers = Users.getAll()
					const user = Users.get()
					const current = allUsers.find(s=> s.name === user.name) || {}
					current.record ||= []
					const date = moment().format('YYYY-MM-DD')
					
					current.record.push({
						id: Math.random(),
						content: this.textVal.trim(),
						date
					})
										
					uni.setStorageSync('storage_user', allUsers)
					this.recordLoading = false
					this.listData = JSON.parse(JSON.stringify(current.record || []))
					this.textVal = ''
				}
			}
		}
	}
</script>

<style lang="scss">
	.index-setting {
		position: absolute;
		right: 10px;
		top: 10px;
	}
	.content {
		padding-top: 30px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		
		&-main {
			width: calc(100% - 30px);
		}
	}
</style>
