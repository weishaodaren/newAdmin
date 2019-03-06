const express=require('express');
const pool=require('../../pool');
var router=express.Router();

// 菜品相关路由

router.get('/',(req,res)=>{
    //查询所有菜品类
    pool.query('SELECT cid,cname FROM hp_category',(err,result)=>{
        if(err) throw err;
        var categoryList = result;
        var count=0;
        for(var c of categoryList){
            //循环查询每类的菜品
            pool.query('SELECT * FROM hp_dish WHERE categoryId=?',c.cid,(err,result)=>{
                c.dishList = result;
                count++;
                if(count==categoryList.length)
                res.send(categoryList);
            });
        }
    });
});




module.exports=router;