const express=require('express');
const pool=require('../../pool');

var router=express.Router();

// 菜品相关路由

router.get('/',(req,res)=>{
    //查询所有菜品类
    pool.query('SELECT cid,cname FROM hp_category ORDER BY cid',(err,result)=>{
        if(err) throw err;
         //循环遍历每个菜品类
         var categoryList=result;
         var count=0;
         for(let c of categoryList){
             pool.query('SELECT * FROM hp_dish WHERE categoryId=? ORDER BY did DESC',[c.cid],(err,result)=>{
                if(err) throw err;
                c.dishList = result;
                count++;
                //保证所有类别的菜品都查询完才能发送响应信息
                if(count==categoryList.length){
                    res.send(categoryList);
                }
             })
         }
     })
});

//接收客户端上传的菜品图片 存在访问器 返回随机文件名 非幂等post
const multer=require('multer');//需要在特定的路由使用该中间件
const fs=require('fs');
var upload=multer({
    dest:'tmp/'  //指定客户端上传的文件临时存储路径
});
// 定义路由，使用特定中间件特定位置 single / array
router.post('/image',upload.single('Img'),(req,res)=>{
    // 请求参数
    // console.log(req.file);
    // console.log(req.body);
    //把客户端上传的文件转移到永久图片路径下
    var tmpFile=req.file.path; //临时文件名
    var suffix=req.file.originalname.substring(req.file.originalname.lastIndexOf('.'));
    var newFile=randFileName(suffix);   // 目标文件名
    fs.rename(tmpFile,'img/dish/'+newFile,()=>{
        res.send({code:200,msg:'upload succ',fileName:newFile});
    });//把临时文件转移
   
});

// 生成随机文件名   suffix参数后缀
function randFileName(suffix){
    var time=new Date().getTime();
    var num=Math.floor(Math.random()*(10000-1000)+1000); //四位随机数
    return time+num+suffix;
};



// min max : Math.random()*(max-min)+min
module.exports=router;