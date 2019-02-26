SET NAMES UTF8;
DROP DATABASE IF EXISTS hotpot;
CREATE DATABASE hotpot CHARSET=UTF8;
USE hotpot;

--管理员
CREATE TABLE hp_admin(
    aid INT PRIMARY KEY AUTO_INCREMENT,
    aname VARCHAR(32)  UNIQUE,
    apwd VARCHAR(64)
);
INSERT INTO hp_admin VALUES
(NULL,'admin',md5('123456')),
(NULL,'bbaa',md5('666666'));

--全局设置
CREATE TABLE hp_set(
    sid INT PRIMARY KEY AUTO_INCREMENT,
    appName VARCHAR(32),
    apiUrl VARCHAR(64),
    adminUrl VARCHAR(64),
    appUrl VARCHAR(64),
    icp VARCHAR(64),
    copyright VARCHAR(128)
);
INSERT INTO hp_set VALUES
(NULL,'海底捞','http://127.0.0.1:3002','http://127.0.0.1:3003','http://127.0.0.1','XICP备0000000号','Copyright © xxxxxxx');