const { injectBabelPlugin } = require("react-app-rewired");
module.exports = function override(config, env) {
  config = injectBabelPlugin(
    // 在默认配置基础上注入
    // 插件名，插件配置
    ["import", { libraryName: "antd", libraryDirectory: "es", style: "css" }],
    config
  );
  // 高级组件、可使用装饰器配置 ES7 -> ES5
  config = injectBabelPlugin(
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    config
  );
  return config;
};
