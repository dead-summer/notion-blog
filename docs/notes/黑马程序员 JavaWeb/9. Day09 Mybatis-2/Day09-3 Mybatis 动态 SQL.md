---
title: Day09-3 Mybatis 动态 SQL
createTime: 2025/03/01T12:58:00.000Z
updateTime: 2025/03/02T02:44:00.000Z
permalink: /itheima-javaweb/day09-3-mybatis-dynamic-sql/
---

## ****什么是动态 SQL****


动态 SQL 指的是 SQL 语句能够根据用户的输入或外部条件的变化而变化。在实际应用场景中，比如列表查询时，查询条件可能是动态的，可以不传递，也可以传递一个或多个。如果直接将所有可能的条件都写死在 SQL 语句中，当某些参数为空时，可能会导致查询结果不正确。


## ****动态 SQL - if****


`<if>` 标签用于判断条件是否成立，如果条件为 true，则拼接 SQL 语句。它通过 `test` 属性进行条件判断。


### ****条件查询****


**示例：** 将原有的 SQL 语句改造为动态 SQL 方式。


**原有的 SQL 语句：**


```xml
<select id="list" resultType="com.itheima.pojo.Emp">
    select * from emp
    where name like concat('%',#{name},'%')
          and gender = #{gender}
          and entrydate between #{begin} and #{end}
    order by update_time desc
</select>
```


上述 SQL 语句将所有条件都写死，当某些参数为空时，会导致查询结果不正确。


**动态 SQL 语句：**


```xml
<select id="list" resultType="com.itheima.pojo.Emp">
    select * from emp
    where
    <if test="name != null">
        name like concat('%',#{name},'%')
    </if>
    <if test="gender != null">
        and gender = #{gender}
    </if>
    <if test="begin != null and end != null">
        and entrydate between #{begin} and #{end}
    </if>
    order by update_time desc
</select>
```


这段代码使用 `<if>` 标签根据参数是否为空来动态拼接 SQL 语句。但是，如果第一个条件（`name`）为空，则 `where` 关键字后面会直接跟 `and`，导致 SQL 语法错误。


**解决方案：** 使用 `<where>` 标签代替 SQL 语句中的 `where` 关键字。`<where>` 标签只会在子元素有内容的情况下才插入 `where` 子句，而且会自动去除子句开头的 `AND` 或 `OR`。


**修改后的动态 SQL 语句：**


```xml
<select id="list" resultType="com.itheima.pojo.Emp">
    select * from emp
    <where>
        <!-- if做为where标签的子元素 -->
        <if test="name != null">
            and name like concat('%',#{name},'%')
        </if>
        <if test="gender != null">
            and gender = #{gender}
        </if>
        <if test="begin != null and end != null">
            and entrydate between #{begin} and #{end}
        </if>
    </where>
    order by update_time desc
</select>
```


`<where>` 标签会自动处理 `where` 子句和 `and` 关键字，避免了 SQL 语法错误。


### ****更新员工****


**案例：** 完善更新员工功能，修改为动态更新员工数据信息。动态更新员工信息，如果更新时传递有值，则更新；如果更新时没有传递值，则不更新。


**修改 Mapper 接口：**


```java
@Mapper
public interface EmpMapper {
    //删除@Update注解编写的SQL语句
    //update操作的SQL语句编写在Mapper映射文件中
    public void update(Emp emp);
}
```


**修改 Mapper 映射文件：**


```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "<https://mybatis.org/dtd/mybatis-3-mapper.dtd>">
<mapper namespace="com.itheima.mapper.EmpMapper">
    <!--更新操作-->
    <update id="update">
        update emp
        set
            <if test="username != null">
                username=#{username},
            </if>
            <if test="name != null">
                name=#{name},
            </if>
            <if test="gender != null">
                gender=#{gender},
            </if>
            <if test="image != null">
                image=#{image},
            </if>
            <if test="job != null">
                job=#{job},
            </if>
            <if test="entrydate != null">
                entrydate=#{entrydate},
            </if>
            <if test="deptId != null">
                dept_id=#{deptId},
            </if>
            <if test="updateTime != null">
                update_time=#{updateTime}
            </if>
        where id=#{id}
    </update>
</mapper>
```


这段代码使用 `<if>` 标签根据参数是否为空来动态拼接 `set` 子句。但是，如果最后一个条件有值，则 `set` 子句的结尾会多一个逗号，导致 SQL 语法错误。


**解决方案：** 使用 `<set>` 标签代替 SQL 语句中的 `set` 关键字。`<set>` 标签会自动在 SQL 语句中插入 `SET` 关键字，并会删掉额外的逗号。（用于 update 语句中）


**修改后的动态 SQL 语句：**


```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "<https://mybatis.org/dtd/mybatis-3-mapper.dtd>">
<mapper namespace="com.itheima.mapper.EmpMapper">
    <!--更新操作-->
    <update id="update">
        update emp
        <!-- 使用set标签，代替update语句中的set关键字 -->
        <set>
            <if test="username != null">
                username=#{username},
            </if>
            <if test="name != null">
                name=#{name},
            </if>
            <if test="gender != null">
                gender=#{gender},
            </if>
            <if test="image != null">
                image=#{image},
            </if>
            <if test="job != null">
                job=#{job},
            </if>
            <if test="entrydate != null">
                entrydate=#{entrydate},
            </if>
            <if test="deptId != null">
                dept_id=#{deptId},
            </if>
            <if test="updateTime != null">
                update_time=#{updateTime}
            </if>
        </set>
        where id=#{id}
    </update>
</mapper>
```


`<set>` 标签会自动处理 `SET` 关键字和逗号，避免了 SQL 语法错误。


**小结**

- **`<if>`**: 用于判断条件是否成立，如果条件为 true，则拼接 SQL。
- **`<where>`**: `where` 元素只会在子元素有内容的情况下才插入 `where` 子句，而且会自动去除子句的开头的 `AND` 或 `OR`。
- **`<set>`**: 动态地在行首插入 `SET` 关键字，并会删掉额外的逗号。（用在 update 语句中）

## ****动态 SQL - foreach****


`<foreach>` 标签用于遍历集合，常用于构建 `IN` 子句。


**案例：** 员工删除功能（既支持删除单条记录，又支持批量删除）。


**SQL 语句：**


```sql
delete from emp where id in (1,2,3);
```


**Mapper 接口：**


```java
@Mapper
public interface EmpMapper {
    //批量删除
    public void deleteByIds(List<Integer> ids);
}
```


**XML 映射文件：**


```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "<https://mybatis.org/dtd/mybatis-3-mapper.dtd>">
<mapper namespace="com.itheima.mapper.EmpMapper">
    <!--删除操作-->
    <delete id="deleteByIds">
        delete from emp where id in
        <foreach collection="ids" item="id" separator="," open="(" close=")">
            #{id}
        </foreach>
    </delete>
</mapper>
```


**`<foreach>`** **标签的属性：**

- `collection`: 集合名称。
- `item`: 集合遍历出来的元素/项。
- `separator`: 每一次遍历使用的分隔符。
- `open`: 遍历开始前拼接的片段。
- `close`: 遍历结束后拼接的片段。

## ****动态 SQL - sql & include****


当 XML 映射文件中存在大量重复的 SQL 片段时，可以使用 `<sql>` 和 `<include>` 标签来提高代码的可维护性和重用性。


**问题分析：**


在 XML 映射文件中配置的 SQL，有时可能会存在很多重复的片段，此时就会存在很多冗余的代码。


**解决方案：**


我们可以对重复的代码片段进行抽取，将其通过 `<sql>` 标签封装到一个 SQL 片段，然后再通过 `<include>` 标签进行引用。

- **`<sql>`**: 定义可重用的 SQL 片段，通过 `id` 属性指定 SQL 片段的唯一标识。
- **`<include>`**: 通过属性 `refid`，指定包含的 SQL 片段。

**示例：**


**SQL 片段：** 抽取重复的代码


```xml
<sql id="commonSelect">
    select id, username, password, name, gender, image, job, entrydate,
dept_id, create_time, update_time from emp
</sql>
```


**引用 SQL 片段：**


```xml
<select id="list" resultType="com.itheima.pojo.Emp">
    <include refid="commonSelect"/>
    <where>
        <if test="name != null">
            name like concat('%',#{name},'%')
        </if>
        <if test="gender != null">
            and gender = #{gender}
        </if>
        <if test="begin != null and end != null">
            and entrydate between #{begin} and #{end}
        </if>
    </where>
    order by update_time desc
</select>
```


`<include refid="commonSelect"/>` 会将 `id` 为 `commonSelect` 的 SQL 片段包含到当前 SQL 语句中。

