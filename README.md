# i18n with Nuxt.j

##Node: 8.11.1
##Nuxt: 1.14

 Step 1: start mock server
    npm run mock
    (it will start a server: localhost:8100 )
 Step 2: launch sites  
    npm run dev
    (it will start a server: localhost:8081 )
    
##RELEASE NOTE
 #2018-07-23 发布了v1.7
  1. 修改V1站点首页界面，加入烟雾效果，变更首页布局为更合理美观效果。
  2. PC首页改变浏览器窗口大小，网站使用帮助视频的链接文字位置会移动，手机端浏览器访问站点首页上下滑动，网站使用帮助视频的链接文字不跟着滑动，需要修改。
  3. 手机端浏览器访问站点，登录后，左上方三条白色小横线的菜单图标显示一个外围黑色边框，需要去掉边框。
  4. 手机端浏览器访问站点答题，在题目页面滑动，右侧留宽一点，把“点我滚动”修改为滚动条或“可上下滑动”的提示文字，尽量美观一些。
  5. 手机端浏览器访问站点，我的首页中个人资料页面需要调整，尽量上下滑动即可显示资料内容，不需要左右滑动。
  6. 手机端浏览器访问站点，我的首页中学习历史，选择知识点，知识点列表单列显示，但是右边显示大量空白，可以左右滑动，需要调整，无需左右滑动，只响应上下滑动即可。
  7. 手机端浏览器访问站点，锁屏，解锁的图标偏大，左右显示不全，需要调整。
  8. 手机端浏览器访问站点，上方提示信息文字较多，偏上显示，而题号和下一题按钮是居中显示，建议调整对齐方式，使页面更加美观。
  9. 去掉题目窗口的黑色边框。
  10. 手机端浏览器访问站点，题目窗口增加翻页button。
  11. 手机端访问站点答题，一开始题目内容没有显示在黑色窗口的中间，建议题目内容固定位置显示，不要在黑色窗口中上下滑动。
  12. 手机端访问站点答题，题目上方的卷名那个白色top条应固定显示，不参加滑动。
  13. 手机端访问站点答题，做题时点击看该题知识点，弹出知识点名称选择弹窗，点击空白处不能退出这个知识点选择弹窗，修改为点击空白处能退出这个知识点选择弹窗。
  14. 动态知识点需要加播放控制，可以“快放，慢放，暂停”。
  15. V1.1需要加入收费功能。（教授设计收费模式，杨琪调研支付网关公司和收费）
  16. V1.1发布时需要使用性能监控服务，Santry和Newrelic。

 #2018-07-23 发布了v1.6
  1. 主页添加视频提示
  
 #2018-07-10 发布了v1.5
  1. 修复部分显示相关Bug
  2. 修复topic无法重复显示问题
  3. 个人分析页面IE11显示bug
  
 #2018-07-05 发布了v1.4.2
  1. 为手机版添加滚动提示
  
 #2018-07-03 发布了v1.4.1
  1. 添加新的视频
  
 #2018-07-02 发布了v1.4
  1. 修复按钮显示逻辑
  2. 修复试题页面IE11重叠问题
  
 #2018-06-21 发布了v1.3.2
  1. 修复按钮显示逻辑
  2. 修复主页视频点击bug
  
 #2018-06-21 发布了v1.3.1
  1. 添加视频页
  2. 修复手机版显示Bug
  
 #2018-06-21 发布了v1.3
  1. 修复手机版显示Bug
  2. 调整的看不懂相关逻辑和API
  
 #2018-06-21 发布了v1.2.1
  1. 修复IE浏览器显示的Bug
  
 #2018-06-20 发布了v1.2
  1. 调整手机版菜单
  2. 修复页面展示Bug
  3. 修改了看不懂相关逻辑
   
 #2018-06-13 发布了v1.1
  1. 主要页面完成适配手机版工作
  2. 修复大量页面展示Bug
  3. 基本完成需求1.0相关工作
    
 #2018-06-07 发布了v1.0.1
  1. 主页，登录，注册页面适配手机版
   
 #2018-06-04 发布了v1.0.1
  1. 桌面版主要Bug已基本修复
   
 #发布了v1.0.0.beta5
  1. 修复了大部分功能性Bug
  2. 修复了大部分UI显示Bug
   
 #发布了v1.0.0.beta4
  1. 添加个人强弱分析页面
  2. 添加知识点学习页面
  3. 整理css结构，使用scss代替less
  4. 修复部分Bug
 
 #v1.0.0.beta3
  1. 修复登录验证问题
  2. 添加头部Bread菜单
  3. 添加我的主页页面
  4. 添加历史真题页面
  
 #v1.0.0.beta2
 1. 完善了注册登录及退出流程
 2. 调整路径到/client/目录
 3. 新增我的主页页面完成50%
 
 #v1.0.0.beta1
  1. 系统框架确定
  2. 多语言处理
  3. CDN支持# zhinengjiaoyu
