const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const categoryRouter=require('./routes/admin/category');
const adminRouter=require('./routes/admin/admin');
const dishRouter=require('./routes/admin/dish');
//主服务器
var app=express();
app.listen(6606,()=>{
    console.log(`服务器启动，全体注意...`)
});
//使用中间件
app.use(cors());
app.use(bodyParser.json());

// 挂载路由器
app.use('/admin/category',categoryRouter);
app.use('/admin',adminRouter);
app.use('/admin/dish',dishRouter);






