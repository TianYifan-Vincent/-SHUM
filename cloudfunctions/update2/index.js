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
  if (event.flag=='待审核'){
    db.collection(collection)
    .where({
      _openid: id
    }).update({
      data:{
        flag: '已通过'
      },
      success: function (res) {
        console.log('flag修改为已通过',res)
      }
    })
    return {}
  }else if(event.flag=='未通过'){
    db.collection(collection)
    .where({
      _openid: id
    }).update({
      data:{
        flag: '待审核'
      },
      success: function (res) {
        console.log('flag修改为已通过',res)
      }
    })
    return {}
  }else{
    
  }
}