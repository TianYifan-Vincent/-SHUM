// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext=cloud.getWXContext()
  const db=cloud.database()
  const _ = db.command
  var collection=event.collection
  var id=event.id
  db.collection(collection)
        .where({
          _openid: id
        }).update({
          data:{
            flag: '未通过'
          },
          success: function (res) {
            console.log('flag修改为未通过',res)
          }
        })
  return {}
}