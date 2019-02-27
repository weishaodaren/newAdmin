const express=require('express');
//主服务器
var app=express();
app.listen(3002,()=>{
    console.log(`服务器启动，全体注意...`)
});