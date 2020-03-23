//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
   
  },
  
  onLoad: function () {
    var that = this
    //进入需要获取当前地理位置
    that.getLocation();
  },

  //获取经纬度
  getLocation: function(){
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function(res) {
        var latitude = res.latitude
        var longitude = res.longitude
        console.log("lat:"+latitude+" lon:"+longitude)

        that.getCity(latitude,longitude);
      },
    })
  },

  //获取城市信息
  getCity: function (latitude, longitude) {
    var that = this;
    var url = "https://api.map.baidu.com/reverse_geocoding/v3/";
    var params = {
      ak:"b3koXdbyfZv3fv6rlxwU7Ei2ssYCeGP2",
      output:"json",
      location:latitude+","+longitude,
      ret_coordtype:"gcj02ll",
      coordtype:"gcj02ll"
    }
    wx.request({
      url: url,
      data: params,
      success: function(res) {
        var province = res.data.result.addressComponent.province;
        var city = res.data.result.addressComponent.city;
        var district = res.data.result.addressComponent.district;
        var street = res.data.result.addressComponent.street;

        that.setData({
          province: province,
          city:city,
          district: district,
          street: street
        })
        var descCity = city.substring(0, city.length - 1);
        that.getWeather(descCity);
      },
      fail:function(res) {},
      complete: function(res) {},
    })
  },
  
  //获取天气
  getWeather:function(city) {
    var that = this;
    var url = "https://free-api.heweather.net/s6/weather"
    var params = {
      location:city,
      key:"3ba5b14c30364e04941bb1a51743f0dd"
    }
    wx.request({
      url: url,
      data: params,
      success:function(res) {
        // console.log(JSON.stringify(res));
        //当前温度
        var nowTemp = res.data.HeWeather6[0].now.tmp
        //当前天气
        var weatherTxt = res.data.HeWeather6[0].now.cond_txt
        //当前空气质量
        
        //体感温度
        var fl = res.data.HeWeather6[0].now.fl
        that.setData({
          nowTemp:nowTemp,
        })
      }
    })
  }
})
