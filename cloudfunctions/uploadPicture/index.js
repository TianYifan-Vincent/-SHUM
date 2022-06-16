// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()


// 云函数入口函数
exports.main = async (event, context) => {
  // // 参数
  // // 目标集合名称
  // var name=event.name
  // // 各属性
  // var data=event.data
  // return await db.collection(name).add({
  //   data:{
  //     title:data.title,
  //     content:data.content
  //   }
  // })
  // 照片的临时路径
  var tempPath=[]
  tempPath = event.path
  // fileID
  var pUrl = []
  for (var i = 0; i < tempPath.length; i++) {
    var item = tempPath[i]
    var filename = Date.now() + "_" + i
    await cloud.uploadFile({
      cloudPath: filename + '.jpg',
      filePath: item
    }).then(res => {
      console.log('上传成功', res)
      pUrl.push(res.fileID)
    })
  }
  return {
    pUrl
  }
}