### React Native 仿微博客户端
iOS & Android
react-native 版本 0.40.0
mobx、redux 架构
### 已完成
1、微博首页
2、微博详细页
3、点赞
4、未读消息红点
5、发布页面动画
6、微博内容的emoji
7、保存token，自动验证token，预加载userInfo
### 运行
1、git clone https://github.com/lyxia/RNWeiBo
2、cd RNWeiBo
3、npm install
4、react-native link（这一步是为了添加react-native-vector-icons）
5、在[微博API中添加应用](http://open.weibo.com/wiki/%E5%BE%AE%E5%8D%9AAPI)，在./js/server/API中修改授权值：
```
const redirect_uri = '...'
const client_id = '...'
const client_secret ='...'
```
6、react-native run-ios/run-android
### 效果图
![Demo Gif](images/demo1.gif)</br>
![Demo Gif](images/demo2.gif)</br>
![Demo Gif](images/demo3.gif)</br>
