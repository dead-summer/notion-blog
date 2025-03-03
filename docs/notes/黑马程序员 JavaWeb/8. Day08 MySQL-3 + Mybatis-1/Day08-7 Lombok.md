---
title: Day08-7 Lombok
createTime: 2025/03/01T12:58:00.000Z
updateTime: 2025/03/02T02:44:00.000Z
permalink: /itheima-javaweb/day08-7-lombok/
---

## ****介绍****


Lombok 是一个实用的 Java 类库，可以通过简单的注解来简化和消除一些必须有但显得很臃肿的 Java 代码。


| **注解**                | **作用**                                                                    |
| --------------------- | ------------------------------------------------------------------------- |
| `@Getter`/`@Setter`   | 为所有的属性提供 `get`/`set` 方法                                                   |
| `@ToString`           | 会给类自动生成易阅读的  `toString`  方法                                               |
| `@EqualsAndHashCode`  | 根据类所拥有的非静态字段自动重写 `equals` 方法和  `hashCode` 方法                              |
| `@Data`               | 提供了更综合的生成代码功能（`@Getter` + `@Setter` + `@ToString` + `@EqualsAndHashCode`） |
| `@NoArgsConstructor`  | 为实体类生成无参的构造器方法                                                            |
| `@AllArgsConstructor` | 为实体类生成除了 `static` 修饰的字段之外带有各参数的构造器方法。                                     |


通过注解的形式自动生成构造器、getter/setter、equals、hashcode、toString 等方法，并可以自动化生成日志变量，简化 java 开发、提高效率。


## ****使用****


**第 1 步**：在 pom.xml 文件中引入依赖


```xml
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
</dependency>
```


**第 2 步**：在实体类上添加注解


```java
import lombok.Data;

@Data
public class User {
    private Integer id;
    private String name;
    private Short age;
    private Short gender;
    private String phone;
}
```


在实体类上添加了 `@Data` 注解，那么这个类在编译时期，就会生成 `getter`/`setter`、`equals`、`hashcode`、`toString` 等方法。


通常在实体类上，还会添加上：全参构造、无参构造


```java
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data //getter 方法、setter 方法、toString 方法、hashCode 方法、equals 方法
@NoArgsConstructor //无参构造
@AllArgsConstructor//全参构造
public class User {
    private Integer id;
    private String name;
    private Short age;
    private Short gender;
    private String phone;
}
```


**Lombok 的注意事项**：

- Lombok 会在编译时，会自动生成对应的 java 代码
- 在使用 Lombok 时，还需要安装一个 Lombok 的插件（新版本的 IDEA 中自带）
