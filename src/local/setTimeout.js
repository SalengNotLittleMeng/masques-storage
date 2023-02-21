//设置超时功能
export function setTimeoutForSetter(decorativeObject,options){
        if(!options.timeout){
            decorativeObject.timeout=-1  
        }else{
            if(typeof options.timeout=='object'){
                decorativeObject.timeout=new Date().getTime()+(options.timeout.time || 0)
                decorativeObject.resetTimeout=true
            }else if(typeof options.timeout=='number'){
                decorativeObject.timeout=new Date().getTime()+(options.timeout || 0)
            }else{
                throw new TypeError('timeout should be a number or object')
            }
            decorativeObject.timeout=new Date().getTime()+(options.timeout || 0)
        }
}
export function timeoutForGetter(decorativeObject,key){
        //检验超时并删除
        const {value,timeout,resetTimeout=false}=decorativeObject
        if(checkTimeout(decorativeObject)){
            this.storageHandler.delete(key)
            return null
        }else{
            if(resetTimeout){
                decorativeObject.timeout=new Date().getTime()+timeout
                localStorage.setItem(key,JSON.stringify(decorativeObject))
            }
        }
        return value
}
//检验是否超时
function checkTimeout(decorativeObject){
    const {timeout}=decorativeObject
    return timeout==-1?false:new Date().getTime()>timeout
}