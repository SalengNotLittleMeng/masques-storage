export function getStorageOptions(value){
    if(typeof value =='string'){
        try{
            return JSON.parse(value)
        }catch(e){void 0}
    }
    return value
}