export default class Cache {
    constructor(options) {
        this.options = options
        this.cacheName = this.options.cacheName || '__masque_cache__'
        this.cacheList = []
        this.MapCache = null
        this.initCache()
        this.flush = true
        this.bufferIndex = 0
        this.timer = null
    }
    // 初始化方法，读取本地存储中的缓存并初始化Map对象
    initCache() {
        const initList=this.options.init()
        if (!initList) {
            this.cacheList = []
            this.MapCache = new Map()
            return
        }
        this.cacheList =initList
        this.MapCache = new Map(this.cacheList.map(item => {
            return [item.key, item.value]
        }))
    }
    //添加缓存，并将最新添加的放在队列首部
    add(key, value) {
        // 如果数据量过大（超过100条）可以认为是中间查找的过程，无需缓存
        try {
            const cacheValue = this.getCacheObject(key, value)
            this.cacheList.unshift(cacheValue)
            this.MapCache.set(key, value)
            this.bufferIndex++
            this.eventBuffer()
        } catch (e) { }

    }
    //通过定时器减少写入内存的次数,这里通过两种策略，一是设置缓冲区大小，超过大小则检查内存占用；二是通过定时器事件，保证最后总会执行写入或处理内存
    eventBuffer() {
        //如果缓冲区大于5，执行写入操作
        if (this.bufferIndex > this.options.buffer) {
            this.checkMemery()
            this.bufferIndex = 0
            return
        }
        if(!this.options.needSetTimeout){
            return
        }
        //如果开启了定时器则重制
        if (this.timer) {
            clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
            this.bufferIndex = 0
            this.checkMemery()
        }, 3000)
    }
    //查找缓存，如果找到的话更新缓存队列，实现lru算法
    find(key) {
        try {
            const result = this.MapCache.get(key)
            if (!result) { return false }
            this.cacheList.splice(this.cacheList.findIndex(item => item.city == city), 1)
            this.cacheList.unshift(this.getCacheObject(key, result))
            return result
        } catch (e) {
            return false
        }
    }
    //创建缓存对象
    getCacheObject(key, value) {
        return {
            key,value
        }
    }
    //对数据进行缓存
    cacheStorage() {
        this.options.cacheStorage(this.cacheList)
    }
    //清理缓存，当数据条过大时触发清理机制，清除一般的缓存
    clearCache() {
        let endIndex = Math.floor(this.cacheList.length / 3) * 2
        while (endIndex) {
            this.MapCache.delete(this.cacheList.pop().city)
            endIndex--
        }
    }
    //检查缓存，如果缓存数据过多则触发清理机制
    checkMemery() {
        if (this.cacheList.length > this.options.size) {
            this.clearCache()
        } else {
            this.cacheStorage()
        }
    }
}

// const cache = new CityCache({
//     cacheName: '__citylist_cache__',
//     size: 40,
//     buffer: 5
// })
