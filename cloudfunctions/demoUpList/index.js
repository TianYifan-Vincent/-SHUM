// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database()
const _=db.command;
// 云函数入口函数
exports.main = async (event, context) => {
 
  
  var id=event.id
  
  return await db.collection("demolist").doc(id).update({
    data:{
      hits:_.inc(7)
    }
  })
}