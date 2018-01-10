var vm = new Vue({
	
	el: '#app',
	data: {
		productList: [],
		totalMoney: 0,
		checkAllFlag: false,
		delFlag: false,
		index: 0
	},
	computed: {
		calcTotalPrice: function() {
			this.totalMoney = 0;
			this.productList.forEach(function (item,index) {
				if (item.checked) {
					vm.totalMoney += item.productPrice*item.productQuantity;
				}
			});
			return this.totalMoney;
		}
	},
	filters: {
		formatMoney: function (value) {
			return '￥' + value.toFixed(2);
		}
	},
	mounted: function () {
		this.$nextTick(function () {
    		this.cartView();
		})
	},
	methods: {
		cartView: function () {
			var self = this;
			this.$http.get('data/cartData.json').then(function (response) {
				self.productList = response.data.result.list;				
			}, function () {
				console.log('获取cartData失败');
			})
		},
		changeQuantity: function (item, way) {
			if (way > 0) {
				item.productQuantity++;
			} else if (item.productQuantity > 0) {
				item.productQuantity--;
			}else {
				alert('商品数量最小为0');
			}
		},
		toogleChecked: function (item) {
			if (typeof item.checked == 'undefined') {
				this.$set(item, 'checked', true);
			} else {
				item.checked = !item.checked;
			}
		},
		checkAll: function (flag) {
			this.checkAllFlag = flag;
			var self = this;
			this.productList.forEach(function(item,index) {
				if (typeof item.checked == 'undefined') {
					self.$set(item, 'checked', self.checkAllFlag);
				} else {
					item.checked = self.checkAllFlag;
				}
			});
		},
		confirmDel: function(index) {
			this.delFlag = true;
			this.index = index;
		},
		delProduct: function () {
			this.productList.splice(this.index,1);
			this.delFlag = false;
		}
	}
});