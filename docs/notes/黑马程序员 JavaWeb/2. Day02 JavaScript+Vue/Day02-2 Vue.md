---
title: Day02-2 Vue
createTime: 2025/03/01T12:58:00.000Z
updateTime: 2025/03/02T02:41:00.000Z
permalink: /itheima-javaweb/day02-2-vue/
---

## ****Vue 概述****


Vue.js 是一套构建用户界面的渐进式框架。它的核心库只关注视图层，并且非常容易学习，非常容易与其它库或已有项目整合。Vue.js 的目标是通过尽可能简单的 API 实现响应的数据绑定和组合的视图组件。


Vue 框架的 MVVM（Model-View-ViewModel）开发思想，开发者更加关注数据，而非数据绑定到视图这种机械化的操作。


## ****快速入门****


通过 `new Vue()` 创建一个 Vue 实例，并将其挂载到 HTML 元素上。使用插值表达式 `{{ message }}` 将 Vue 实例中的数据渲染到页面上。`v-model` 指令实现了数据双向绑定，输入框中的内容会实时更新 Vue 实例中的 `message` 属性，反之亦然。


**代码示例：**


```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-
scale=1.0">
    <title>Vue-快速入门</title>
    <script src="js/vue.js"></script>
</head>
<body>
    <div id="app">
        <input type="text" v-model="message">
        {{message}}
    </div>
</body>
<script>
    //定义Vue对象
    new Vue({
        el: "#app", //vue接管区域
        data:{
            message: "Hello Vue"
        }
    })
</script>
</html>
```


## ****Vue 指令****


Vue 指令是指 HTML 标签上带有 `v-` 前缀的特殊属性，不同指令具有不同含义。例如：`v-if`，`v-for`...


**常用的 Vue 指令：**


| 指令          | 作用                                |
| ----------- | --------------------------------- |
| `v-bind`    | 为 HTML 标签绑定属性值，如设置 `href`，css 样式等 |
| `v-model`   | 在表单元素上创建双向数据绑定                    |
| `v-on`      | 为 HTML 标签绑定事件                     |
| `v-if`      | 条件性的渲染某元素，判定为 true 时渲染，否则不渲染      |
| `v-else`    |                                   |
| `v-else-if` |                                   |
| `v-show`    | 根据条件展示某元素，区别在于切换的是 display 属性的值   |
| `v-for`     | 列表渲染，遍历容器的元素或者对象的属性               |


### ****v-bind 和 v-model****

- **v-bind：** 为 HTML 标签绑定属性值，如设置 `href` , css 样式等。当 vue 对象中的数据模型发生变化时，标签的属性值会随之发生变化。

	`v-bind` 指令具有简写方式：`v-bind` 可以省略的，但是 `:` 不能省略，用 `:` 表示采用的 Vue 的属性绑定。

- **v-model：** 在表单元素上创建双向数据绑定。

### ****v-on****


`v-on`：用来给 html 标签绑定事件的。

- `v-on` 语法给标签的事件绑定的函数，必须是 vue 对象种声明的函数
- `v-on` 语法绑定事件时，事件名相比较 js 中的事件名，没有 `on` 。

	例如：在 js 中，鼠标单击事件为`onclick` ；而在 Vue 中，鼠标单击事件为 `v-on:click` 。


`v-on` 指令具有简写方式，即 `v-on:` 可以替换成 `@`，例如：`<input type="button" value="点我一下" @click="handle()">`


### ****v-if 和 v-show****


| 指令                      | 描述                              |
| ----------------------- | ------------------------------- |
| v-if, v-else-if, v-else | 条件性的渲染某元素，判定为 true 时渲染，否则不渲染    |
| v-show                  | 根据条件展示某元素，区别在于切换的是 display 属性的值 |


通过代码来演示效果。需求如下：

- 年龄 35 及以下，判定为年轻人。
- 年龄大于 35，小于 60，判定为中年人。
- 其他年龄判定为老年人。

`v-if` 指令：


```html
<span v-if="age <= 35">年轻人(35及以下)</span>
<span v-else-if="age > 35 && age < 60">中年人(35-60)</span>
<span v-else>老年人(60及以上)</span>
```


`v-show` 指令：


```html
<span v-show="age <= 35">年轻人(35及以下)</span>
<span v-show="age > 35 && age < 60">中年人(35-60)</span>
<span v-show="age >= 60">老年人(60及以上)</span>
```


`v-show` 和 `v-if` 的作用效果是一样的，只是原理不一样。`v-if` 指令，不满足条件的标签代码并不会出现在页面中，而在 `v-show` 指令中，不满足条件的代码依然存在，只是通过添加 css 样式来控制标签不显示。


### ****v-for****

- 语法格式如下：

	```html
	<标签 v-for="变量名 in 集合模型数据">
	    {{变量名}}
	</标签>
	```

- 索引遍历的语法格式如下：

	```html
	<标签 v-for="(变量名,索引变量) in 集合模型数据">
	    <!--索引变量是从0开始，所以要表示序号的话，需要手动的加1-->
	   {{索引变量 + 1}} {{变量名}}
	</标签>
	```


## ****生命周期****


Vue 的生命周期：指的是 Vue 对象从创建到销毁的过程。Vue 的生命周期包含 8 个阶段，每触发一个生命周期事件，会自动执行一个生命周期方法，这些生命周期方法也被称为钩子方法。


其完整的生命周期如下图所示：


| 状态            | 阶段周期 |
| ------------- | ---- |
| beforeCreate  | 创建前  |
| created       | 创建后  |
| beforeMount   | 挂载前  |
| mounted       | 挂载完成 |
| beforeUpdate  | 更新前  |
| updated       | 更新后  |
| beforeDestroy | 销毁前  |
| destroyed     | 销毁后  |


下图是 Vue 官网提供的从创建 Vue 到效果 Vue 对象的整个过程及各个阶段对应的钩子函数：


![lifecycle_zh-CN.W0MNXI0C.png](assets/93d55f5aefbf3eb6b2e5cee4e4d41d23.png)


其中我们需要重点关注的是 `mounted` , 其他的了解即可。

- `mounted`：挂载完成，Vue初始化成功，HTML 页面渲染成功。以后我们一般用于页面初始化自动的 ajax 请求后台数据
