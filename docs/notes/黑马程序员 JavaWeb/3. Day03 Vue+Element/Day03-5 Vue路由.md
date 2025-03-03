---
title: Day03-5 Vue路由
createTime: 2025/03/01T12:58:00.000Z
updateTime: 2025/03/02T02:42:00.000Z
permalink: /itheima-javaweb/day03-5-vue-routing/
---

## ****路由介绍****


在前端开发中，路由是指 URL 中的 hash（`#` 号之后的内容）与组件之间的对应关系。当用户点击导航栏或其他链接时，浏览器地址栏会发生变化，路由会根据 URL 自动更新，显示与 URL 对应的 Vue 组件。


![image.png](assets/572f1075d8df4983c2fd0a475e7d44f2.png)


![image.png](assets/b1f2775a5039d180637a3f697c060b06.png)


Vue 官方提供了路由插件 Vue Router，它主要由以下几个部分组成：

- `VueRouter`：路由器类，负责根据路由请求在路由视图中动态渲染选中的组件。
- `<router-link>`：请求链接组件，会被浏览器解析成 `<a>` 标签，用于触发路由跳转。
- `<router-view>`：动态视图组件，用于渲染展示与路由路径对应的组件。

用户点击 `<router-link>` 发出路由请求，VueRouter 根据路由表找到对应的 Vue 组件，然后切换 `<router-view>` 中的组件，从而更新视图：


![image.png](assets/2f549a5dacef087f61720f60037d6caf.png)


**工作原理：**

1. `VueRouter` 根据配置的 URL hash 片段和组件关系维护一张路由表。
2. 页面中通过 `<router-link>` 组件发起路由请求。
3. `VueRouter` 根据路由请求在路由表中查找对应的 Vue 组件。
4. `VueRouter` 切换 `<router-view>` 中的组件，实现视图更新。

## ****路由入门****


接下来，我们将通过一个简单的例子来演示 Vue 路由的使用。
**请注意，在创建项目时，如果选择了路由功能，则无需手动安装** **`vue-router`** **插件。指令如下：**


```bash
npm install vue-router@3.5.1
```


（本教程在创建项目时，已经勾选了路由功能，无需重复安装）


首先，我们需要在 `src/router/index.js` 文件中定义路由表。代码如下：


其中 `DeptView.vue` 代码可参考如下


[DeptView.vue](https://prod-files-secure.s3.us-west-2.amazonaws.com/c911c495-2fbb-40d2-821e-9f7656976401/c148b736-b537-4622-a833-a3a7f3e29dcb/DeptView.vue?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UY4WYJWO%2F20250302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250302T064448Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJHMEUCIQC5PC8uG8jOTQfS2CMgI7BagiZhNYPN%2B2mmih3u%2FkABDwIgJjW8Qi2ag9N%2B1yRoKshuADuGCXFgBZiSmAKq4webtv8qiAQIt%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKQXasORa1HKt1ilzircA%2BQBl3TdJtkl22xrMwbprlK1aztcB8BHGkZBCJ3sDui1LKyOaED3LPE9fvT1B%2BCPavWhMVxgI%2Bg151fUBAlpzhTbKMpy%2BdOxDmrW%2FhD7l7e1%2FTAVInk1ETCQJxh1euPshXl5AmTXC0XmE7Nu%2BLMSYGqFqJPAWUk89C9fnbWnwErXrT4gliVjA1qvA4B7gEaBYMXfEhegYRdKHJa2ts%2FSPgyWT249CET4JbpkxcKYBGZtC6p9HQWbCBnl2EqfF6Z2wkTplBUOT%2FlvvIHoEy%2Bxr12anAHgVae4mspELDeEbHqbiz9202Y1H3o1N1OfO74JM%2FvyeF8F4QHEtro36RbQwG9yNJHCszcRBnjn9SlODanoz9XVQhdGcTzd0XUOAv2HxVSx8QoK1vBgsV%2BxjFRaA03MZgXoa82e9tB0zTg8N90kkZBagefyHHuAZYI%2FzNbxPcR6S1G3TQlOwBXY%2BEqwQ3DwXgsISSP3YjVRBDYiyx%2B7T%2Fcb0Jgf%2F%2BIUiL9BgHSJa%2FPhpEtM%2F1GjcS5yC5KESQR1GYf0jK3mgtYnea29b091oiiHsYb7HhBK6udKsXnFXpAnqLO3kf9jhxhNFWoUo3lqJNHhmwgpzHr0%2FCbF1yMGYusLngx0OxSSS%2BmtML7Xj74GOqUBCZdeTgKWIjKWIgPHRcicFR42kXMr4jxTeIbfRO9zGuQY%2BzbbztVA9Kouh4KI7PBl5%2FJvSjjDTf0oIozytxgAwAkCz6%2F6R%2BzdSzM3ROjsPBWHesCOcQoosh3bNdQYQ4zOJiupsOmjTVZS4UDi6SeLhOjM6qELhT6bQyYX0y9XOL0%2Ft%2Ff74oCXd63SYr2%2FyFDrhfnDRDxawWe7mORvAow9%2BeVv7DXz&X-Amz-Signature=4f6214c8b22de866e924666f1dcff307ac2908fca1f553ba1a12fd95d824c528&X-Amz-SignedHeaders=host&x-id=GetObject)


```javascript
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/emp',  // 地址 hash
    name: 'emp',
    component: () => import('../views/tlias/EmpView.vue')  // 对应的 vue 组件
  },
  {
    path: '/dept',
    name: 'dept',
    component: () => import('../views/tlias/DeptView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
```


**代码解释：**

- `import Vue from 'vue'` 和 `import VueRouter from 'vue-router'`：导入 Vue 和 VueRouter 模块。
- `Vue.use(VueRouter)`：使用 VueRouter 插件。
- `const routes = [...]`：定义路由表，其中每个对象代表一个路由规则。
	- `path`：URL 的 hash 值，例如 `/emp`。
	- `name`：路由的名称，可以用于编程式导航。
	- `component`：与该路由关联的 Vue 组件，这里使用了懒加载的方式引入组件，`() => import('../views/tlias/EmpView.vue')`。
- `const router = new VueRouter({ routes })`：创建 VueRouter 实例，并将路由表传递给它。
- `export default router`：导出 VueRouter 实例，以便在 main.js 中使用。

**注意：** 需要删除 `index.js` 文件中没有引用的 import 模块，避免出现错误。


在 `main.js` 文件中，已经引入了 router 功能，如下图所示。


![image.png](assets/92c893d8f6880bfe17ad86a4fa89a703.png)


完成了路由基本信息的配置和路由表的加载后，还需要使用 `<router-link>` 和 `<router-view>` 组件。将左侧导航栏的两个按钮修改为 `<router-link>`，代码如下：


```html
<el-menu-item index="1-1">
  <router-link to="/dept">部门管理</router-link>
</el-menu-item>
<el-menu-item index="1-2">
  <router-link to="/emp">员工管理</router-link>
</el-menu-item>
```


**代码解释：**

- `<router-link to="/dept">`：创建一个链接，点击后会跳转到 `/dept` 路由。

然后在内容展示区域（`App.vue`）中定义 `<router-view>` 组件，用于展示当前路由对应的组件。`App.vue` 的完整代码如下：


```html
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      "message": "hello world"
    }
  }
}
</script>

<style>
</style>
```


**代码解释：**

- `<router-view>`：一个占位符，用于渲染当前路由对应的组件。

此时，如果直接在浏览器中打开 `http://localhost:7000/`，会发现页面一片空白。这是因为默认的路由路径是 `/`，但是路由配置中没有与之对应的组件。为了解决这个问题，我们需要在路由配置中添加 `/` 对应的路由组件，代码如下：


```javascript
const routes = [
  {
    path: '/emp',
    name: 'emp',
    component: () => import('../views/tlias/EmpView.vue')
  },
  {
    path: '/dept',
    name: 'dept',
    component: () => import('../views/tlias/DeptView.vue')
  },
  {
    path: '/',
    redirect: '/emp' // 表示重定向到 /emp
  },
]
```


**代码解释：**

- `{ path: '/', redirect: '/emp' }`：当访问 `/` 路径时，重定向到 `/emp` 路径。

现在，重新在浏览器中访问 `http://localhost:7000`，会发现页面直接跳转到 `emp` 页面，并且可以通过点击导航栏在 `emp` 和 `dept` 页面之间进行切换。

