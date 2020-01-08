const path=require("path");
const resolve=(dir)=> path.join(__dirname, dir);
const { override,addLessLoader,fixBabelImports } = require('customize-cra');
const addCustomize = () => config => {
    config.resolve.alias = {
    ...config.resolve.alias,
    '@': resolve('src')
 };
 return config;
}
process.env.GENERATE_SOURCEMAP = "false";
module.exports = {
  webpack: override(
    fixBabelImports('import', {
       libraryName: 'antd-mobile',
       style: 'css',
       }),
    addLessLoader(),
    addCustomize(),
  )
}
