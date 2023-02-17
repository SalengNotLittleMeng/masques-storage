function c(r) {
  if (typeof r == "string")
    try {
      return JSON.parse(r);
    } catch {
    }
  return r;
}
class h {
  constructor(e = {}) {
    this.storageHandler = this.creatStorageHandler(e);
  }
  creatStorageHandler(e) {
    return e.handler;
  }
  get(e, t = !1) {
    if (t)
      return this.storageHandler.get(e);
    const s = c(this.storageHandler.get(e));
    return this.handlerGetMethods ? this.handlerGetMethods(s, e) : s && s.value;
  }
  set(e, t = {}) {
    Object.keys(e).forEach((s) => {
      if (t.isRow) {
        this.storageHandler.set(s, JSON.stringify(e[s]));
        return;
      }
      const i = /* @__PURE__ */ Object.create({});
      i.value = e[s], this.handlerSetMethods && this.handlerSetMethods(i, t), this.storageHandler.set(s, JSON.stringify(i));
    });
  }
  delete(e) {
    this.storageHandler.delete(e);
  }
}
class n extends h {
  constructor() {
    super();
  }
  creatStorageHandler() {
    return {
      get(e) {
        return sessionStorage.getItem(e);
      },
      set(e, t) {
        sessionStorage.setItem(e, t);
      },
      delete(e) {
        sessionStorage.removeItem(e);
      }
    };
  }
}
function o(r, e) {
  e.timeout ? r.timeout = new Date().getTime() + (e.timeout || 0) : r.timeout = -1;
}
function u(r) {
  const { timeout: e } = r;
  return e == -1 ? !1 : new Date().getTime() > e;
}
class a extends h {
  constructor() {
    super();
  }
  creatStorageHandler() {
    return {
      get(e) {
        return localStorage.getItem(e);
      },
      set(e, t) {
        localStorage.setItem(e, t);
      },
      delete(e) {
        localStorage.removeItem(e);
      }
    };
  }
  handlerSetMethods(e, t) {
    o(e, t);
  }
  handlerGetMethods(e, t) {
    const s = e.value;
    return u(e) && this.storageHandler.delete(t), s;
  }
}
class l {
  constructor(e) {
    this.options = e, this.cacheName = this.options.cacheName || "__masque_cache__", this.cacheList = [], this.MapCache = null, this.initCache(), this.flush = !0, this.bufferIndex = 0, this.timer = null;
  }
  // 初始化方法，读取本地存储中的缓存并初始化Map对象
  initCache() {
    const e = this.options.init();
    if (!e) {
      this.cacheList = [], this.MapCache = /* @__PURE__ */ new Map();
      return;
    }
    this.cacheList = e, this.MapCache = new Map(this.cacheList.map((t) => [t.key, t.value]));
  }
  //添加缓存，并将最新添加的放在队列首部
  add(e, t) {
    try {
      const s = this.getCacheObject(e, t);
      this.cacheList.unshift(s), this.MapCache.set(e, t), this.bufferIndex++, this.eventBuffer();
    } catch {
    }
  }
  //通过定时器减少写入内存的次数,这里通过两种策略，一是设置缓冲区大小，超过大小则检查内存占用；二是通过定时器事件，保证最后总会执行写入或处理内存
  eventBuffer() {
    if (this.bufferIndex > this.options.buffer) {
      this.checkMemery(), this.bufferIndex = 0;
      return;
    }
    this.options.needSetTimeout && (this.timer && clearTimeout(this.timer), this.timer = setTimeout(() => {
      this.bufferIndex = 0, this.checkMemery();
    }, 3e3));
  }
  //查找缓存，如果找到的话更新缓存队列，实现lru算法
  find(e) {
    try {
      const t = this.MapCache.get(e);
      return t ? (this.cacheList.splice(this.cacheList.findIndex((s) => s.city == city), 1), this.cacheList.unshift(this.getCacheObject(e, t)), t) : !1;
    } catch {
      return !1;
    }
  }
  //创建缓存对象
  getCacheObject(e, t) {
    return {
      key: e,
      value: t
    };
  }
  //对数据进行缓存
  cacheStorage() {
    this.options.cacheStorage(this.cacheList);
  }
  //清理缓存，当数据条过大时触发清理机制，清除一般的缓存
  clearCache() {
    let e = Math.floor(this.cacheList.length / 3) * 2;
    for (; e; )
      this.MapCache.delete(this.cacheList.pop().city), e--;
  }
  //检查缓存，如果缓存数据过多则触发清理机制
  checkMemery() {
    this.cacheList.length > this.options.size ? this.clearCache() : this.cacheStorage();
  }
}
function f(r, e) {
  switch (r) {
    case "session":
      return new n(e);
    case "local":
      return new a(e);
    case "cache":
      return new l(e);
    default:
      return new a(e);
  }
}
export {
  f as default
};
//# sourceMappingURL=masquesStorage.js.map
