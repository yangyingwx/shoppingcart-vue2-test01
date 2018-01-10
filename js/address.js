new Vue({
	el: '.container',
	data: {
		addressList: [],
		limitNum: 3,
		currentIndex: 0,
		shippingMethod: 1,
		delFlag: false,
		editFlag: false
	},
	computed: {
		filterAdress: function () {
			return this.addressList.slice(0,this.limitNum);
		}
	},
	mounted: function () {
		this.$nextTick(function () {
    		this.getAddressList();
		})
	},
	methods: {
		getAddressList: function () {
			var self = this;
			this.$http.get('data/address.json').then(function(response) {
				self.addressList = response.data.result;
			}, function () {
				alert('请求数据失败，请刷新重试！')
			})
		},
		changeCurrentIndex: function (index) {
			this.currentIndex = index;
		},
		setDefault: function (id) {
			this.addressList.forEach(function (item,index) {
				if (item.addressId === id) {
					item.isDefault = true;
				} else {
					item.isDefault = false;
				}
			});
		},
		confirmDel: function () {//确认删除一个地址
			this.delFlag = true;
		},
		delAddress: function () {//删除一个地址
			console.log(this.currentIndex);
			this.addressList.splice(this.currentIndex,1);
			this.delFlag = false;
		},
		confirmEdit: function () {
			this.editFlag=true;
		},
		saveNewAdress: function (item, index) {
			if (item.userName.length === 0) {
				alert('收件人不能为空');
			} else if (item.streetName.length === 0) {
				alert('收件地址不能为空');
			} else if (!(/^1[34578]\d{9}$/.test(item.tel))) {
				alert("手机号码有误，请重填");
			} else {
				this.editFlag=false;
			}
			
			console.log(index);
		},
		addNewAdress: function () {
			this.editFlag=true;
			this.addressList.push({
        		"addressId":"10000" + this.addressList.length,
        		"userName":"",
        		"streetName":"",
        		"postCode":"100001",
        		"tel":"",
        		"isDefault":false
    		});
    		this.currentIndex = this.addressList.length - 1;
    		console.log(this.addressList.length);
    		console.log(this.currentIndex);
		},
		cancelAddAdress: function () {
			this.editFlag=false;
			this.addressList.pop();
		}
	}
});