const {
  matterMarkdownAdapter
} = require('@elog/cli')
const OpenAI = require("openai");

// 笔记目录和 URL 前缀
const docNotes = [{
    dir: '韩顺平 Java 教程',
    path: '/hsp-java/'
  },
  {
    dir: '黑马程序员 JavaWeb',
    path: '/itheima-javaweb/'
  },
]

// AI
const client = new OpenAI({
  baseURL: 'https://gpt.xdmaxwell.top/v1',
  apiKey: process.env.OPENAI_API_KEY
});


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


async function getUrlname(title) {

  const prompt = "我将给你发送一些文章的名字，你需要给我生成相应的 urlname。" +
    "相应的规范是全部为小写字母，中文翻译为英文。" +
    "一个简单的例子是：Day12-2 登录校验 -> day12-2-login-validation." +
    "即你只需要给我返回结果 day12-2-login-validation 即可，无需解释说明。现在开始：";
  // await sleep(interval); // 暂停
  const completion = await client.chat.completions.create({
    messages: [{
      role: "system",
      content: prompt + title
    }],
    model: "gpt-3.5-turbo",
    // model: "gpt-4o-mini",
    // model: "gemini-2.0-flash-exp",
  });

  return completion.choices[0].message.content;
}

/**
 * 自定义文档插件
 * @param {DocDetail} doc doc的类型定义为 DocDetail
 * @param {ImageClient} imageClient 图床下载器，可用于图片上传
 * @return {Promise<DocDetail>} 返回处理后的文档对象
 */
const format = async (doc, imageClient) => {
  let date = new Date(doc.properties.date); // 获取文档创建时间
  let directories = doc.docPath.split('\\'); // 本地文档的目录
  let docNotePermalink = '/article/'; // 默认文档是博客文档
  let urlname = doc.properties.urlname || undefined;


  if (directories.includes("notes")) { // 如果文档处在笔记目录下
    docNotes.forEach(item => {
      if (item.dir === directories[2]) {
        docNotePermalink = item.path; // 获取文档 URL前缀
      }
    });
  }

  // 格式化时间
  doc.properties.date = date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
  
  // 去掉文档名称的编号加.的前缀
  // 添加时间
  // 添加文档链接
  const interval = 10 * 1000; // 每隔 1000 毫秒（1 秒）发送一次请求
  let count = 0;
  while (urlname.length == 36 || urlname === undefined) {
    count = count + 1;
    try {
      urlname = await getUrlname(doc.properties.title);
      console.log(urlname);
      break;
    } catch (e) {
      console.log(e.message);
      console.log(`已尝试 ${count} 次，等待 ${interval / 1000}s 后继续...`);
      await sleep(interval);
    }
  }

  doc.body =
    '---\n' +
    'title: ' + doc.properties.title.replace(/^\d+\./, '') + '\n' +
    'createTime: ' + doc.properties.date + '\n' +
    'permalink: ' + docNotePermalink + urlname.trim() + '\/' + '\n' +
    '---\n' +
    doc.body;

  return doc;
};

module.exports = {
  format,
};