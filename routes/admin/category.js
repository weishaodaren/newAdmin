// 创建菜品路由
const express=require('express');
const pool=require('../../pool.js');
var router=express.Router();


// 客户端获取所有菜品类别，按编号升序排列
router.get('/',(req,res)=>{
    pool.query('SELECT * FROM hp_category ORDER BY cid',(err,result)=>{
        if(err) throw err;
        res.send(result);
    });
});
// 删除
router.delete('/:cid',(req,res)=>{
    //删除前，编号上设置为null
    pool.query('UPDATE hp_dish SET categoryId=NULL WHERE categoryId=?',[req.params.cid],(err,result)=>{
        if(err) throw err;
        //指定类别菜品修改完毕
    pool.query('DELETE FROM hp_category WHERE cid=?',[req.params.cid],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:200,msg:`1 category deleted`});
        }else{
            res.send({code:400,msg:`0 category deleted`});
        }
    });
    });
//添加
router.post('/',(req,res)=>{
    // console.log(`获取到请求数据:`);
    // console.log(req.body);
    var data=req.body;
    pool.query('INSERT INTO hp_category SET ?',[data],(err,result)=>{
        if(err) throw err;
        res.send({code:200,msg:`1 category added`});
    });

});
});
//修改
router.put('/',(req,res)=>{
    var data=req.body;
    pool.query('UPDATE hp_category SET ? WHERE cid=?',[data,data.cid],(err,result)=>{
        if(err) throw err;
        if(result.changedRows>0){
            res.send({code:200,msg:`1 category updated`});
        }else if(result.affectedRows==0){
            res.send({code:400,msg:`category not exists`});
        }else if(result.affectedRows==1&&result.changedRows==0){
            res.send({code:401,msg:`no category modified`});
        }
    });
});


module.exports=router;