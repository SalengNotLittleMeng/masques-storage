const methodsList=['getItem','setItem','clear','removeItem']
export default class Observe{
    constructor(options){
        this.reWriteLocalMethods()
    }
    reWriteLocalMethods(){
        methodsList.forEach(method=>{
            const _localStorageFn=localStorage[method]
            Storage.prototype[method] = (function(key, value) {
                this.call(localStorage, key, value);
            }).bind(Storage.prototype[method]);
        })
    }
}