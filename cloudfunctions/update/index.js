// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'cloud1-6gn92kuf97d4a56e'
})
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  if (event.collection == 'activityIdeal') {
    
    const db = cloud.database()
    const _ = db.command
    var collection = event.collection
    var title = event.title
    var ID = event.ID
    var flag = -1
    if(event.flag != -1)
    {
      flag = 1
    }
    db.collection(collection)
      .where({
        title: title
      }).update({
        data: {
          // 表示指示数据库将字段自增 1
          signUp: _.inc(1*flag),
          participants: _.push(ID)
        },
        success: function (res) {
          console.log('自增处理', res)
        }
      })
  } else if (event.collection=="Function") {
    var volunteer = event.volunteer
    var transfer = event.transfer
    db.collection(event.collection)
      .doc('6d85a2b962668dc600355ebe2c824397')
      .update({
        data: {
          volunteer:volunteer,
          transfer:transfer
        },
        success: function (res) {
          console.log('更改成功', res)
        }
      })
  }

  return {}
}