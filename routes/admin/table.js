const express=require('express');
const pool=require('../../pool');

var router=express.Router();

//获取桌台信息
router.get('/',(req,res)=>{
    pool.query('SELECT * FROM hp_table ORDER BY tid',(err,result)=>{
        if(err) throw err;
        res.send(result);
    })
});

module.exports=router;