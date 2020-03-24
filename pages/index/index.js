// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region:'',
    loc:'',
    now:'',
    src:''
  },

  changeRegion:function(e){   //改变区域
    this.setData({
      region:e.detail.value
    })
   // console.log(e);
    this.getWeather();   
  },

  getWeather: function () {   //更新天气
  var that = this;
  wx.request({
    url: 'https://free-api.heweather.net/s6/weather/now?',
    data: {
      location: that.data.region[1],
      key: 'f197f44b37844e0f8052754da1b8006b'
    },
    success: function (res) {
      that.setData({
        now: res.data.HeWeather6[0].now,
        src: '/'+'images' +'/' + res.data.HeWeather6[0].now.cond_code.toString()+'.png'
      })
    }
  })
},

  getaddress:function(){      //更新地址
    var that =this;
    wx.request({
      url: 'https://free-api.heweather.net/s6/weather/forecast?',
      data:{
        location:that.data.loc,
        key: 'f197f44b37844e0f8052754da1b8006b'
      },
      success:function(res){
        that.setData({
          region: [res.data.HeWeather6[0].basic.admin_area+'省', res.data.HeWeather6[0].basic.parent_city+'市', res.data.HeWeather6[0].basic.location+'区']
        })
        that.getWeather();
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getLocation({
      success: function(res) {
        var loca = res.latitude.toString() + "," + res.longitude.toString();
        that.data.loc = loca;
        that.getaddress();
      },
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})