/**
 * 分组并发请求，一组请求完成后调用一次回调，并将结果以数组的形式按序排列返回
 * 一组完成后才开始下一组的发送
 * @param {List<Function>} requestArr 请求方法数组
 * @param {Number} concurCount 并发数
 * @param {Function} callback 每组并发完成后的回调
 * @param {Function} doneCallback 全部请求完成后的回调
 * @param {Number} maxRetryNum 单个请求最大重试次数
 */
export const concurRequest = function(requestArr, concurCount, callback, doneCallback, maxRetryNum) {

    if(!Array.isArray(requestArr)||requestArr.length===0) {
      doneCallback()
      return
    }

    concurCount = requestArr.length>concurCount?concurCount:requestArr.length
  
    const result = []
    let finCount = 0

    for(let i = 0;i < concurCount;i++) {
      const request = requestArr.shift()
      let retryCount = 0
      request().then(res => {
        result[i] = res
        finCount++
        //本组全部完成时，调用回调，再递归开启下一组
        if(finCount===concurCount) {
          callback(result)
          concurRequest(requestArr, concurCount, callback, doneCallback)
        }
      }).then(() => {
        retryCount++
        if(retryCount >= maxRetryNum) {
          throw "请求发生错误"
        }
        console.info("失败重试");
        
        request()
      })
    }
  
}