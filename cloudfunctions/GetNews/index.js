// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  const MAX_LIMIT = 6
  var arr = []
  if (event.collection == "newsIdeal" || event.collection == "activityIdeal") {
    if (event.id) {
      await db.collection(event.collection).doc(event.id).get().then(res => {
        // res.data 包含该记录的数据
        console.log(res.data)
        arr = res.data
        console.log('????')
      })

    } else {
      await db.collection(event.collection)
        .limit(MAX_LIMIT)
        .orderBy('upLoadTime', 'desc')
        .skip(event.page * MAX_LIMIT)
        .get()
        .then(res => {
          console.log("查询成功???")
          console.log(res.data)
          arr = res.data
        })
    }
  } else if (event.collection == "longmenshiku_waterfall") {
    await db.collection(event.collection)
      .where({
        cls: event.cls
      })
      .limit(MAX_LIMIT)
      .skip(event.page * MAX_LIMIT)
      .get()
      .then(res => {
        console.log("查询成功")
        console.log(res.data)
        arr = res.data
      })
  } else if (event.collection == "Function") {
    await db.collection(event.collection)
      .get()
      .then(res => {
        console.log("查询成功")
        console.log(res.data)
        arr = res.data
      })
  } else if (event.collection == 'administrator') {
    // await db.collection(event.collection)
    // .get()
    // .then(res => {
    //   console.log("查询成功")
    //   console.log(res.data)
    //   arr = res.data
    // })
    const countResult = await db.collection(event.collection).count()
    const total = countResult.total
    // 计算需分几次取
    const batchTimes = Math.ceil(total / 100)
    // 承载所有读操作的 promise 的数组
    const tasks = []
    for (let i = 0; i < batchTimes; i++) {
      const promise = db.collection(event.collection).skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
      tasks.push(promise)
    }
    // 等待所有
    return (await Promise.all(tasks)).reduce((acc, cur) => {
      return {
        data: acc.data.concat(cur.data),
        errMsg: acc.errMsg,
      }
    })
  } else {
    await db.collection(event.collection)
      .limit(MAX_LIMIT)
      .skip(event.page * MAX_LIMIT)
      .get()
      .then(res => {
        console.log("查询成功")
        console.log(res.data)
        arr = res.data
      })
  }

  var result = {}
  result.errCode = 0
  result.errMsg = '查询成功'
  var data = {}
  data.arr = arr
  result.data = data
  return result
}