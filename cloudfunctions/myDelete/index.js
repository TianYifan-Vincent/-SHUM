// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  try {
    return await db.collection(event.name).where({
      _id:event.id
    }).remove()
  } catch(e) {
    console.error(e)
  }
}