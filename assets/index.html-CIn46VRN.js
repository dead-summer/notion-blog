import{_ as a,c as i,d as n,o as e}from"./app-B6dbd404.js";const p={};function l(t,s){return e(),i("div",null,s[0]||(s[0]=[n(`<p>DML 英文全称是 Data Manipulation Language (数据操作语言)，用来对数据库中表的数据记录进行增、删、改操作。</p><ul><li>添加数据（INSERT）</li><li>修改数据（UPDATE）</li><li>删除数据（DELETE）</li></ul><h2 id="增加-insert" tabindex="-1"><a class="header-anchor" href="#增加-insert"><span><strong><strong><strong>增加 (insert)</strong></strong></strong></span></a></h2><ul><li><p>insert 语法：</p><ul><li><p>向指定字段添加数据</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">insert</span><span class="space"> </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">into</span><span class="space"> </span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">表名</span><span class="space"> </span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">(字段名1,</span><span class="space"> </span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">字段名2)</span><span class="space"> </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">values</span><span class="space"> </span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">(值1,</span><span class="space"> </span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">值2);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>案例 1：向 <code>tb_emp</code> 表的 <code>username</code>、<code>name</code>、<code>gender</code> 字段插入数据</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">--</span><span class="space"> </span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">因为设计表时create_time,</span><span class="space"> </span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">update_time两个字段不能为NULL，所以也做为要插入的字段</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">insert</span><span class="space"> </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">into</span><span class="space"> </span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">tb_emp(username,</span><span class="space"> </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">name</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">,</span><span class="space"> </span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">gender,</span><span class="space"> </span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">create_time,</span><span class="space"> </span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">update_time)</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">values</span><span class="space"> </span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">wuji</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">,</span><span class="space"> </span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">张无忌</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">,</span><span class="space"> </span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">1</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">,</span><span class="space"> </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">now</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">()</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">,</span><span class="space"> </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">now</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">()</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>全部字段添加数据</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">insert</span><span class="space"> </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">into</span><span class="space"> </span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">表名</span><span class="space"> </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">values</span><span class="space"> </span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">(值1,</span><span class="space"> </span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">值2,</span><span class="space"> </span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">...);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>案例 2：向 <code>tb_emp</code> 表的所有字段插入数据</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">insert</span><span class="space"> </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">into</span><span class="space"> </span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">tb_emp(id,</span><span class="space"> </span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">username,</span><span class="space"> </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">password</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">,</span><span class="space"> </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">name</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">,</span><span class="space"> </span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">gender,</span><span class="space"> </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">image</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">,</span><span class="space"> </span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">job,</span><span class="space"> </span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">entrydate,</span><span class="space"> </span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">create_time,</span><span class="space"> </span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">update_time)</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">values</span><span class="space"> </span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">(</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">null</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">,</span><span class="space"> </span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">zhirou</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">,</span><span class="space"> </span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">123</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">,</span><span class="space"> </span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">周芷若</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">,</span><span class="space"> </span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">2</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">,</span><span class="space"> </span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">1.jpg</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">,</span><span class="space"> </span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">1</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">,</span><span class="space"> </span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">2010-01-01</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">,</span><span class="space"> </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">now</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">()</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">,</span><span class="space"> </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">now</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">()</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>批量添加数据（指定字段）</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">insert</span><span class="space"> </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">into</span><span class="space"> </span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">表名</span><span class="space"> </span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">(字段名1,</span><span class="space"> </span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">字段名2)</span><span class="space"> </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">values</span><span class="space"> </span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">(值1,</span><span class="space"> </span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">值2),</span><span class="space"> </span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">(值1,</span><span class="space"> </span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">值2);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>案例 3：批量向 <code>tb_emp</code> 表的 <code>username</code>、<code>name</code>、<code>gender</code> 字段插入数据</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">insert</span><span class="space"> </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">into</span><span class="space"> </span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">tb_emp(username,</span><span class="space"> </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">name</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">,</span><span class="space"> </span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">gender,</span><span class="space"> </span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">create_time,</span><span class="space"> </span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">update_time)</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">values</span><span class="space"> </span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">weifuwang</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">,</span><span class="space"> </span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">韦一笑</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">,</span><span class="space"> </span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">1</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">,</span><span class="space"> </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">now</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">()</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">,</span><span class="space"> </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">now</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">()</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">),</span></span>
<span class="line"><span class="space"> </span><span class="space"> </span><span class="space"> </span><span class="space"> </span><span class="space"> </span><span class="space"> </span><span class="space"> </span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">fengzi</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">,</span><span class="space"> </span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">张三疯</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">,</span><span class="space"> </span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">1</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">,</span><span class="space"> </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">now</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">()</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">,</span><span class="space"> </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">now</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">()</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>批量添加数据（全部字段）</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">insert</span><span class="space"> </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">into</span><span class="space"> </span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">表名</span><span class="space"> </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">values</span><span class="space"> </span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">(值1,</span><span class="space"> </span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">值2,</span><span class="space"> </span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">...),</span><span class="space"> </span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">(值1,</span><span class="space"> </span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">值2,</span><span class="space"> </span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">...);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div></li></ul></li><li><p>insert 操作的注意事项：</p><ol><li>插入数据时，指定的字段顺序需要与值的顺序是一一对应的。</li><li>字符串和日期型数据应该包含在引号中。</li><li>插入的数据大小，应该在字段的规定范围内。</li></ol></li></ul><h2 id="修改-update" tabindex="-1"><a class="header-anchor" href="#修改-update"><span><strong><strong><strong>修改 (update)</strong></strong></strong></span></a></h2><ul><li><p>update 语法：</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">update</span><span class="space"> </span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">表名</span><span class="space"> </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">set</span><span class="space"> </span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">字段名1</span><span class="space"> </span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">=</span><span class="space"> </span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">值1</span><span class="space"> </span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">,</span><span class="space"> </span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">字段名2</span><span class="space"> </span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">=</span><span class="space"> </span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">值2</span><span class="space"> </span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">,</span><span class="space"> </span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">....</span><span class="space"> </span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">[where</span><span class="space"> </span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">条件];</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>案例 1：将 <code>tb_emp</code> 表中 id 为 1 的员工，姓名 name 字段更新为 &#39;张三&#39;</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">update</span><span class="space"> </span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">tb_emp</span><span class="space"> </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">set</span><span class="space"> </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">name</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">张三</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">,update_time</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">=</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">now</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">()</span><span class="space"> </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">where</span><span class="space"> </span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">id</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">=</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">1</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>案例 2：将 <code>tb_emp</code> 表的所有员工入职日期更新为 &#39;2010-01-01&#39;</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">update</span><span class="space"> </span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">tb_emp</span><span class="space"> </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">set</span><span class="space"> </span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">entrydate</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">2010-01-01</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">,update_time</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">=</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">now</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">()</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div></li><li><p>注意事项：修改语句的条件可以有，也可以没有，如果没有条件，则会修改整张表的所有数据。</p></li></ul><h2 id="删除-delete" tabindex="-1"><a class="header-anchor" href="#删除-delete"><span><strong><strong><strong>删除 (delete)</strong></strong></strong></span></a></h2><ul><li><p>delete 语法：</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">delete</span><span class="space"> </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">from</span><span class="space"> </span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">表名</span><span class="space"> </span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">[where</span><span class="space"> </span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">条件];</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>案例 1：删除 <code>tb_emp</code> 表中 id 为 1 的员工</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">delete</span><span class="space"> </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">from</span><span class="space"> </span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">tb_emp</span><span class="space"> </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">where</span><span class="space"> </span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">id</span><span class="space"> </span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">=</span><span class="space"> </span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">1</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>案例 2：删除 <code>tb_emp</code> 表中所有员工</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">delete</span><span class="space"> </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">from</span><span class="space"> </span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">tb_emp;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div></li><li><p>注意事项:</p><ul><li><code>DELETE</code> 语句的条件可以有，也可以没有，如果没有条件，则会删除整张表的所有数据。</li><li><code>DELETE</code> 语句不能删除某一个字段的值 (可以使用 <code>UPDATE</code>，将该字段值置为 <code>NULL</code> 即可)。</li></ul></li></ul>`,8)]))}const k=a(p,[["render",l],["__file","index.html.vue"]]),d=JSON.parse('{"path":"/itheima-javaweb/day06-3-database-operations-dml/","title":"Day06-3 数据库操作-DML","lang":"zh-CN","frontmatter":{"title":"Day06-3 数据库操作-DML","createTime":"2025/03/01T12:58:00.000Z","updateTime":"2025/03/02T02:43:00.000Z","permalink":"/itheima-javaweb/day06-3-database-operations-dml/"},"headers":[],"readingTime":{"minutes":2.16,"words":647},"git":{"updatedTime":1740991950000,"contributors":[{"name":"dead_summer","username":"dead_summer","email":"2941325451@qq.com","commits":1,"avatar":"https://avatars.githubusercontent.com/dead_summer?v=4","url":"https://github.com/dead_summer"}]},"filePathRelative":"notes/黑马程序员 JavaWeb/6. Day06 MySQL-1/Day06-3 数据库操作-DML.md"}');export{k as comp,d as data};
