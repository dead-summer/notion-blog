---
title: Day07-1 数据库操作-DQL
createTime: 2025/03/01T12:58:00.000Z
updateTime: 2025/03/02T02:43:00.000Z
permalink: /itheima-javaweb/day07-1-database-operations-dql/
---

## ****介绍****


**DQL (Data Query Language)** 即数据查询语言，用于查询数据库表中的记录。核心关键字是 `SELECT`。查询操作在 SQL 语句中非常常见且重要，网站或 APP 上展示的信息通常都是通过 DQL 从数据库中查询得到的，查询中会涉及到条件、排序、分页等操作。


## ****语法****


DQL 查询语句的完整语法结构如下：


```sql
SELECT
    字段列表
FROM
    表名列表
WHERE
    条件列表
GROUP BY
    分组字段列表
HAVING
    分组后条件列表
ORDER BY
    排序字段列表
LIMIT
    分页参数
```


为了便于演示，我们首先创建数据库 `db02` 和表 `tb_emp`，并插入一些测试数据：


```sql
create database db02; -- 创建数据库
use db02; -- 切换数据库

-- 员工管理(带约束)
create table tb_emp (
    id int unsigned primary key auto_increment comment 'ID',
    username varchar(20) not null unique comment '用户名',
    password varchar(32) default '123456' comment '密码',
    name varchar(10) not null comment '姓名',
    gender tinyint unsigned not null comment '性别, 说明: 1 男, 2 女',
    image varchar(300) comment '图像',
    job tinyint unsigned comment '职位, 说明: 1 班主任,2 讲师, 3 学工主管, 4 教研主管',
    entrydate date comment '入职时间',
    create_time datetime not null comment '创建时间',
    update_time datetime not null comment '修改时间'
) comment '员工表';

-- 准备测试数据
INSERT INTO tb_emp (id, username, password, name, gender, image, job, entrydate, create_time, update_time) VALUES
    (1, 'jinyong', '123456', '金庸', 1, '1.jpg', 4, '2000-01-01', '2022-10-27 16:35:33', '2022-10-27 16:35:35'),
    (2, 'zhangwuji', '123456', '张无忌', 1, '2.jpg', 2, '2015-01-01', '2022-10-27 16:35:33', '2022-10-27 16:35:37'),
    (3, 'yangxiao', '123456', '杨逍', 1, '3.jpg', 2, '2008-05-01', '2022-10-27 16:35:33', '2022-10-27 16:35:39'),
    (4, 'weiyixiao', '123456', '韦一笑', 1, '4.jpg', 2, '2007-01-01', '2022-10-27 16:35:33', '2022-10-27 16:35:41'),
    (5, 'changyuchun', '123456', '常遇春', 1, '5.jpg', 2, '2012-12-05', '2022-10-27 16:35:33', '2022-10-27 16:35:43'),
    (6, 'xiaozhao', '123456', '小昭', 2, '6.jpg', 3, '2013-09-05', '2022-10-27 16:35:33', '2022-10-27 16:35:45'),
    (7, 'jixiaofu', '123456', '纪晓芙', 2, '7.jpg', 1, '2005-08-01', '2022-10-27 16:35:33', '2022-10-27 16:35:47'),
    (8, 'zhouzhiruo', '123456', '周芷若', 2, '8.jpg', 1, '2014-11-09', '2022-10-27 16:35:33', '2022-10-27 16:35:49'),
    (9, 'dingminjun', '123456', '丁敏君', 2, '9.jpg', 1, '2011-03-11', '2022-10-27 16:35:33', '2022-10-27 16:35:51'),
    (10, 'zhaomin', '123456', '赵敏', 2, '10.jpg', 1, '2013-09-05', '2022-10-27 16:35:33', '2022-10-27 16:35:53'),
    (11, 'luzhangke', '123456', '鹿杖客', 1, '11.jpg', 2, '2007-02-01', '2022-10-27 16:35:33', '2022-10-27 16:35:55'),
    (12, 'hebiweng', '123456', '鹤笔翁', 1, '12.jpg', 2, '2008-08-18', '2022-10-27 16:35:33', '2022-10-27 16:35:57'),
    (13, 'fangdongbai', '123456', '方东白', 1, '13.jpg', 1, '2012-11-01', '2022-10-27 16:35:33', '2022-10-27 16:35:59'),
    (14, 'zhangsanfeng', '123456', '张三丰', 1, '14.jpg', 2, '2002-08-01', '2022-10-27 16:35:33', '2022-10-27 16:36:01'),
    (15, 'yulianzhou', '123456', '俞莲舟', 1, '15.jpg', 2, '2011-05-01', '2022-10-27 16:35:33', '2022-10-27 16:36:03'),
    (16, 'songyuanqiao', '123456', '宋远桥', 1, '16.jpg', 2, '2010-01-01', '2022-10-27 16:35:33', '2022-10-27 16:36:05'),
    (17, 'chenyouliang', '12345678', '陈友谅', 1, '17.jpg', null, '2015-03-21', '2022-10-27 16:35:33', '2022-10-27 16:36:07'),
    (18, 'zhang1', '123456', '张一', 1, '2.jpg', 2, '2015-01-01', '2022-10-27 16:35:33', '2022-10-27 16:36:09'),
    (19, 'zhang2', '123456', '张二', 1, '2.jpg', 2, '2012-01-01', '2022-10-27 16:35:33', '2022-10-27 16:36:11'),
    (20, 'zhang3', '123456', '张三', 1, '2.jpg', 2, '2018-01-01', '2022-10-27 16:35:33', '2022-10-27 16:36:13'),
    (21, 'zhang4', '123456', '张四', 1, '2.jpg', 2, '2015-01-01', '2022-10-27 16:35:33', '2022-10-27 16:36:15'),
    (22, 'zhang5', '123456', '张五', 1, '2.jpg', 2, '2016-01-01', '2022-10-27 16:35:33', '2022-10-27 16:36:17'),
    (23, 'zhang6', '123456', '张六', 1, '2.jpg', 2, '2012-01-01', '2022-10-27 16:35:33', '2022-10-27 16:36:19'),
    (24, 'zhang7', '123456', '张七', 1, '2.jpg', 2, '2006-01-01', '2022-10-27 16:35:33', '2022-10-27 16:36:21'),
    (25, 'zhang8', '123456', '张八', 1, '2.jpg', 2, '2002-01-01', '2022-10-27 16:35:33', '2022-10-27 16:36:23'),
    (26, 'zhang9', '123456', '张九', 1, '2.jpg', 2, '2011-01-01', '2022-10-27 16:35:33', '2022-10-27 16:36:25'),
    (27, 'zhang10', '123456', '张十', 1, '2.jpg', 2, '2004-01-01', '2022-10-27 16:35:33', '2022-10-27 16:36:27'),
    (28, 'zhang11', '123456', '张十一', 1, '2.jpg', 2, '2007-01-01', '2022-10-27 16:35:33', '2022-10-27 16:36:29'),
    (29, 'zhang12', '123456', '张十二', 1, '2.jpg', 2, '2020-01-01', '2022-10-27 16:35:33', '2022-10-27 16:36:31');
```


## ****基本查询****


基本查询是不带任何查询条件的 DQL 语句。包括：

- 查询多个字段
- 查询所有字段
- 设置别名
- 去除重复记录

**1.  查询多个字段**


	查询指定字段 `name` 和 `entrydate`：


	```sql
	select name,entrydate from tb_emp;
	```


**2.  查询所有字段**


	使用 `*` 可以查询所有字段，但在实际开发中应尽量避免使用，因为它不够直观且可能影响效率。


	```sql
	select * from tb_emp;
	```


**3.  设置别名**


	可以为字段设置别名，增强可读性。


	```sql
	-- 方式1：
	select name AS 姓名, entrydate AS 入职日期 from tb_emp;
	-- 方式2： 别名中有特殊字符时，使用单引号或双引号包含
	select name AS '姓 名', entrydate AS '入职日期' from tb_emp;
	-- 方式3：
	select name AS "姓名", entrydate AS "入职日期" from tb_emp;
	```


**4.  去除重复记录**


	使用 `DISTINCT` 关键字可以去除重复记录。


	```sql
	select distinct job from tb_emp;
	```


## ****条件查询****


条件查询通过 `WHERE` 关键字添加查询条件。学习条件查询的关键在于掌握各种条件构造方式，SQL 中构造条件的运算符分为比较运算符和逻辑运算符。


**比较运算符：**


| 运算符                   | 功能                               |
| --------------------- | -------------------------------- |
| `>`                   | 大于                               |
| `>=`                  | 大于等于                             |
| `<`                   | 小于                               |
| `<=`                  | 小于等于                             |
| `=`                   | 等于                               |
| `<>` 或 `!=`           | 不等于                              |
| `BETWEEN ... AND ...` | 在某个范围之内（含最小值、最大值）                |
| `IN(...)`             | 在 `IN` 之后的列表中的值，多选一              |
| `LIKE`                | 占位符模糊匹配（`_` 匹配单个字符, `%` 匹配任意个字符） |
| `IS NULL`             | 判断是否为 `NULL`                     |


**逻辑运算符：**


| 运算符          | 功能           |
| ------------ | ------------ |
| `AND` 或 `&&` | 并且（多个条件同时成立） |
| `OR` 或 `     |              |
| `NOT` 或 `!`  | 非，不是         |


下面是一些条件查询的示例：


**1.  查询姓名为杨逍的员工**


	```sql
	select id, username, password, name, gender, image, job, entrydate, create_time, update_time
	from tb_emp
	where name = '杨逍'; -- 字符串使用单引号或双引号包含
	```


**2.  查询 id 小于等于 5 的员工信息**


	```sql
	select id, username, password, name, gender, image, job, entrydate, create_time, update_time
	from tb_emp
	where id <=5;
	```


**3.  查询没有分配职位的员工信息**


	```sql
	select id, username, password, name, gender, image, job, entrydate, create_time, update_time
	from tb_emp
	where job is null ;
	```


注意：查询为 `NULL` 的数据时，不能使用 `= NULL`。


**4.  查询有职位的员工信息**


	```sql
	select id, username, password, name, gender, image, job, entrydate, create_time, update_time
	from tb_emp
	where job is not null ;
	```


**5.  查询密码不等于 '123456' 的员工信息**


	```sql
	-- 方式1：
	select id, username, password, name, gender, image, job, entrydate, create_time, update_time
	from tb_emp
	where password <> '123456';
	-- 方式2：
	select id, username, password, name, gender, image, job, entrydate, create_time, update_time
	from tb_emp
	where password != '123456';
	```


**6.  查询入职日期在 '2000-01-01' (包含) 到 '2010-01-01'(包含) 之间的员工信息**


	```sql
	-- 方式1：
	select id, username, password, name, gender, image, job, entrydate, create_time, update_time
	from tb_emp
	where entrydate>='2000-01-01' and entrydate<='2010-01-01';
	-- 方式2： between...and
	select id, username, password, name, gender, image, job, entrydate, create_time, update_time
	from tb_emp
	where entrydate between '2000-01-01' and '2010-01-01';
	```


**7.  查询入职时间在 '2000-01-01' (包含) 到 '2010-01-01'(包含) 之间且性别为女的员工信息**


	```sql
	select id, username, password, name, gender, image, job, entrydate, create_time, update_time
	from tb_emp
	where entrydate between '2000-01-01' and '2010-01-01'
	      and gender = 2;
	```


**8.  查询职位是 2 (讲师), 3 (学工主管), 4 (教研主管) 的员工信息**


	```sql
	-- 方式1：使用or连接多个条件
	select id, username, password, name, gender, image, job, entrydate, create_time, update_time
	from tb_emp
	where job=2 or job=3 or job=4;
	-- 方式2：in关键字
	select id, username, password, name, gender, image, job, entrydate, create_time, update_time
	from tb_emp
	where job in (2,3,4);
	```


**9.  查询姓名为两个字的员工信息**


	```sql
	select id, username, password, name, gender, image, job, entrydate, create_time, update_time
	from tb_emp
	where name like '__';  ## 通配符 "_" 代表任意1个字符
	```


**10. 查询姓 '张' 的员工信息**


	```sql
	select id, username, password, name, gender, image, job, entrydate, create_time, update_time
	from tb_emp
	where name like '张%'; ## 通配符 "%" 代表任意个字符（0个 ~ 多个）
	```


## ****聚合函数****


聚合函数是对一列的值进行计算，然后返回一个结果值，也就是纵向查询。


```sql
select  聚合函数(字段列表)  from  表名 ;
```


常用的聚合函数如下：


| 函数      | 功能   |
| ------- | ---- |
| `COUNT` | 统计数量 |
| `MAX`   | 最大值  |
| `MIN`   | 最小值  |
| `AVG`   | 平均值  |
| `SUM`   | 求和   |


**注意** : 聚合函数会忽略空值，对 `NULL` 值不作为统计。


以下是一些聚合函数的示例：


**1.  统计该企业员工数量**


	```sql
	## count(字段)
	select count(id) from tb_emp;-- 结果：29
	select count(job) from tb_emp;-- 结果：28 （聚合函数对NULL值不做计算）
	## count(常量)
	select count(0) from tb_emp;
	select count('A') from tb_emp;
	## count(*)  推荐此写法（MySQL底层进行了优化）
	select count(*) from tb_emp;
	```


**2.  统计该企业最早入职的员工**


	```sql
	select min(entrydate) from tb_emp;
	```


**3.  统计该企业最迟入职的员工**


	```sql
	select max(entrydate) from tb_emp;
	```


**4.  统计该企业员工 ID 的平均值**


	```sql
	select avg(id) from tb_emp;
	```


**5.  统计该企业员工的 ID 之和**


	```sql
	select sum(id) from tb_emp;
	```


## ****分组查询****


分组查询是按照某一列或者某几列，将相同的数据进行合并输出。分组查询通常会使用聚合函数进行计算。


```sql
select  字段列表  from  表名  [where 条件]  group by 分组字段名  [having 分组后过滤条件];
```


**1.  根据性别分组，统计男性和女性员工的数量**


	```sql
	select gender, count(*)
	from tb_emp
	group by gender; -- 按照gender字段进行分组（gender字段下相同的数据归为一组）
	```


**2.  查询入职时间在 '2015-01-01' (包含) 以前的员工，并对结果根据职位分组，获取员工数量大于或等于 2 的职位**


	```sql
	select job, count(*)
	from tb_emp
	where entrydate <= '2015-01-01'   -- 分组前条件
	group by job                      -- 按照job字段分组
	having count(*) >= 2;             -- 分组后条件
	```


**注意事项:**

- 分组之后，查询的字段一般为聚合函数和分组字段，查询其他字段无意义。
- 执行顺序：`where` > 聚合函数 > `having` 。

**`WHERE`** **与** **`HAVING`** **的区别：**

- **执行时机不同：** `WHERE` 是分组之前进行过滤，不满足 `WHERE` 条件的不参与分组；而 `HAVING` 是分组之后对结果进行过滤。
- **判断条件不同：** `WHERE` 不能对聚合函数进行判断，而 `HAVING` 可以。

## ****排序查询****


排序在日常开发中非常常见，有升序排序，也有降序排序。


```sql
select  字段列表
from   表名
[where  条件列表]
[group by  分组字段 ]
order  by  字段1  排序方式1 , 字段2  排序方式2 ... ;
```


排序方式：

- `ASC`：升序（默认值）
- `DESC`：降序

**1.  根据入职时间，对员工进行升序排序**


	```sql
	select id, username, password, name, gender, image, job, entrydate, create_time, update_time
	from tb_emp
	order by entrydate ASC; -- 按照entrydate字段下的数据进行升序排序
	
	select id, username, password, name, gender, image, job, entrydate, create_time, update_time
	from tb_emp
	order by  entrydate; -- 默认就是ASC（升序）
	```


注意事项：如果是升序，可以不指定排序方式 `ASC`。


**2.  根据入职时间，对员工进行降序排序**


	```sql
	select id, username, password, name, gender, image, job, entrydate, create_time, update_time
	from tb_emp
	order by entrydate DESC; -- 按照entrydate字段下的数据进行降序排序
	```


**3.  根据入职时间对公司的员工进行升序排序，入职时间相同，再按照更新时间进行降序排序**


	```sql
	select id, username, password, name, gender, image, job, entrydate, create_time, update_time
	from tb_emp
	order by entrydate ASC , update_time DESC;
	```


注意事项：如果是多字段排序，当第一个字段值相同时，才会根据第二个字段进行排序。


## ****分页查询****


分页操作在业务系统开发时也非常常见。


```sql
select  字段列表  from   表名  limit  起始索引, 查询记录数 ;
```


**1.  从起始索引 0 开始查询员工数据，每页展示 5 条记录**


	```sql
	select id, username, password, name, gender, image, job, entrydate, create_time, update_time
	from tb_emp
	limit 0 , 5; -- 从索引0开始，向后取5条记录
	```


**2.  查询第 1 页员工数据，每页展示 5 条记录**


	```sql
	select id, username, password, name, gender, image, job, entrydate, create_time, update_time
	from tb_emp
	limit 5; -- 如果查询的是第1页数据，起始索引可以省略，直接简写为：limit 条数
	```


**3.  查询第 2 页员工数据，每页展示 5 条记录**


	```sql
	select id, username, password, name, gender, image, job, entrydate, create_time, update_time
	from tb_emp
	limit 5 , 5; -- 从索引5开始，向后取5条记录
	```


**4.  查询第 3 页员工数据，每页展示 5 条记录**


	```sql
	select id, username, password, name, gender, image, job, entrydate, create_time, update_time
	from tb_emp
	limit 10 , 5; -- 从索引10开始，向后取5条记录
	```


**注意事项:**

1. 起始索引从 0 开始。 计算公式：起始索引 = (查询页码 - 1) * 每页显示记录数。
2. 分页查询是数据库的方言，不同的数据库有不同的实现，MySQL 中是 `LIMIT` 。
3. 如果查询的是第一页数据，起始索引可以省略，直接简写为 `limit 条数` 。

## ****案例****


### ****案例一****


根据需求完成员工管理的条件分页查询：

- 条件：
	- 姓名：含“张”。
	- 性别：男。
	- 入职时间：2000-01-01 ~ 2015-12-31 。
- 分页：查询第 1 页数据（每页显示 10 条数据）
- 排序：按照修改时间进行降序排序

```sql
select id, username, password, name, gender, image, job, entrydate, create_time, update_time
from tb_emp
where name like '张%' and gender = 1 and entrydate between '2000-01-01' and '2015-12-31'
order by update_time desc
limit 0 , 10;
```


### ****案例二****


根据需求完成员工信息的统计：

- 员工性别统计：统计企业男性员工人数和女性员工人数。
- 员工职位统计：统计各职位的在岗人数。

**员工性别统计：**


```sql
-- if(条件表达式, true取值 , false取值)
select if(gender=1,'男性员工','女性员工') AS 性别, count(*) AS 人数
from tb_emp
group by gender;
```


该 SQL 语句使用了 `IF` 函数，`IF(gender=1,'男性员工','女性员工')`，当 `gender` 为 1 时，取值为 `男性员工`；当 `gender` 不为 1 时，取值为 `女性员工`。


**员工职位统计：**


```sql
-- case 表达式 when 值1 then 结果1  when 值2  then  结果2 ...  else  result  end
select (case job
             when 1 then '班主任'
             when 2 then '讲师'
             when 3 then '学工主管'
             when 4 then '教研主管'
             else '未分配职位'
        end) AS 职位 ,
       count(*) AS 人数
from tb_emp
group by job;
```


该 SQL 语句使用了 `CASE WHEN` 结构，根据 `job` 字段的值，返回对应的职位名称。如果 `job` 字段的值不在 `WHEN` 子句中，则返回 `ELSE` 子句中的值。

