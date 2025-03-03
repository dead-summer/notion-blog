const path = require("path");

/**
 * 自定义图片路径处理器
 * @param {DocDetail} doc doc的类型定义为 DocDetail
 * @param {string} outputDir 配置文件中图片的存放位置（不再使用）
 * @return {dirPath: string, prefixKey: string} 返回处理后图片存放地址dirPath和文档中图片的前缀prefixKey
 */
const getImagePath = (doc, outputDir) => {
  // 获取当前文档所在目录，例如：docs/yuque
  const docPath = doc.docPath;

  // 计算图片存放路径，改为当前文档目录下的 assets
  const dirPath = path.join(docPath, "assets");
  // 计算图片前缀
  const prefixKey = `./assets`;

  return {
    dirPath,
    prefixKey,
  };
};

module.exports = {
  getImagePath,
};
