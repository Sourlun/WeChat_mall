// 引入 ‘’请求‘’的方法， 路径需要写全
import { request } from "../../request/index.js";

//Page Object
Page({
  data: {
    swiperList: [
      // {
      //   image_src: "https://api-hmugo-web.itheima.net/pyg/banner1.png",
      //   open_type: 'navigate',
      //   goods_id: '129',
      //   navigator_url: '/pages/goods_detail/main?goods_id=129'
      // },
      // {
      //   image_src: "https://api-hmugo-web.itheima.net/pyg/banner2.png",
      //   open_type: 'navigate',
      //   goods_id: '395',
      //   navigator_url: "/pages/goods_detail/main?goods_id=395"
      // },
      // {
      //   image_src: "https://api-hmugo-web.itheima.net/pyg/banner3.png",
      //   open_type: 'navigate',
      //   goods_id: '38',
      //   navigator_url: '/pages/goods_detail/main?goods_id=38'
      // },
    ],

    catalogList: [],

    floorList: [],
  },
  //options(Object)
  onLoad: function (options) {
    // // 1、 发送异步请求接受轮播图的数据
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   method: 'GET',
    //   dataType: 'json',
    //   responseType: 'text',
    //   success: (result) => {
    //     console.log(result);
    //     this.setData({
    //       swiperList: result.data.message
    //     })
    //     console.log(this.data.swiperList)

    //   }
    // });

    // 1、 发送异步请求接受轮播图的数据
    this.getSwiperData();
    // 2、 请求导航栏的数据
    this.getCatalogData();
    // 3、 请求楼层数据
    this.getCatalogData();
  },


  /**
   *  请求接受轮播图的数据
   */
  getSwiperData: function() {
   //  使用封装好的
   let _this = this;
   request({
     url: "/home/swiperdata",
     data: {},
   }).then((result) => {
     _this.setData({
       swiperList: result.data.message,
     });
   });
  },

  /**
   *  请求导航栏的数据
   */
  getCatalogData: function() {
    let _this = this;
    request({
      url: "/home/catitems",
      data: {},
    }).then((result) => {
      _this.setData({
         catalogList: result.data.message,
      });
    });
  },


    /**
   *  请求楼层数据的数据
   */
  getCatalogData: function() {
    let _this = this;
    request({
      url: "/home/floordata",
      data: {},
    }).then((result) => {
      _this.setData({
         floorList: result.data.message,
      });
    });
  },


  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
  onPageScroll: function () {},
  //item(index,pagePath,text)
  onTabItemTap: function (item) {},
});
