export const createQueryStringFromObject = (object: any):string => {
    let queryStr: string = ''
  
    for (const key in object) {
        if (object[key]) {
            queryStr += `${key}=${object[key]}&`
        }
    }
    let lastIndex = queryStr.lastIndexOf('&')
    queryStr = queryStr.slice(0,lastIndex)
    return queryStr
  }
  