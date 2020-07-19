import { request } from "../../request/index.js";

// pages/category/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 左侧菜单
    leftMenuList: [],
    // 右侧内容
    rightContent: [],
    // 当前选中的菜单索引
    currentChooseMenu: 0,
  },

  CatalogList: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /**
     *  使用缓存技术
     *    如果：缓存没有数据 -> 从网络获取数据
     *    如果：缓存有数据 & 数据没有过期 -> 从缓存获取数据
     *    缓存数据格式{time: new Date(), data: [...]}
     */
    // 1、 获取本地缓存数据
    const Cates = wx.getStorageSync("cates");
    // 2、判断， 如果：不存在 -> 发送网络请求
    if (!Cates) {
      // 获取分类目录数据
      this.getCatalogData();
    } else {
      // 如果超时
      if (Date.now() - Cates.time >= 10 * 1000) {
        // 获取分类目录数据
        this.getCatalogData();
      } else {
        console.log("使用缓存");
        this.CatalogList = Cates.data;
        let tempCatalogList = this.CatalogList;
        // 第一项
        let firstCatalogContent = tempCatalogList[0].children;
        this.setData({
          leftMenuList: tempCatalogList.map((v) => v.cat_name),
          rightContent: firstCatalogContent,
        });
      }
    }
  },

  /**
   *  获取分类目录数据
   */
  getCatalogData: function () {
    request({
      url: "/categories",
      data: {},
    }).then((result) => {
      this.CatalogList = result.data.message;

      // 存到缓存
      wx.setStorageSync("cates", {
        time: Date.now(),
        data: this.CatalogList,
      });

      let tempCatalogList = this.CatalogList;
      // 第一项
      let firstCatalogContent = tempCatalogList[0].children;
      this.setData({
        leftMenuList: tempCatalogList.map((v) => v.cat_name),
        rightContent: firstCatalogContent,
      });
    });
  },

  /**
   *  处理左边菜单点击事件
   */
  handlerItemTap: function (e) {
    // 当前索引
    let index = e.currentTarget.dataset.index;
    // 获取当前索引对于的list
    let tempCatalogList = this.CatalogList;
    let catalogContent = tempCatalogList[index].children;
    // 赋值
    this.setData({
      currentChooseMenu: index,
      rightContent: catalogContent,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
