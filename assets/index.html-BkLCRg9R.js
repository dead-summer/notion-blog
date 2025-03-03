import{_ as a,c as s,d as i,o as n}from"./app-B6dbd404.js";const t="/notion-blog/assets/ad50b45eabb8c1b1624b4803ce141607-BBJwEiOU.png",r="/notion-blog/assets/ce0c5e0d854cd2f21adca136869f0064-rxJ9T-Ey.png",o="/notion-blog/assets/1cc628f10e64e5e944148cec790fc749-HVMGcyqy.png",l={};function h(p,e){return n(),s("div",null,e[0]||(e[0]=[i(`<ul><li>写作平台：Notion</li><li>博客平台：<a href="https://hexo.io/" target="_blank" rel="noopener noreferrer">Hexo</a></li><li>博客主题：<a href="https://aurora.tridiamond.tech/cn/" target="_blank" rel="noopener noreferrer">Aurora</a></li><li>部署平台：Vercel</li></ul><h1 id="环境准备" tabindex="-1"><a class="header-anchor" href="#环境准备"><span>环境准备</span></a></h1><h1 id="博客搭建指南" tabindex="-1"><a class="header-anchor" href="#博客搭建指南"><span>博客搭建指南</span></a></h1><h2 id="_1-fork模板仓库" tabindex="-1"><a class="header-anchor" href="#_1-fork模板仓库"><span>1. Fork模板仓库</span></a></h2><p><a href="https://github.com/elog-x/notion-hexo/fork" target="_blank" rel="noopener noreferrer">点击 Fork</a> 该模板仓库到个人 Github 账号仓库下并 clone 到本地</p><h2 id="_2-安装依赖" tabindex="-1"><a class="header-anchor" href="#_2-安装依赖"><span>2. 安装依赖</span></a></h2><p>在项目根目录下运行命令安装依赖</p><div class="language-shell line-numbers-mode" data-ext="shell" data-title="shell"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">npm</span><span class="space"> </span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">install</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="_3-新建-elog-本地调试文件" tabindex="-1"><a class="header-anchor" href="#_3-新建-elog-本地调试文件"><span>3. 新建 Elog 本地调试文件</span></a></h2><p>在项目根目录中复制<code>.elog.example.env</code>文件并改名为<code>.elog.env</code>，此文件将用于本地同步Notion 文档</p><h2 id="_4-配置-notion-关键信息" tabindex="-1"><a class="header-anchor" href="#_4-配置-notion-关键信息"><span>4. 配置 Notion 关键信息</span></a></h2><p>按照<a href="https://elog.1874.cool/notion/gvnxobqogetukays#notion" target="_blank" rel="noopener noreferrer">文档提示</a>配置 Notion 并获取 <code>token</code> 和 <code>databaseId</code>，在本地<code>.elog.env</code>中写入</p><div class="language-plain line-numbers-mode" data-ext="plain" data-title="plain"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>NOTION_TOKEN=获取的token</span></span>
<span class="line"><span>NOTION_DATABASE_ID=获取的databaseId</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-本地调试" tabindex="-1"><a class="header-anchor" href="#_5-本地调试"><span>5.本地调试</span></a></h2><p>在项目根目录运行同步命令</p><div class="language-shell line-numbers-mode" data-ext="shell" data-title="shell"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">npm</span><span class="space"> </span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">run</span><span class="space"> </span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">sync:local</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="_6-启动-hexo" tabindex="-1"><a class="header-anchor" href="#_6-启动-hexo"><span>6.启动 Hexo</span></a></h2><p>在项目根目录运行hexo启动命令，会自动打开本地博客</p><div class="language-shell line-numbers-mode" data-ext="shell" data-title="shell"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">npm</span><span class="space"> </span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">run</span><span class="space"> </span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">server</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="_7-配置-hexo-博客" tabindex="-1"><a class="header-anchor" href="#_7-配置-hexo-博客"><span>7. 配置 Hexo 博客</span></a></h2><p>根据 <a href="https://hexo.io/" target="_blank" rel="noopener noreferrer">Hexo</a> 文档和 <a href="https://aurora.tridiamond.tech/cn/" target="_blank" rel="noopener noreferrer">Aurora</a>主题配置文档，配置你的博客直到你满意为主，你也可以换别的主题，这里不做演示</p><h2 id="_8-提交代码到-github" tabindex="-1"><a class="header-anchor" href="#_8-提交代码到-github"><span>8. 提交代码到 github</span></a></h2><p>本地访问没问题直接提交所有文件到 Github 仓库即可</p><h2 id="_9-部署到-vercel" tabindex="-1"><a class="header-anchor" href="#_9-部署到-vercel"><span>9. 部署到 Vercel</span></a></h2><p>注册 Vercel 账号并绑定 Github，在 Vercel 导入 该项目，Vercel 会自动识别出该 Hexo 项目，不需要改动，直接选择 Deploy 部署。部署完成会有一个 Vercel 临时域名，你也可以绑定自己的域名。</p><p><img src="`+t+'" alt="Untitled.png"></p><p><img src="'+r+`" alt="Untitled.png"></p><h2 id="_10-配置-github-actions-权限" tabindex="-1"><a class="header-anchor" href="#_10-配置-github-actions-权限"><span>10. 配置 Github Actions 权限</span></a></h2><p>在 Github 仓库的设置中找到 <code>Actions-General</code>，打开流水线写入权限<code>Workflow permissions</code></p><pre><code>![Untitled.png](assets/68391ce296bc88d76c449c222d93baa6.png)
</code></pre><h2 id="_11-配置环境变量" tabindex="-1"><a class="header-anchor" href="#_11-配置环境变量"><span>11. 配置环境变量</span></a></h2><p>在本地运行时，用的是<code>.elog.env</code>文件中定义的 Notion 账号信息，而在 Github Actions 时，需要提前配置环境变量。</p><p>在 Github 仓库的设置中找到 <code>Secrets and variables</code>，新增仓库的环境变量<code>NOTION_DATABASE_ID</code>和<code>NOTION_TOKEN</code>和<code>.elog.env</code>保持一致即可</p><p><img src="`+o+'" alt="Untitled.png"></p><h2 id="_12-自动化部署" tabindex="-1"><a class="header-anchor" href="#_12-自动化部署"><span>12. 自动化部署</span></a></h2><p>当在 Notion 中改动文档后，手动/自动触发 Github Actions流水线，会重新从 Notion 增量拉取文档，自动提交代码到 Github 仓库。</p><p>Vercel 会实时监测仓库代码，当有新的提交时都会重新部署博客。如此就实现了自动化部署博客。</p><p>整个流程的关键点就在于：如何手动/自动触发 Github Actions</p><p>在项目.<code>github/workflows/sync.yaml</code>中已经配置了外部 API 触发 Github Actions 事件，所以只需要调用 API 触发流水线即可。</p><h3 id="手动触发" tabindex="-1"><a class="header-anchor" href="#手动触发"><span>手动触发</span></a></h3><p>为了方便，这里提供一个部署在 Vercel 的免费公用的<a href="https://github.com/elog-x/serverless-api" target="_blank" rel="noopener noreferrer"><strong>ServerlessAPI</strong></a>，只需要配置好 URL 参数并浏览器访问即可触发流水线</p><div class="language-shell line-numbers-mode" data-ext="shell" data-title="shell"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">https://serverless-api-elog.vercel.app/api/github?user</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">=xxx</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">&amp;</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">repo</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">xxx</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">&amp;</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">event_type</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">deploy</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">&amp;</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">token</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">xxx</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="自动触发" tabindex="-1"><a class="header-anchor" href="#自动触发"><span>自动触发</span></a></h3><p>可在 Notion 中结合 Slack 触发，<a href="https://elog.1874.cool/notion/vy55q9xwlqlsfrvk" target="_blank" rel="noopener noreferrer">参考教程</a>，这里就不做进一步演示了</p><h1 id="自定义-elog-配置" tabindex="-1"><a class="header-anchor" href="#自定义-elog-配置"><span>自定义 Elog 配置</span></a></h1><p>如果想自定义 Elog 配置，可访问 <a href="https://elog.1874.cool/" target="_blank" rel="noopener noreferrer">Elog 文档</a></p><h1 id="博客示例" tabindex="-1"><a class="header-anchor" href="#博客示例"><span>博客示例</span></a></h1><p>示例仓库：<a href="https://github.com/LetTTGACO/notion-hexo" target="_blank" rel="noopener noreferrer">https://github.com/LetTTGACO/notion-hexo</a></p><p>博客示例地址：<a href="https://notion-hexo.vercel.app/" target="_blank" rel="noopener noreferrer">https://notion-hexo.vercel.app</a></p>',49)]))}const c=a(l,[["render",h],["__file","index.html.vue"]]),k=JSON.parse('{"path":"/article/notion-hexo/","title":"Notion + Hexo + GitHub Actions + Vercel 博客解决方案","lang":"zh-CN","frontmatter":{"title":"Notion + Hexo + GitHub Actions + Vercel 博客解决方案","createTime":"2023/11/08 00:00:00","permalink":"/article/notion-hexo/"},"headers":[],"readingTime":{"minutes":2.66,"words":797},"git":{"updatedTime":1740991950000,"contributors":[{"name":"dead_summer","username":"dead_summer","email":"2941325451@qq.com","commits":1,"avatar":"https://avatars.githubusercontent.com/dead_summer?v=4","url":"https://github.com/dead_summer"}]},"filePathRelative":"notes/test/Notion + Hexo + GitHub Actions + Vercel 博客解决方案.md","categoryList":[{"id":"4358b5","sort":10000,"name":"notes"},{"id":"9c19c2","sort":10001,"name":"test"}]}');export{c as comp,k as data};
