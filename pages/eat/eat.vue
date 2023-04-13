<!-- 本示例未包含完整css，获取外链css请参考上文，在hello uni-app项目中查看 -->
<template>
	<view class="content">
		<view style="text-align: center;margin-top: 30px;" class="mb-20">主人，今天想怎么吃，随机选下吧</view>
		<view class="btn-area">
			<view class="btn-area-container">
				<u-button type="primary" style="width: 80px;margin-right: 20px;" @click="start">开始</u-button>
				<u-button type="success" style="width: 80px;"  @click="over">停止</u-button>
			</view>
		</view>
		<view class="select-container">
			<u-grid :col="3" border>
				<u-grid-item v-for="i in 9" :name="badgeArr[i-1].icon" style="border: 0.5px solid #dadbde;" :key="i">
					<view class="badge-icon" v-if="current === i"><view class="badge-icon-text">选中</view></view>
					<u-icon :name="badgeArr[i-1].icon" :size="25" class="mt-10" :color="colors[i-1]"></u-icon>
					<view class="grid-text mb-10">{{badgeArr[i-1].text}}</view>
				</u-grid-item>
			</u-grid>
		</view>
		<u-modal :show="show" :content="content" @confirm="outConfirm"></u-modal>
	</view>
</template>

<script>
	export default {
	    data() {
	        return {
	            badgeArr: [{
					icon: 'server-man',
					text: '稀饭'
				}, {
					icon: 'heart',
					text: '面条'
				},{
					icon: 'car',
					text: '米饭'
				},{
					icon: 'bell',
					text: '火锅'
				}, {
					icon: 'rmb-circle',
					text: '冒菜'
				}, {
					icon: 'kefu-ermai',
					text: '麻食'
				},{
					icon: 'pushpin',
					text: '香锅'
				},{
					icon: 'shopping-cart',
					text: '米粉'
				},{
					icon: 'star',
					text: '泡馍'
				}],
				colors: [],
				current: 0,
				isStart: false,
				show: false,
				content: ''
			}
	    },
	    onShow() {
		  this.isStart = false
		  this.current = 0
	      this.colors = this.badgeArr.map(()=> `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`)
		},
		onHide(){
			this.timer && clearInterval(this.timer)
		},
		methods: {
			start() {
				if (this.isStart) {
					return
				}
				
				this.isStart = true
				this.timer = setInterval(()=> {
					this.current++
					if (this.current > 9) {
						this.current = 1
					}
				}, 300)
			},
			over() {
				if (!this.isStart) return
				this.timer && clearInterval(this.timer)
				this.isStart = false
				this.show = true
				this.content = `主人, 今天吃${this.badgeArr[this.current - 1].text}吧!`
			},
			outConfirm() {
				this.show = false;
				this.content = ''
			}
		}
	}
	
</script>
<style lang="scss">
	
	.btn-area {
		&-container{
			width: 240px;
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 0 auto;
		}
	}
	
	.select-container {
		padding: 20px;
		padding-top: 30px;
		.badge-icon {
			position: absolute;
			top: 0rpx;
			right: 0rpx;
			// background: blue;
			border: 18px solid red;
			border-left-color: transparent;
			border-bottom-color: transparent;
			&-text {
				width: 14px;
				position: absolute;
				top: -28px;
				font-size: 10px;
				color: #fff;
				transform: translate(2px, 5px) rotate(-45deg) ;
			}
		}
		
		.grid-text {
			font-size: 28rpx;
			margin-top: 4rpx;
			font-weight: bold;
		}
	}
</style>