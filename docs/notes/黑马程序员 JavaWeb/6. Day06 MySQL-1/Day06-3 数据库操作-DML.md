---
title: Day06-3 数据库操作-DML
createTime: 2025/03/01T12:58:00.000Z
updateTime: 2025/03/02T02:43:00.000Z
permalink: /itheima-javaweb/day06-3-database-operations-dml/
---

DML 英文全称是 Data Manipulation Language (数据操作语言)，用来对数据库中表的数据记录进行增、删、改操作。

- 添加数据（INSERT）
- 修改数据（UPDATE）
- 删除数据（DELETE）

## ******增加 (insert)******

- insert 语法：
	- 向指定字段添加数据

		```sql
		insert into 表名 (字段名1, 字段名2) values (值1, 值2);
		```


		案例 1：向 `tb_emp` 表的 `username`、`name`、`gender` 字段插入数据


		```sql
		-- 因为设计表时create_time, update_time两个字段不能为NULL，所以也做为要插入的字段
		insert into tb_emp(username, name, gender, create_time, update_time)
		values ('wuji', '张无忌', 1, now(), now());
		```

	- 全部字段添加数据

		```sql
		insert into 表名 values (值1, 值2, ...);
		```


		案例 2：向 `tb_emp` 表的所有字段插入数据


		```sql
		insert into tb_emp(id, username, password, name, gender, image, job, entrydate, create_time, update_time)
		values (null, 'zhirou', '123', '周芷若', 2, '1.jpg', 1, '2010-01-01', now(), now());
		```

	- 批量添加数据（指定字段）

		```sql
		insert into 表名 (字段名1, 字段名2) values (值1, 值2), (值1, 值2);
		```


		案例 3：批量向 `tb_emp` 表的 `username`、`name`、`gender` 字段插入数据


		```sql
		insert into tb_emp(username, name, gender, create_time, update_time)
		values ('weifuwang', '韦一笑', 1, now(), now()),
		       ('fengzi', '张三疯', 1, now(), now());
		```

	- 批量添加数据（全部字段）

		```sql
		insert into 表名 values (值1, 值2, ...), (值1, 值2, ...);
		```

- insert 操作的注意事项：
	1. 插入数据时，指定的字段顺序需要与值的顺序是一一对应的。
	2. 字符串和日期型数据应该包含在引号中。
	3. 插入的数据大小，应该在字段的规定范围内。

## ******修改 (update)******

- update 语法：

	```sql
	update 表名 set 字段名1 = 值1 , 字段名2 = 值2 , .... [where 条件];
	```


	案例 1：将 `tb_emp` 表中 id 为 1 的员工，姓名 name 字段更新为 '张三'


	```sql
	update tb_emp set name='张三',update_time=now() where id=1;
	```


	案例 2：将 `tb_emp` 表的所有员工入职日期更新为 '2010-01-01'


	```sql
	update tb_emp set entrydate='2010-01-01',update_time=now();
	```

- 注意事项：修改语句的条件可以有，也可以没有，如果没有条件，则会修改整张表的所有数据。

## ******删除 (delete)******

- delete 语法：

	```sql
	delete from 表名 [where 条件];
	```


	案例 1：删除 `tb_emp` 表中 id 为 1 的员工


	```sql
	delete from tb_emp where id = 1;
	```


	案例 2：删除 `tb_emp` 表中所有员工


	```sql
	delete from tb_emp;
	```

- 注意事项:
	- `DELETE` 语句的条件可以有，也可以没有，如果没有条件，则会删除整张表的所有数据。
	- `DELETE` 语句不能删除某一个字段的值 (可以使用 `UPDATE`，将该字段值置为 `NULL` 即可)。
