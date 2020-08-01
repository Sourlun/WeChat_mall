// pages/goods_list/index.js 
/**
 *  1，用户上滑页面，滚动条触底的时候，需要加载下一页数据
 *    1.1， 找到滚动条触底事件（官网文档寻找） 
 *    1.2， 判断有没有下一页数据
 *      1.2.1: 获取总页数
 *              总页数 = Math.ceil(总条数 / 页容量pagesize)
 *    1.3， 如果有下一页数据： 页码++  重新请求数据  数组拼接
 * 
 *    2，下拉刷新页面
 *      2.1，触发下拉刷新条件：需要在json文件中开启一个配置项
 *        找到下拉刷新事件
 *      2.2，重置 数组 数据
 *      2.3，重置页码 设置为‘1’
 *      2.4，重新发送请求
 *      2.5, 数据回来了，需要手动关闭等待效果
 */
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
   *  页数对象
   */
  pageObj: {
    // 总页数
    totalPage: 0,
    // 总数量
    total: 0,
    // 当前页数
    currentPageNum: 1,
    // 每页大小
    pageSize: 10
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
    }).then(res => {
      // 商品列表
      let goodList = res.data.message.goods;
      // 总数量
      this.pageObj.total = res.data.message.total;
      // 总页数
      this.pageObj.totalPage = Math.ceil(this.pageObj.total / this.pageObj.pageSize)
      console.log(res)
      this.setData({
        // 扩展运算符
        goodList: [...this.data.goodList, ...res.data.message.goods]
      })
      wx.stopPullDownRefresh()
    })
  },

  /**
   * 处理tab改变
   * @param {*} e 
   */
  handlerTabItemChange: function (e) {
    let { index } = e.detail;
    let { tabList } = this.data;
    tabList.forEach(item => {
      item.id === index ? item.isActive = true : item.isActive = false;
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

    let { currentPageNum } = this.pageObj;
    let { totalPage } = this.pageObj;

    if (currentPageNum > totalPage) {
      console.log('已经达到最大页数');
      wx.showToast({
        title: '没有下一页数据 '
      });

    } else {
      console.log('继续')
      this.pageObj.currentPageNum++;
      this.QueryParams.pagenum = this.pageObj.currentPageNum;
      this.getGoodList();
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   *  下拉刷新事件
   */
  onPullDownRefresh() {
    console.info("下拉刷新事件");
    // 1, 重置数组
    this.setData({
      goodList: []
    })
    // 2,重置页码
    this.QueryParams.pagenum = 1;
    // 3，发送请求
    this.getGoodList();
  }
})