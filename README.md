# @masques/storage

## 简介

masques 中的内置的浏览器存储模块，可以实现本地存储的统一管理，序列化，过期时间设置，存储加密，命名空间，响应式 hook，内置 LRU 缓存方法支持，可以轻松实现对于缓存的管理

masques（基于 Vue3 的中后台解决方案）的整体功能集成模板：：https://github.com/SalengNotLittleMeng/masques

项目 GitHub 地址：https://github.com/SalengNotLittleMeng/masques-storage

## 功能

创建实例：

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

如果第一个参数是'encryp',则返回的是加密对象，有两个方法

使用 hook:
