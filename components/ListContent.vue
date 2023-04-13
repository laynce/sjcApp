<template>
	<view>
		<view class="mb-10 text-gradient">过往时光</view>
		<u-collapse>
			<u-collapse-item :title="item.head" v-for="(item, index) in itemList" :key="index">
				{{item.body}}
			</u-collapse-item>
		</u-collapse>
	</view>
</template>

<script>
	export default {
		name:"ListContent",
		props: ['list'],
		data() {
			return {
				itemList: []
			};
		},
		mounted(){
			this.init()
		},
		methods:{
			init() {
				this.itemList = this.list?.map(item=> ({
					head: `${item.date}`,
					body: item.content
				}));
			}
		},
		watch: {
			'list.length': function(val){
				this.init()
			}
		}
	}
</script>

<style lang="scss">
	.text-gradient {
		font-size: 15px;
		  background: linear-gradient(to right, #f00, #00f);
		  -webkit-background-clip: text;
		  -webkit-text-fill-color: transparent;
	}
</style>