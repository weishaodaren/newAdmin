const express=require('express');
const pool=require('../../pool');
var router=express.Router();
// GET 不可以请求主体 特殊除外
router.get('/login/:aname/:apwd',(req,res)=>{
    var aname=req.params.aname;
    var apwd=req.params.apwd;
    pool.query('SELECT aid FROM hp_admin WHERE aname=? AND apwd=PASSWORD(?)',[aname,apwd],(err,result)=>{
        console.log(result);
        //增删改 返回对象  查 返回数组
        if(err) throw err;
        if(result.length>0){   //查询到一行数据
            res.send({code:200,msg:'login succ'});
        }else{      //没有查询导数据
            res.send({code:400,msg:'aname or apwd err'})
        }
    });

});

// 修改密码  修改部分数据patch打补丁  全部用put
router.patch('/',(req,res)=>{
    var data=req.body;
    //先根据aname、oldPwd查询该用户是否存在
    pool.query('SELECT aid FROM hp_admin WHERE aname=? AND apwd=PASSWORD(?)',[data.aname,data.oldPwd],(err,result)=>{
        if(err) throw err;
        if(result.length==0){
            res.end({code:'400',msg:'apwd err'});
            return;
        }
    // 如果查询到了用户，在修改其密码
    pool.query('UPDATE hp_admin SET apwd=PASSWORD(?) WHERE aname=?',[data.newPwd,data.aname],(err,result)=>{
        if(err) throw err;
        if(result.changedRows>0){
            res.send({code:200,msg:'modsify succ'})
        }else{
            res.send({code:401,msg:'pwd not modified'})
        }
    });
    });
   
});



module.exports=router;



