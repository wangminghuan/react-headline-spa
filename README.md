## 基于react创建的SPA项目

## 项目安装

npm install

## 项目启动

npm start

## 项目说明
- 使用 [Create React App](https://www.html.cn/create-react-app/docs/getting-started/)创建的应用
- 使用 [react-app-rewired](https://github.com/timarney/react-app-rewired/blob/master/README_zh.md) 与 [customize-cra](https://github.com/arackaf/customize-cra)配合改写webpack配置，参见config-overrides.js文件，可以参照[Ant Design](https://ant.design/docs/react/use-with-create-react-app-cn)中的高级配置部分
- 使用 `setupProxy.js` 文件配置反向代理,该文件文件放置在src目录下，cra会自动检测（cra已经将devServer部分从config中抽离出去了）
- 引入Ant Design 部分组件，且引入了按需加载功能，参见`babel-plugin-import`部分

