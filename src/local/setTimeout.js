export function setTimeoutForSetter(decorativeObject,options){
        if(!options.timeout){
            decorativeObject.timeout=-1  
        }else{
            decorativeObject.timeout=new Date().getTime()+(options.timeout || 0)
        }
}
export function checkTimeoutForGetter(decorativeObject){
    const {timeout}=decorativeObject
    return timeout==-1?false:new Date().getTime()>timeout
}