const path = require("path");
const resolve = (dir) => path.join(__dirname, dir);
const {
  override,
  addLessLoader,
  fixBabelImports,
  addWebpackAlias
} = require('customize-cra');
process.env.GENERATE_SOURCEMAP = "false";
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    style: 'css',
  }),
  // 配置路径别名
  addWebpackAlias({
    '@': resolve("src")
  }),

  addLessLoader()
)