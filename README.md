# 现成

[sentry](https://sentry.io/welcome/)

[fundebug](https://www.fundebug.com/)

还有很多很对开源项目

# 监控内容

1. 错误统计
2. 行为日志(PV/UV统计)
3. 性能监控


## 行为日志采集

## 错误日志采集 5种

### 语法错误

无法被 try/catch 捕获。

```js
try {
  let name = 'liquor   
  console.log(name)
} catch (error) {
  console.log('🚀::::::🐶💩','无法捕获语法错误')
}

```

### 同步错误

可以被 try/catch 捕获。

```js
try {
 let name = 'liquor'
  console.log(nam)
} catch (error) {
  console.log('🚀::::::🐶💩','捕获同步错误')
}
```

### 异步错误

setTimeout

无法被 try/catch 捕获，但是能够通过 `window.onerror` 捕获。

但是`window.onerror`也不是万能，比如无法捕获 Promise错误

```js
try {
  setTimeout(()=>{
    let name = 'liquor'
    console.log(nam)
  }) 
} catch (error) {
  console.log('🚀::::::🐶💩', '无法捕获异步错误') 
}
```

window.onerror

```js
window.onerror = function(msg,url,row,col,error){
  console.log('🚀::::::🐶💩',msg,url,row,col,error)
}
```

### Promise错误

可以通过自身的Promise.catch捕获，但是window.error无法捕获Promise的错误

```js
Promise.reject('123').catch(err=>{console.log(err)})
```

```js
window.onerror = function(msg,url,row,col,error){
  console.log('🚀::::::🐶💩',msg,url,row,col,error)
}
Promise.reject('123') //报错
```

但是 浏览器提供了一个 专门捕获Promise的API -> `unhandledrejection`

```js
window.addEventListener('unhandledrejection', function(event) {
  console.log('🚀::::::🐶💩',event)
});
Promise.reject('123') //但是还是会报错, 与catch不同
```

### 资源加载错误

可以通过 `error Event` 捕获，无法通过`window.onerror`捕获。

```js
window.addEventListener('error', function(event) {
  console.log('🚀::::::🐶💩',event)
});
```

> 多个window.onerror 会被覆盖。window.onerror/window.addEventListener('error')可能会重复触发。


## 行为日志采集 埋点


onClick事件-埋点：可以通过抛出方法，点击的时候调用（也就是手动），还有属性埋点和还有自动埋点。

通过冒泡特性，在body上绑定事件

```html
<!-- 抛出方法 -->
<button onclick="console.log('🚀::::::🐶💩');tracker('按钮被点击了')">点击</button>
<!-- 属性埋点 -->
<button onclick="console.log('🚀::::::🐶💩')">点击</button>
<!-- 自动埋点 -->
<button onclick="console.log('🚀::::::🐶💩');">点击</button>
```


```js
document.body.addEventListener('click',(event)=>{
  // 处理 只能上报一个基本的dom信息
  tracker('body被点击了')
})
```

## 访问日志采集

### PV统计
 
统计用户在页面停留时间

需要区分 history和hash路由

`history.pushState` 和 `history.replaceState` 不会触发 `popstate` 事件

> 疑问
> 
> 这两个不会触发popstate，而又无法监听，但是在我印象中，vueRouter好像就是使用pushState
>
> 那vueRouter内部是怎么控制路由的？


## 数据结构设计

