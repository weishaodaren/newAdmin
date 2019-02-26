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

-- 桌台
CREATE TABLE hp_tab(
    tid INT PRIMARY KEY AUTO_INCREMENT,
    tname VARCHAR(32),
    type VARCHAR(32),
    status INT
);
INSERT INTO hp_tab VALUES
(NULL,'1','2人桌',1),
(NULL,'2','4人桌',2),
(NULL,'3','6-8人桌',3),
(NULL,'2','10人桌',4);

-- 预定信息
CREATE TABLE hp_reservation(
    rid INT PRIMARY KEY AUTO_INCREMENT,
    contentName VARCHAR(32),
    phone VARCHAR(16),
    contentTime BIGINT,
    dinnerTime BIGINT
);
INSERT INTO hp_reservation VALUES
(NULL,'A先生','15821111111','1551157337846','1551434400000'),
(NULL,'B女士','15821111111','1551157337846','1551434400000'),
(NULL,'C小姐','15821111111','1551157337846','1551434400000'),
(NULL,'D先生','15821111111','1551157337846','1551434400000');

-- 菜品分类
CREATE TABLE hp_category(
    cid INT PRIMARY KEY AUTO_INCREMENT,
    cname VARCHAR(32)
);
INSERT INTO hp_category VALUES
(NULL,'肉类'),
(NULL,'丸滑类'),
(NULL,'海鲜河鲜'),
(NULL,'蔬菜豆制品'),
(NULL,'菌菇类');

--菜品
CREATE TABLE hp_dish(
    did INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(32),
    imgUrl VARCHAR(32),
    price DECIMAL(6,2),
    detail VARCHAR(128),
    categoryId INT,
    FOREIGN KEY(cid) REFERENECS hp_category(cid)
);
INSERT INTO hp_dish VALUES
(NULL,'草鱼片','CE7I9470_fish.jpg',40,'选鲜活草鱼，切出鱼片冷鲜保存。锅开后再煮1分钟左右即可食用。','1'),
(NULL,'脆皮肠','CE7I901702.jpg',30,'锅开后再煮3分钟左右即可食用。','2'),
(NULL,'酥肉','HGS_476003.jpg',35,'选用冷鲜五花肉，加上鸡蛋，淀粉等原料炸制，色泽黄亮，酥软醇香，肥而不腻。锅开后再煮3分钟左右即可食用。','3');


--订单
CREATE TABLE hp_order(
    oid INT PRIMARY KEY AUTO_INCREMENT,
    sTime BIGINT,
    eTime BIGINT,
    customerCount INT,
    tabId INT,
    FOREIGN KEY(tabId) REFERENECS hp_tab(tid)
);
INSERT INTO hp_order VALUES
(1,1551412800000,1551416400000,3,2,);

--订单详情
CREATE TABLE hp_order_detail(
    oid INT PRIMARY KEY AUTO_INCREMENT,
    dishId INT,   --菜品编号
    dishCount INT,  --份数
    customerName VARCHAR(32),  --顾客名
    orderId INT,    --  订单编号
    FOREIGN KEY(dishId) REFERENECS hp_dish(did),
    FOREIGN KEY(orderId) REFERENECS hp_dish(oid)
);
INSERT INTO hp_order_detail VALUES
(NULL,1,1,'A先生',1);