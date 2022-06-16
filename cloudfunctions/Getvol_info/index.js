// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
var $ = cloud.database().command.aggregate
const db=cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
    //1、引用数据库
    //2、开始查询数据了
    return db.collection('vol_info').get().then(res=>{return res;}).catch(err=>{return error;})
    // .group({
    //   _id: {
    //     _id: '$flag',
    //     stuName: '$stuName',
    //     num: $.sum(1)
    //   }, 
    // })
    // .end({
    //   success: res => {
    //     return res;
    //   },
    //   fail(error){
    //     return error;
    //   }
    // })
}