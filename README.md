# @masques/storage

## 简介

masques 中的内置的浏览器存储模块，可以实现本地存储的统一管理，序列化，过期时间设置，存储加密，命名空间，响应式 hook，内置 LRU 缓存方法支持，可以轻松实现对于缓存的管理

masques（基于 Vue3 的中后台解决方案）的整体功能集成模板：：https://github.com/SalengNotLittleMeng/masques

项目 GitHub 地址：https://github.com/SalengNotLittleMeng/masques-storage

## 功能

### 创建实例：

useMasquesStorage 是一个工厂对象，接收两个参数 type 和 options，内部会根据 type 的值，返回不同的 storage 对象，做不同的操作

```js
import useMasquesStorage from 'masquesStorage';
const storage = useMasquesStorage('local', {
  //设置超时时间
  timeout: {
    time: 100,
    reset: true, //是否获取时重设时间
  },
  //是否加密
  isEncryped: true,
  //命名空间
  nameSpace: 'main',
});
//以对象形式存储，可以存储多个值
storage.set({ key: value });
console.log(storgae.get('key'));
console.log(storage.get('key', { isRow: true })); //获取原始值
```

如果第一个参数是'session',则操作的是 sessionStorage，会自动进行序列化操作

如果第一个参数是'encryp',则返回的是加密对象，有两个方法encryption和 decrypt可以对数据进行加密和解密，如果配置该参数，那么配置参数中可以传入参数key（一个16进制数）作为密钥

如果第一个参数是‘cahce’,则会返回一个lru缓存对象，用于处理缓存
```js
const cache = new useMasquesStorage('cache',{
    cacheName: '__citylist_cache__',        //缓存名称
    size: 40,  //最大保存容量
    buffer: 5
    needSetTimeout:true //超过容量后进行定时清除
})
cache.add(value) //新增值
cache.find(value)  //查找，使用值
```
### 存储事件劫持
浏览器的storage事件，仅能侦听其他页面发生的存储改变事件，如果我们需要订阅本地的存储更改，就需要进行额外的处理，masquesStorage为我们实现了一套存储事件劫持的方案
```js
import {initStorageObserve} from 'masquesStorage';
initStorageObserve()
window.addEventListener('store',(e)=>{
    console.log(e)
})
```
当执行initStorageObserve这个方法后，本地的Storage对象会被劫持，浏览器会多出一个store的事件，每当我们使用localstorage时就会触发这个事件，事件参数event中的detail会包含本次事件的键值对和事件类型

### 响应式hook:

除了使用工厂模式进行调用，masquesStorage可以使用响应式hook，来实现本地存储的响应式

#### 原生响应式
不依赖任何框架自己实现的本地存储响应式，每当本地的存储更新或返回的值更新其中一个更新后，另一个都会响应式更新

注意需要操作的是hook返回值的value

```js
import {useStorageRow} from 'masquesStorage';
const value=useStorageRow('hello','word')
value.value=23
console.log(localstorage.getItem('hello'))
```

#### 基于Vue：

基于vue的响应式hook实现的响应式，需要在vue3中使用

```js
import {useStorage} from 'masquesStorage';
const value=useStorage(key,value)
```
当修改value的值后，本地存储会同步修改

