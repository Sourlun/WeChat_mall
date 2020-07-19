// pages/goods_list/index.js
import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList: [
      {
        id: 0,
        value: '综合',
        isActive: true
      },
      {
        id: 1,
        value: '价格',
        isActive: false
      },
      {
        id: 2,
        value: '销售',
        isActive: false
      }
    ],
    goodList: [

    ]
  },

  /**
   *   查询参数
   */
  QueryParams: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid = options.cid;
    // 获取商品列表数据
    this.getGoodList();
  },
  
  /**
   *  获取商品列表数据
   */
  getGoodList() {
    request({
      url: "/goods/search",
      data: this.QueryParams
    }).then( res => {
      console.log(res);
      let goodList = res.data.message.goods;
      this.setData({
        goodList
      })
    })
  },

  /**
   * 处理tab改变
   * @param {*} e 
   */
  handlerTabItemChange: function(e) {
    let {index} = e.detail;
    let {tabList} = this.data;
    tabList.forEach( item => {
      item.id===index?item.isActive=true:item.isActive=false;
    });
    this.setData({
      tabList
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