const express=require('express');
const pool=require('../../pool');

var router=express.Router();
router.get('/',(req,res)=>{         // LIMIT 1个参数==行数
    pool.query('SELECT * FROM hp_settings LIMIT 1',(err,result)=>{
        if(err) throw err;
        res.send(result[0]);
    });

});

//修改全局信息 幂等
router.put('/',(req,res)=>{
    pool.query('UPDATE hp_settings SET ?',[req.body],(err,result)=>{
        if(err) throw err;
        res.send({code:200,msg:'settings update succ'})
    });
});










module.exports=router;