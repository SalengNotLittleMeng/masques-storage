//设置超时功能
export function setTimeoutForSetter(decorativeObject,options){
        if(!options.timeout){
            decorativeObject.timeout=-1  
        }else{
            decorativeObject.timeout=new Date().getTime()+(options.timeout || 0)
        }
}
//检验是否超时
export function checkTimeoutForGetter(decorativeObject){
    const {timeout}=decorativeObject
    return timeout==-1?false:new Date().getTime()>timeout
}