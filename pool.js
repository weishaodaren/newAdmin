const mysql=require('mysql');
//创建连接池
var pool=mysql.createPool({
    host:'127.0.0.1',
    port:3306,
    user:'root',
    password:'',
    database:'hotpot',
    connectionLimit:20
});
//导出
module.exports=pool;









