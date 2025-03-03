import{_ as e,c as n,d as a,a as t,r as l,o as p}from"./app-B6dbd404.js";const d={};function h(r,s){const i=l("Mermaid");return p(),n("div",null,[s[0]||(s[0]=a(`<h2 id="什么是-oop" tabindex="-1"><a class="header-anchor" href="#什么是-oop"><span>什么是 OOP</span></a></h2><p>OOP 代表面向对象编程。</p><p>过程编程是关于编写对数据执行操作的过程或方法，而面向对象编程是关于创建同时包含数据和方法的对象。</p><p>面向对象编程比过程编程有几个优点：</p><ol><li>OOP 更快，更容易执行。</li><li>OOP 为程序提供了一个清晰的结构。</li><li>OOP 有助于保持 Java 代码 DRY, ”Don&#39;t Repeat Yourself”，并使代码更容易维护，修改和调试 OOP 使得用更少的代码和更短的开发时间创建完全可重用的应用程序成为可能</li></ol><blockquote><p>💡 “Don&#39;t Repeat Yourself” (DRY) 原则是关于减少代码的重复。您应该提取应用程序通用的代码，并将它们放在一个地方并重复使用它们，而不是重复使用它们。</p></blockquote><h2 id="什么是类和对象" tabindex="-1"><a class="header-anchor" href="#什么是类和对象"><span><strong>什么是类和对象</strong></span></a></h2><p>类和对象是面向对象编程的两个主要方面。查看下图，了解类和对象之间的区别：</p><table><thead><tr><th>class</th><th>objects</th></tr></thead><tbody><tr><td>Fruit</td><td>Apple</td></tr><tr><td></td><td>Banana</td></tr><tr><td></td><td>Mango</td></tr></tbody></table><p>另一个例子：</p><table><thead><tr><th>class</th><th>objects</th></tr></thead><tbody><tr><td>Car</td><td>Volvo</td></tr><tr><td></td><td>Audi</td></tr><tr><td></td><td>Toyota</td></tr></tbody></table><p>因此，类是对象的模板，对象是类的实例。当创建单个对象时，它们从类继承所有变量和方法。</p><h2 id="类与对象" tabindex="-1"><a class="header-anchor" href="#类与对象"><span>类与对象</span></a></h2><p>Java 中的所有内容都与类和对象以及其属性和方法相关联。例如：在现实生活中，汽车是一个物体。汽车具有属性，例如重量和颜色，以及方法，例如驱动和制动。类就像一个对象构造函数，或者一个用于创建对象的 “蓝图”。</p><h3 id="创建一个类" tabindex="-1"><a class="header-anchor" href="#创建一个类"><span>创建一个类</span></a></h3><p>要创建类，请使用关键字 <code>class</code>:</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">class</span><span class="space"> </span><span style="--shiki-light:#2E8F82;--shiki-dark:#5DA994;">Cat</span><span class="space"> </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">{</span></span>
<span class="line"><span class="tab">	</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">//</span><span class="space"> </span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">属性/成员变量</span></span>
<span class="line"><span class="tab">	</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">String</span><span class="space"> </span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">name</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span class="tab">	</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">int</span><span class="space"> </span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">age</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span class="tab">	</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">String</span><span class="space"> </span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">color</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在<a href="/14f9f1fc15a380e6866ffdcbc0036b8a#14f9f1fc15a38086a152d78c68ec3379" target="_blank" rel="noopener noreferrer">标识符的命名规则和规范</a>一节中，类应该总是以大写的第一个字母开头，并且 java 文件的名称应该与类名匹配。</p><h3 id="创建一个对象" tabindex="-1"><a class="header-anchor" href="#创建一个对象"><span>创建一个对象</span></a></h3><p>在 Java 中，对象是从类创建的。我们已经创建了名为 <code>Cat</code> 的类，所以现在我们可以使用它来创建对象。要创建 <code>Cat</code> 对象，请指定类名，后跟对象名，并使用关键字 <code>new</code> :</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">Cat</span><span class="space"> </span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">cat1</span><span class="space"> </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span class="space"> </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">new</span><span class="space"> </span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">Cat</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">();</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">cat1</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">name</span><span class="space"> </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span class="space"> </span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">小白</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">cat1</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">age</span><span class="space"> </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span class="space"> </span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">3</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">cat1</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">color</span><span class="space"> </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span class="space"> </span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">白色</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="对象在内存中存在形式" tabindex="-1"><a class="header-anchor" href="#对象在内存中存在形式"><span>对象在内存中存在形式</span></a></h3><p>如下图所示：</p>`,23)),t(i,{id:"mermaid-151",code:"eJxLy8kvT85ILCpRCHHiUgCC4tKk9KLEggwFrzBfhadtrU/XzgCLg0BKZlFqcklmfp6CTxAXXBSu49mCDixKoebCVZdU5qSClCqkZebkWCk7O7uaurnpFJcU5WenWikbGJg7wbm65ZkpJRlWRgUVKEYkJ5ZEKwEJpVi4cGpeChYHPV3QxsXJSaSTgIqhTnIxcXVxcYQ7ycjC0dzEFL+T4FYaVBgYGBqiyKHYi3AOCOQl5qZGK4FIoF9QpRLTgTJAQsFWwdAIQzY5Pye/CBgIIAopGGBBgY2NJb6m7Xy2eerTnl3EBxJcCzSo3CxczJGCysXZ2JTooHq6Y8fL9v5nGxfgCS2cYWxkhBYiTzf0P5+5N1oJQqMHGCggUARQDDM2RjMMaMKLzk3RShAam2GEQhyeIIHpVEFX1w45YYDiGy4G9Ag8QuGCQAcBANsT+PM="}),s[1]||(s[1]=a('<h2 id="属性" tabindex="-1"><a class="header-anchor" href="#属性"><span>属性</span></a></h2><p>类属性的另一个术语是字段 (field) 或成员变量。</p><p>属性是类的一个组成部分，一般是基本数据类型，也可是引用类型（对象，数组）。比如我们前面定义 <code>Cat</code> 类 的 <code>age</code> 就是属性。属性如果不赋值，有默认值，规则和数组一致。</p><h2 id="java-内存的结构分析" tabindex="-1"><a class="header-anchor" href="#java-内存的结构分析"><span>Java 内存的结构分析</span></a></h2><ol><li>栈（Stack） <ul><li><strong>存储内容</strong>：主要用于存储基本数据类型（如<code>int</code>、<code>float</code>、<code>boolean</code>等）的局部变量和对象的引用（指向堆中的对象）。</li><li><strong>生命周期</strong>：栈上的数据通常是方法调用时的局部变量，它们的生命周期与方法的执行同步。一旦方法执行完毕，栈上的数据也会被清除。</li></ul></li><li>堆（Heap） <ul><li><strong>存储内容</strong>：堆主要用于存储 Java 对象。无论是通过 <code>new</code> 关键字创建的对象还是数组，都会被分配到堆上。</li><li><strong>生命周期</strong>：堆上的对象的生命周期由垃圾收集器管理。对象在不再被引用时会被标记为垃圾，并在垃圾回收时被清理。</li></ul></li><li>方法区（Method Area） <ul><li><strong>存储内容</strong>：方法区存储了类的结构信息，如运行时常量池、字段和方法数据、静态变量、即时编译器编译后的代码等。</li><li><strong>生命周期</strong>：方法区（Method Area）在 Java 的内存模型中是一个特殊的区域，它的生命周期与 Java 虚拟机（JVM）的生命周期是相同的。</li><li><strong>常量池</strong>：这里包括字符串常量池，存储了编译时生成的字符串常量和运行时动态生成的字符串（如果使用 <code>String.intern()</code> 方法）。常量池是方法区的一部分，专门用于存储编译期生成的各种字面量和符号引用。</li></ul></li></ol>',5))])}const k=e(d,[["render",h],["__file","index.html.vue"]]),o=JSON.parse('{"path":"/hsp-java/7-1-classes-and-objects/","title":"1 类与对象","lang":"zh-CN","frontmatter":{"title":"1 类与对象","createTime":"2024/12/09 19:25:00","permalink":"/hsp-java/7-1-classes-and-objects/"},"headers":[],"readingTime":{"minutes":3.84,"words":1153},"git":{"updatedTime":1740991950000,"contributors":[{"name":"dead_summer","username":"dead_summer","email":"2941325451@qq.com","commits":1,"avatar":"https://avatars.githubusercontent.com/dead_summer?v=4","url":"https://github.com/dead_summer"}]},"filePathRelative":"notes/韩顺平 Java 教程/第 7 章 面向对象编程（基础部分）/7.01 类与对象.md"}');export{k as comp,o as data};
