const path=require("path");
const resolve=(dir)=> path.join(__dirname, dir);
const { override,addLessLoader} = require('customize-cra');
const addCustomize = () => config => {
    config.resolve.alias = {
    ...config.resolve.alias,
    '@': resolve('src')
 };
 return config;
}
module.exports = {
  webpack: override(
    addLessLoader(),
    
    addCustomize(),
  )
}

// module.exports = function override(config, env) {
//   config.resolve.alias = {
//     ...config.resolve.alias,
//     '@': resolve('src')
//  };
//  config=rewireLess(config, env)
//  return config;
// };