---
title: Day14-3 SpringBoot 原理
createTime: 2025/03/01T12:58:00.000Z
updateTime: 2025/03/02T02:53:00.000Z
permalink: /itheima-javaweb/day14-3-springboot-principles/
---

## ****起步依赖****


起步依赖的原理就是 Maven 的依赖传递。


如果未使用 SpringBoot，而是采用 Spring 框架进行 Web 应用程序的开发，那么我们需要引入 Web 程序开发所需的相关依赖：

- `spring-webmvc` 依赖：这是 Spring 框架进行 web 程序开发所必需的依赖。
- `servlet-api` 依赖：Servlet 基础依赖。
- `jackson-databind` 依赖：JSON 处理工具包。

如果要使用 AOP，还需要引入 `aop` 依赖和 `aspect` 依赖。


项目中引入的这些依赖，还需要保证版本匹配，否则可能会出现版本冲突问题。


![image.png](assets/0514d5937f2bfd12726bd97a0a21e116.png)


而在 SpringBoot 给我们提供的 `springboot-starter-web` 起步依赖当中，已提供了当前程序开发所需要的所有的常见依赖。


![image.png](assets/1ebaf64e36ee61f57b28e9374be87b57.png)


**总结：** 起步依赖简化了 pom 文件中依赖的配置，解决了 Spring 框架当中依赖配置繁琐的问题。起步依赖的本质是maven依赖的传递。


## ****自动配置****


### ****概述****


SpringBoot 的自动配置就是当 Spring 容器启动后，一些配置类、bean 对象就自动存入到了 IOC 容器中，不需要我们手动去声明，从而简化了开发，省去了繁琐的配置操作。


![image.png](assets/6e2a82bad2cbff91976ea6bb534ea3a1.png)


在 IOC 容器中除了我们自己定义的 bean 以外，还有很多配置类，这些配置类都是 SpringBoot 在启动的时加载进来的配置类。这些配置类加载进来之后，它也会生成很多的bean对象。


例如：配置类 `GsonAutoConfiguration` 里面有一个 bean，bean 的名字叫 gson，它的类型是 `Gson`。


![image.png](assets/322751877cd636799933a1f89a0f0892.png)


当我们希望使用这些配置类中生成的 bean 对象时，可以使用 `@Autowired` 注解来实现自动注入。


```java
import com.google.gson.Gson;
import com.itheima.pojo.Result;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
@SpringBootTest
public class AutoConfigurationTests {
@Autowired
private Gson gson;
@Test
public void testJson(){
	String json = gson.toJson(Result.success());
	System.out.println(json);
 }
}
```


添加断点，使用debug模式运行测试类程序：


![image.png](assets/8effd714b20e95bf1c5a449f5b225009.png)


**问题：** 在当前项目中，我们并没有声明谷歌提供的 `Gson` 类型的 `Bean` 对象，但却可以通过 `@Autowired` 注解从 `Spring` 容器中注入该 `Bean` 对象，那么这个 `Bean` 对象是如何创建的呢？


**答案：** `SpringBoot` 项目在启动时，会通过自动配置来完成 `Bean` 对象的创建。


**总结：** SpringBoot 通过自动配置，简化了 Bean 的声明以及 Bean 的配置。只需要引入程序开发时所需要的起步依赖，项目开发时所用到的常见配置都已经具备。


### ****常见方案****


知道了什么是自动配置之后，接下来就要来剖析自动配置的原理。解析自动配置的原理就是分析在 SpringBoot 项目当中，我们引入对应的依赖之后，是如何将依赖 jar 包当中所提供的 bean 以及配置类直接加载到当前项目的 SpringIOC 容器当中的。


**准备工作**：

1. 在 SpringBoot 项目 spring-boot-web-config2 工程中，通过坐标引入 itheima-utils 依赖。

	[itheima-utils.zip](https://prod-files-secure.s3.us-west-2.amazonaws.com/c911c495-2fbb-40d2-821e-9f7656976401/60b0f853-1abf-4831-8010-d15000e82d5d/itheima-utils.zip?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UKH644FS%2F20250302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250302T064241Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJHMEUCIGbcO1ecymk%2BkmpPkJtF%2Bqk1WZcSW17Rd%2BiaMOEwgvvsAiEA0EZdWXlZpnjoz3gGtRqIpAAMqm3qX6LKu%2BSL%2BTD6tzIqiAQItv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLCTHxR584d4dhctyyrcA%2Bv5N5M90gAJGBzz%2BoXMugvsNPGBPLrRp7R9L9xtVMac4BOjFjMVrzevprMsKgOfcys25HniPsUgMs51%2BLK1NC8WLmU7XxeZNSaCrji0o%2F3Q6W3ByGcXocT27t9SUaWciyE7s2Q6%2FD0CTKU3fxk5bj5Khfjr5kwrmFuEmobJQJTRRoqEaj1NT%2FgiJTGpTrB5J%2FEY%2BdSrUHl80q0siTrvt8pXRmbcr2aZZcWL%2FnQy6lpq9929XWNMRKW%2BS4T674t%2FCERhvLOOafmS4d%2B3O%2FWP%2F1NW405Yn9qrBmBNWHmBFhKkIZQcvQEv9taoLzQV2Za%2FjM5CdgZ8ICjabmLCdDWsFeeYUFLfB1k%2B5YlqYIP1RZGVoH1fxhtXGn7uPYhRnLkw4oLlBs8exEbzYgAJZXNguyl%2B%2Bcy2XD7usx4Zeg%2FqMoiYCtcaHKmjjh3YZAxxxnpJtLraz2kAnAqSyzRbL8EaQNWsQ4yA18RNiObHyVzr4BDSyOtXUK6xiSNaPysK%2F5OC7E0YjcXs077TRx1IGK1lzvjAVIkqFUcrUZ%2BT4F10Yovr%2BtWu%2B%2Bti%2FE6%2FSCnzK6G32IbWOQbAQF9PyGhSdDPj8JIfVJuWt%2B%2FDEfPQ38lIkEN4fzW0BPEaqRmW3LuEMNbXj74GOqUBmstnHl6UHJ%2BpMTpRRQ7uNIxG2B9ujsaXvKPmcpi%2F%2Fd%2F7MsYBa%2FaH2GuctHQxr53ms6A9HHyrSTsX8DHGCTJOYQRMxgaq0Li0B77BaFnoVzMIqpgWTlUp9HEyqpnabdkSGD66uTcvFIv8MFIuQY60g1bLK9x%2FtWFrAg9AoqkMytZbxxntFWEJTWUiIxy0B%2FOA%2FJdVbLzEUQLa6HVzP46lTNBvk7%2BZ&X-Amz-Signature=f6e7fdcb9050826a7e3c16df82cd7fa8c31e0fa7641947c7ec855d24773d0354&X-Amz-SignedHeaders=host&x-id=GetObject)


	![image.png](assets/d95889a0cced37705bb8a79df7a332ac.png)


	```xml
	<dependency>
	    <groupId>com.example</groupId>
	    <artifactId>itheima-utils</artifactId>
	    <version>0.0.1-SNAPSHOT</version>
	</dependency>
	```

2. 在测试类中，添加测试方法。

	```java
	@Test
	public void testTokenParse(){
	    System.out.println(applicationContext.getBean(TokenParser.class));
	}
	```

3. 执行测试方法。

	![image.png](assets/4d4d5a6ccc25c1c9a5b599427452751a.png)


思考：引入进来的第三方依赖当中的 bean 以及配置类为什么没有生效？


原因：

- 在类上添加 `@Component` 注解来声明 bean 对象时，还需要保证 `@Component` 注解能被 Spring 的组件扫描到。
- SpringBoot 项目中的 `@SpringBootApplication` 注解，具有包扫描的作用，但是它只会扫描启动类所在的当前包以及子包。
- 当前包：`com.itheima`，第三方依赖中提供的包：`com.example` （扫描不到）。

那么如何解决以上问题呢？

- 方案 1：`@ComponentScan` 组件扫描
- 方案 2：`@Import` 导入 (使用 `@Import` 导入的类会被 Spring 加载到 IOC 容器中)

#### ******方案一： @ComponentScan 组件扫描******

- 为启动类添加 `@ComponentScan` 注解：

	```java
	@SpringBootApplication
	@ComponentScan({"com.itheima","com.example"}) //指定要扫描的包
	public class SpringbootWebConfig2Application {
	    public static void main(String[] args) {
	        SpringApplication.run(SpringbootWebConfig2Application.class, args);
	    }
	}
	```


重新执行测试方法，控制台日志输出：


![image.png](assets/1595df7a649749c9c1520a0c0b109247.png)


缺点：

1. 使用繁琐
2. 性能低

#### ******方案二： @Import导入******


使用 `@Import` 导入形式主要有以下几种：

1. 导入普通类：`@Import` 会将普通类注册为一个 Bean。
2. 导入配置类：`@Import` 会将配置类的所有 Bean 定义加载到 Spring 容器中，相当于把配置类里的 `@Bean` 方法和定义的 Bean 加载到容器中。
3. 导入 `ImportSelector` 接口实现类。

**代码实现**：

1. 使用 `@Import` 导入普通类：

	```java
	@Import(TokenParser.class) //导入的类会被Spring加载到IOC容器中
	@SpringBootApplication
	public class SpringbootWebConfig2Application {
	    public static void main(String[] args) {
	        SpringApplication.run(SpringbootWebConfig2Application.class, args);
	    }
	}
	```

2. 使用 `@Import` 导入配置类：
	- 配置类：

		```java
		@Configuration
		public class HeaderConfig {
		    @Bean
		    public HeaderParser headerParser(){
		        return new HeaderParser();
		    }
		    @Bean
		    public HeaderGenerator headerGenerator(){
		        return new HeaderGenerator();
		    }
		}
		```

	- 启动类：

		```java
		@Import(HeaderConfig.class) //导入配置类
		@SpringBootApplication
		public class SpringbootWebConfig2Application {
		    public static void main(String[] args) {
		        SpringApplication.run(SpringbootWebConfig2Application.class, args);
		    }
		}
		```

	- 测试类：

		```java
		@SpringBootTest
		public class AutoConfigurationTests {
			@Autowired
			private ApplicationContext applicationContext;
			@Test
			public void testHeaderParser(){
				System.out.println(applicationContext.getBean(HeaderParser.class));
			 }
			@Test
			public void testHeaderGenerator(){
				System.out.println(applicationContext.getBean(HeaderGenerator.class));
			 }
			//省略其他代码...
		}
		```

3. 使用 `@Import` 导入 `ImportSelector` 接口实现类：
	- `ImportSelector` 接口实现类：

		需要重写 `selectImports()` 方法：


		```java
		public class MyImportSelector implements ImportSelector {
		    public String[] selectImports(AnnotationMetadata importingClassMetadata) {
		        //返回值字符串数组（数组中封装了全限定名称的类）
		        return new String[]{"com.example.HeaderConfig"};
		    }
		}
		```

	- 启动类：

		```java
		@Import(MyImportSelector.class) //导入ImportSelector接口实现类
		@SpringBootApplication
		public class SpringbootWebConfig2Application {
		    public static void main(String[] args) {
		        SpringApplication.run(SpringbootWebConfig2Application.class, args);
		    }
		}
		```


上述自动配置需对第三方依赖十分熟悉，实际上，大多数情况均为第三方依赖自行指定 Bean 对象和配置类。


第三方依赖通过提供注解的方式来指定 Bean 对象和配置类。一种常见的做法是，第三方依赖提供一个注解，这类注解通常以 `@EnableXxxx` 开头，其内部封装了 `@Import` 注解。


**代码实现**：

- 使用第三方依赖提供的 `@EnableXxxxx` 注解：

	```java
	@Retention(RetentionPolicy.RUNTIME)
	@Target(ElementType.TYPE)
	@Import(MyImportSelector.class)//指定要导入哪些bean对象或配置类
	public @interface EnableHeaderConfig {
	}
	```

- 在使用时只需在启动类上加上 `@EnableXxxxx` 注解即可

	```java
	@EnableHeaderConfig  //使用第三方依赖提供的Enable开头的注解
	@SpringBootApplication
	public class SpringbootWebConfig2Application {
	    public static void main(String[] args) {
	        SpringApplication.run(SpringbootWebConfig2Application.class, args);
	    }
	}
	```


以上四种方式都可以完成导入操作，但是第 4 种方式会更方便更优雅，而这种方式也是 SpringBoot 当中所采用的方式。


**总结：** 通过`@Import`注解导入依赖中定义的 Bean 和配置类来实现自动配置。第 4 种方式会更方便更优雅，也是 SpringBoot 当中所采用的方式。


### ****原理分析****


要搞清楚 SpringBoot 的自动配置原理，要从 SpringBoot 启动类上使用的核心注解 `@SpringBootApplication` 开始分析。


在 `@SpringBootApplication` 注解中包含了：


![image.png](assets/dec65b96e83b662942401190a01469dd.png)

1. `@SpringBootConfiguration`

	![image.png](assets/e67a2812943a82c7ffcdb99968dd542c.png)


	`@SpringBootConfiguration` 注解上使用了 `@Configuration`，表明 SpringBoot 启动类就是一个配置类。

2. `@ComponentScan`

	![image.png](assets/367fe60b9fdeae1eb2cb8c325dc28704.png)


	`@ComponentScan` 注解是用来进行组件扫描的，扫描启动类所在的包及其子包下所有被 `@Component` 及其衍生注解声明的类。

3. `@EnableAutoConfiguration`
	1. `@EnableAutoConfiguration` 注解是自动配置核心注解，其使用 `@Import` 注解，导入了实现 `ImportSelector` 接口的实现类。

		![image.png](assets/a1dc20d6e2f999ad6cbd5c3378522f21.png)

	2. `AutoConfigurationImportSelector` 类是 `ImportSelector` 接口的实现类：

		![image.png](assets/39e1fe191cbfc520710c2fc6ba93e539.png)

	3. `AutoConfigurationImportSelector` 类中重写了 `ImportSelector` 接口的 `selectImports()` 方法：

		![image.png](assets/cce1da24a1957bbbd29c3941f0b45eab.png)

	4. `selectImports()` 方法底层调用 `getAutoConfigurationEntry()` 方法，获取可自动配置的配置类信息集合：

		![image.png](assets/73adc13a8964cbb0e7412de9c1c67796.png)

	5. `getAutoConfigurationEntry()`方法通过调用`getCandidateConfigurations(annotationMetadata, attributes)`方法获取在配置文件中配置的所有自动配置类的集合：

		![image.png](assets/39c6120be803d9fd30ee8ba00b25c9d7.png)


`META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports` 文件和
 `META-INF/spring.factories` 文件这两个文件通常在引入的起步依赖中：


![image.png](assets/bbf4cea792974e449e9cff7a3155a24c.png)


![image.png](assets/f802c334fac91bb93aab840d14dbb863.png)


之前我们直接在测试类当中注入了一个名为 `gson` 的 bean 对象。虽然我们没有配置 bean 对象，但是我们是可以直接注入使用的。这是因为在自动配置类当中做了自动配置：


![image.png](assets/a7ad0a181a32d1985578552f504e3c02.png)


在 `META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports` 配置文件中指定了第三方依赖 `Gson` 的配置类：`GsonAutoConfiguration` 。


第三方依赖中提供的 `GsonAutoConfiguration` 类：


![image.png](assets/4054916d2e6a5d587f2b8d0a52963e70.png)


在 `GsonAutoConfiguration` 类上，添加了注解 `@AutoConfiguration`，通过查看源码，可以明确：`GsonAutoConfiguration` 类是一个配置。


![image.png](assets/bf5c429d906b04f59d5ab5e08f6a6f7b.png)


**总结：**


自动配置原理源码入口就是 `@SpringBootApplication` 注解，在这个注解中封装了 3 个注解，分别是：

- `@SpringBootConfiguration`：声明当前类是一个配置类
- `@ComponentScan`：进行组件扫描（SpringBoot 中默认扫描的是启动类所在的当前包及其子包）
- `@EnableAutoConfiguration`：封装了 `@Import` 注解（Import 注解中指定了一个 `ImportSelector` 接口的实现类）

自动配置的核心在于 `@EnableAutoConfiguration` 注解。


当 SpringBoot 程序启动时，就会加载配置文件当中所定义的配置类，并将这些配置类信息（类的全限定名）封装到 String 类型的数组中，最终通过 `@Import` 注解将这些配置类全部加载到 Spring 的 IOC 容器中，交给 IOC 容器管理。


**问题**：在 `META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports` 文件中定义的配置类非常多，而且每个配置类中又可以定义很多的 `bean`，那么这些 `bean` 都会注册到 `Spring` 的 IOC 容器中吗？


**答案**：并非如此。在声明 `bean` 对象时，如果上面添加了一个以 `@Conditional` 开头的注解，这种注解的作用就是按照条件进行装配，只有满足条件之后，才会将 `bean` 注册到 `Spring` 的 IOC 容器中。


#### ****@Conditional****


我们在跟踪 SpringBoot 自动配置的源码的时候，在自动配置类声明 bean 的时候，除了在方法上加了一个 `@Bean` 注解以外，还会经常用到一个注解，就是以 Conditional 开头的这一类的注解。以 Conditional 开头的这些注解都是条件装配的注解。


`@Conditional` 注解：

- 作用：按照一定的条件进行判断，在满足给定条件后才会注册对应的 bean 对象到 Spring 的 IOC 容器中。
- 位置：方法、类。
- `@Conditional` 本身是一个父注解，派生出大量的子注解：
	- `@ConditionalOnClass`：判断环境中有对应字节码文件，才注册 bean 到 IOC 容器。
	- `@ConditionalOnMissingBean`：判断环境中没有对应的 bean（类型或名称），才注册 bean 到 IOC 容器。
	- `@ConditionalOnProperty`：判断配置文件中有对应属性和值，才注册 bean 到 IOC 容器。

**代码演示**：

1. `@ConditionalOnClass` 注解
	- 配置类：

		```java
		@Configuration
		public class HeaderConfig {
		    @Bean
		    @ConditionalOnClass(name="io.jsonwebtoken.Jwts")//环境中存在指定的这个类，才会将该bean加入IOC容器
		    public HeaderParser headerParser(){
		        return new HeaderParser();
		    }
		
		    //省略其他代码...
		}
		```

	- pom.xml ：

		```xml
		<!--JWT令牌-->
		<dependency>
			<groupId>io.jsonwebtoken</groupId>
			<artifactId>jjwt</artifactId>
			<version>0.9.1</version>
		</dependency>
		```

	- 测试类：

		```java
		@SpringBootTest
		public class AutoConfigurationTests {
		@Autowired
		private ApplicationContext applicationContext;
		@Test
		public void testHeaderParser(){
			System.out.println(applicationContext.getBean(HeaderParser.class));
		 }
		//省略其他代码...
		}
		```


	![image.png](assets/bbfc5e4ce4817e23f47fe994195575b5.png)


	因为 `io.jsonwebtoken.Jwts` 字节码文件在启动 SpringBoot 程序时已存在，所以创建 `HeaderParser` 对象并注册到 IOC 容器中。

2. `@ConditionalOnMissingBean` 注解

	```java
	@Configuration
	public class HeaderConfig {
	    @Bean
	    @ConditionalOnMissingBean //不存在该类型的bean，才会将该bean加入IOC容器
	    public HeaderParser headerParser(){
	        return new HeaderParser();
	    }
	
	    //省略其他代码...
	}
	```


	![image.png](assets/0d9f65734373a3aa917cd5e046080bfe.png)


	SpringBoot 在调用 `@Bean` 标识的 `headerParser()` 前，IOC 容器中是没有 `HeaderParser` 类型的 bean，所以 `HeaderParser` 对象正常创建，并注册到 IOC 容器中。

3. `@ConditionalOnProperty` 注解

	该注解和配置文件当中配置的属性有关。


	在 `application.yml` 配置文件中添加如下的键值对：


	```yaml
	name: itheima
	```

	- 配置类：

	```java
	@Configuration
	public class HeaderConfig {
	    @Bean
	    @ConditionalOnProperty(name ="name",havingValue = "itheima")//配置文件中存在指定属性名与值，才会将bean加入IOC容器
	    public HeaderParser headerParser(){
	        return new HeaderParser();
	    }
	    @Bean
	    public HeaderGenerator headerGenerator(){
	        return new HeaderGenerator();
	    }
	}
	```


	![image.png](assets/7a747a5b9c35553878ba4d116b7bd43e.png)


	因为 application.yml 配置文件中，存在： `name:  itheima`，所以 `HeaderParser` 对象正常创建，并注册到 IOC 容器中。


### ****案例****


#### ******自定义 starter 分析******


所谓 starter 指的就是 SpringBoot 当中的起步依赖。


![image.png](assets/839329b223cefdf6a3c69b30545ad766.png)


SpringBoot 官方 starter 命名： spring-boot-starter-xxxx


第三组织提供的 starter 命名：  xxxx-spring-boot-starter


在自定义一个起步依赖 starter 的时候，按照规范需要定义两个模块：

1. starter 模块（进行依赖管理，即把程序开发所需要的依赖都定义在 starter 起步依赖中）
2. autoconfigure 模块（自动配置）

**需求**：自定义 `aliyun-oss-spring-boot-starter`，完成阿里云 OSS 操作工具类 `AliyunOSSUtils` 的自动配置。


**目标**：引入起步依赖引入之后，要想使用阿里云 OSS，注入 `AliyunOSSUtils` 直接使用即可。


**实现步骤**：

1. 创建自定义 starter 模块，统一管理阿里云 OSS 所有依赖。
2. 创建 autoconfigure 模块，并在 starter 中引入 autoconfigure 。
3. 在 autoconfigure 中完成自动配置。
	1. 定义一个自动配置类，配置自动配置类中所需 bean 。
	2. 定义配置文件，把自动配置类的全类名定义在配置文件中。

接下来我们按照分析的步骤来实现自定义 starter。


#### ****自定义 starter 实现****

1. 创建 `aliyun-oss-spring-boot-starter` 模块。

	选择 Spring 工程：


	![image.png](assets/005e3ae3a8c6c121ca5658d32ba46064.png)


	无需任何依赖：


	![image.png](assets/5559cf859698f0f010d3e8a5c39e513a.png)


	创建完 starter 模块后，删除多余的文件，最终保留内容如下：


	![image.png](assets/4348ed0041fc4450f767927c629dae7b.png)


	删除pom.xml文件中多余的内容后：


	```xml
	<?xml version="1.0" encoding="UTF-8"?>
	<project xmlns="<http://maven.apache.org/POM/4.0.0>" xmlns:xsi="<http://www.w3.org/2001/XMLSchema-instance>"
	         xsi:schemaLocation="<http://maven.apache.org/POM/4.0.0> <https://maven.apache.org/xsd/maven-4.0.0.xsd>">
	    <modelVersion>4.0.0</modelVersion>
	    <parent>
	        <groupId>org.springframework.boot</groupId>
	        <artifactId>spring-boot-starter-parent</artifactId>
	        <version>2.7.5</version>
	        <relativePath/> <!-- lookup parent from repository -->
	    </parent>
	    <groupId>com.aliyun.oss</groupId>
	    <artifactId>aliyun-oss-spring-boot-starter</artifactId>
	    <version>0.0.1-SNAPSHOT</version>
	    <properties>
	        <java.version>11</java.version>
	    </properties>
	
	    <dependencies>
	        <dependency>
	            <groupId>org.springframework.boot</groupId>
	            <artifactId>spring-boot-starter</artifactId>
	        </dependency>
	    </dependencies>
	</project>
	```

2. 创建 `aliyun-oss-spring-boot-autoconfigure` 模块。

	创建 Spring 工程：


	![image.png](assets/8e30c6b5ba0b10683310dffdb1dd5d95.png)


	无需任何依赖：


	![image.png](assets/a92ecc8cd20be0a571196811b6749b48.png)


	创建完 autoconfigure 模块后，删除多余的文件，最终保留内容如下：


	![image.png](assets/d0f8b68e9236882a3cf8012350041d3c.png)


	删除 pom.xml 文件中多余的内容后：


	```xml
	<?xml version="1.0" encoding="UTF-8"?>
	<project xmlns="<http://maven.apache.org/POM/4.0.0>" xmlns:xsi="<http://www.w3.org/2001/XMLSchema-instance>"
	         xsi:schemaLocation="<http://maven.apache.org/POM/4.0.0> <https://maven.apache.org/xsd/maven-4.0.0.xsd>">
	    <modelVersion>4.0.0</modelVersion>
	    <parent>
	        <groupId>org.springframework.boot</groupId>
	        <artifactId>spring-boot-starter-parent</artifactId>
	        <version>2.7.5</version>
	        <relativePath/> <!-- lookup parent from repository -->
	    </parent>
	
	    <groupId>com.aliyun.oss</groupId>
	    <artifactId>aliyun-oss-spring-boot-autoconfigure</artifactId>
	    <version>0.0.1-SNAPSHOT</version>
	    <properties>
	        <java.version>11</java.version>
	    </properties>
	    <dependencies>
	        <dependency>
	            <groupId>org.springframework.boot</groupId>
	            <artifactId>spring-boot-starter</artifactId>
	        </dependency>
	    </dependencies>
	</project>
	```

3. 在 start 中引入 autoconfigure 模块。

	```xml
	<?xml version="1.0" encoding="UTF-8"?>
	<project xmlns="<http://maven.apache.org/POM/4.0.0>" xmlns:xsi="<http://www.w3.org/2001/XMLSchema-instance>"
	         xsi:schemaLocation="<http://maven.apache.org/POM/4.0.0> <https://maven.apache.org/xsd/maven-4.0.0.xsd>">
	    <modelVersion>4.0.0</modelVersion>
	    <parent>
	        <groupId>org.springframework.boot</groupId>
	        <artifactId>spring-boot-starter-parent</artifactId>
	        <version>2.7.5</version>
	        <relativePath/> <!-- lookup parent from repository -->
	    </parent>
	    <groupId>com.aliyun.oss</groupId>
	    <artifactId>aliyun-oss-spring-boot-starter</artifactId>
	    <version>0.0.1-SNAPSHOT</version>
	    <properties>
	        <java.version>11</java.version>
	    </properties>
	
	    <dependencies>
	        <!--引入autoconfigure模块-->
	        <dependency>
	            <groupId>com.aliyun.oss</groupId>
	            <artifactId>aliyun-oss-spring-boot-autoconfigure</artifactId>
	            <version>0.0.1-SNAPSHOT</version>
	        </dependency>
	
	        <dependency>
	            <groupId>org.springframework.boot</groupId>
	            <artifactId>spring-boot-starter</artifactId>
	        </dependency>
	    </dependencies>
	</project>
	```

4. 在autoconfigure模块当中来完成自动配置操作。
	1. 阿里云 OSS 部分所需代码直接拷贝到 autoconfigure 模块下：

		![image.png](assets/e887e23e003a9bdc321dc6111f39b2d1.png)

		- `AliOSSProperties` 类：

			```java
			package com.aliyun.oss;
			
			/*阿里云OSS相关配置*/
			@Data
			@ConfigurationProperties(prefix = "aliyun.oss")
			public class AliOSSProperties {
			    // 区域
			    private String endpoint;
			    // 身份ID
			    private String accessKeyId;
			    // 身份密钥
			    private String accessKeySecret;
			    // 存储空间
			    private String bucketName;
			}
			```

		- `AliOSSUtils` 类：

			```java
			package com.aliyun.oss;
			
			import lombok.Data;
			import org.springframework.web.multipart.MultipartFile;
			
			import java.io.IOException;
			import java.io.InputStream;
			import java.util.UUID;
			
			@Data
			public class AliOSSUtils {
			    private AliOSSProperties aliOSSProperties;
			
			    /**
			     * 实现上传图片到OSS
			     */
			    public String upload(MultipartFile multipartFile) throws IOException {
			        // 获取上传的文件的输入流
			        InputStream inputStream = multipartFile.getInputStream();
			        // 避免文件覆盖
			        String originalFilename = multipartFile.getOriginalFilename();
			        String fileName = UUID.randomUUID().toString() + originalFilename.substring(originalFilename.lastIndexOf("."));
			        // 上传文件到 OSS
			        OSS ossClient = new OSSClientBuilder().build(aliOSSProperties.getEndpoint(),
			                aliOSSProperties.getAccessKeyId(), aliOSSProperties.getAccessKeySecret());
			        ossClient.putObject(aliOSSProperties.getBucketName(), fileName, inputStream);
			        // 文件访问路径
			        String url = aliOSSProperties.getEndpoint().split("//")[0] + "//" + aliOSSProperties.getBucketName() + "." + aliOSSProperties.getEndpoint().split("//")[1] + "/" + fileName;
			        // 关闭ossClient
			        ossClient.shutdown();
			        return url;// 把上传到oss的路径返回
			    }
			}
			```

	2. 补充缺失依赖：

		```xml
		<?xml version="1.0" encoding="UTF-8"?>
		<project xmlns="<http://maven.apache.org/POM/4.0.0>" xmlns:xsi="<http://www.w3.org/2001/XMLSchema-instance>"
		         xsi:schemaLocation="<http://maven.apache.org/POM/4.0.0> <https://maven.apache.org/xsd/maven-4.0.0.xsd>">
		    <modelVersion>4.0.0</modelVersion>
		    <parent>
		        <groupId>org.springframework.boot</groupId>
		        <artifactId>spring-boot-starter-parent</artifactId>
		        <version>2.7.5</version>
		        <relativePath/> <!-- lookup parent from repository -->
		    </parent>
		
		    <groupId>com.aliyun.oss</groupId>
		    <artifactId>aliyun-oss-spring-boot-autoconfigure</artifactId>
		    <version>0.0.1-SNAPSHOT</version>
		    <properties>
		        <java.version>11</java.version>
		    </properties>
		    <dependencies>
		        <dependency>
		            <groupId>org.springframework.boot</groupId>
		            <artifactId>spring-boot-starter</artifactId>
		        </dependency>
		        <!--引入web起步依赖-->
		        <dependency>
		            <groupId>org.springframework.boot</groupId>
		            <artifactId>spring-boot-starter-web</artifactId>
		        </dependency>
		        <!--Lombok-->
		        <dependency>
		            <groupId>org.projectlombok</groupId>
		            <artifactId>lombok</artifactId>
		        </dependency>
		        <!--阿里云OSS-->
		        <dependency>
		            <groupId>com.aliyun.oss</groupId>
		            <artifactId>aliyun-sdk-oss</artifactId>
		            <version>3.15.1</version>
		        </dependency>
		        <dependency>
		            <groupId>javax.xml.bind</groupId>
		            <artifactId>jaxb-api</artifactId>
		            <version>2.3.1</version>
		        </dependency>
		        <dependency>
		            <groupId>javax.activation</groupId>
		            <artifactId>activation</artifactId>
		            <version>1.1.1</version>
		        </dependency>
		        <!-- no more than 2.3.3-->
		        <dependency>
		            <groupId>org.glassfish.jaxb</groupId>
		            <artifactId>jaxb-runtime</artifactId>
		            <version>2.3.3</version>
		        </dependency>
		    </dependencies>
		</project>
		```

	3. 定义自动配置类：`AliOSSAutoConfiguration`

		![image.png](assets/ab99e1edac855af6b7a7bbb464642308.png)


		```java
		@Configuration//当前类为Spring配置类
		@EnableConfigurationProperties(AliOSSProperties.class)//导入AliOSSProperties类，并交给SpringIOC管理
		public class AliOSSAutoConfiguration {
		    //创建AliOSSUtils对象，并交给SpringIOC容器
		    @Bean
		    public AliOSSUtils aliOSSUtils(AliOSSProperties aliOSSProperties){
		        AliOSSUtils aliOSSUtils = new AliOSSUtils();
		        aliOSSUtils.setAliOSSProperties(aliOSSProperties);
		        return aliOSSUtils;
		    }
		}
		```

	4. 在 autoconfigure 模块中的 resources 下，新建自动配置文件：
		- `META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports`

			```plain text
			com.aliyun.oss.AliOSSAutoConfiguration
			```


#### ****自定义 starter 测试****


测试前准备：

1. 将测试工程直接导入 IDEA 当中。

	[springboot-autoconfiguration-test.zip](https://prod-files-secure.s3.us-west-2.amazonaws.com/c911c495-2fbb-40d2-821e-9f7656976401/11a615ee-6787-4965-96eb-afea620a5b40/springboot-autoconfiguration-test.zip?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VSZ6JXOM%2F20250302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250302T064315Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJGMEQCIDJujOByYC7%2FbMPYp67cMqh3qiTjQIMEWHQEsNUv%2FXO1AiATfa12rZvTNydv1khjXcwZ2niyUX1KFC%2BJYc7Bisd3ESqIBAi3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMvS9Om8tnAHJWCM4VKtwDGiFW76rX3IpxwgC66zAAU55dF3qITwsU7bpTZVNjdIMFZZQnJFUNugWT3DJr0Z7ZtQFy4S5V%2FUst%2BwMuDs0YDAK3yWMr%2FoDxfDpQQKGnkXDt0CP%2F4r5qPbbatMomGd3Zi3Zw1%2FssLneU25bxJR33ET2b0Fc1ZF0yUw%2BcIYycgKj2hX0kTIOa6Xqk7uwAIqOT9lzvE2WB5ITnLifEIdefDoBKtr2dWouJG6AaaZ5ofAATnFyzUXI6eLTdl%2Bges3Q2fnLIkOHjB78WYrDEB7icopJ84etC%2BfmJX6W0DxeXLLwOBvIzlzeSxzy6qlf6UGxjZcZRmZ8G7wDUDsHWaoEm%2BBxXBmaRRFSKrUDROqDleqfJ82VmRUs8PXiGIBIFa3h5Fz5r2onXxlDEvhb5AqPrcl%2FjsHP0ml3W2lgpxhjer6Rfr0YAD%2B2MX2ghJ5OaJh7mOqbReQ5IdOrDajKH29jt56vpUK%2BKxL4xNa2UUKd%2BT1dJHxzt0x%2Fajcx6%2BroBQJ23O9A6CeJn5OgeakBFo1Sui%2B4TPbG0qU1YDtMDuKo6fTO70smcpsLZlKGK1Jgt8LyJ%2F2xkriQQCqiGk0Vzr3c28yePT4B1TSPgDep2hTGqH1cpC1cnvgijBX5ZSiow6dePvgY6pgEEmfcNJSlOH3u6wuD%2B8m3fkKvjkpAOD%2FvT9MzCG35YtgIHgR0MNsEm%2F71bPcO%2BzayuS7SYyctHTZiysu2cDtWmXORa2v8bSFJZ37AknNzMlSnQMrRncTzeAB7n9mz7nf0Z1uiEck4lfPMn%2BYSePX5jD535hP8KHQa%2BzYhyqhVaihg6JZUTn3kKulbc8xpheJtiaLAUIA78cZVMxP5uXjV6DeT7bg%2BA&X-Amz-Signature=afbae6e2608b195daf2b67c3d20b50b6251bba9a074826e64b8e1e3b13d55cbe&X-Amz-SignedHeaders=host&x-id=GetObject)

2. 在 test 工程中引入阿里云 starter 依赖。通过依赖传递，将会把 autoconfigure 依赖也一并引入。

	```xml
	<!--引入阿里云OSS起步依赖-->
	<dependency>
	    <groupId>com.aliyun.oss</groupId>
	    <artifactId>aliyun-oss-spring-boot-starter</artifactId>
	    <version>0.0.1-SNAPSHOT</version>
	</dependency>
	```

3. 在 test 工程中的 `application.yml` 文件中，配置阿里云 OSS 配置参数信息。

	```yaml
	#配置阿里云OSS参数
	aliyun:
	  oss:
	    endpoint: https://oss-cn-shanghai.aliyuncs.com
	    accessKeyId: LTAI5t9MZK8iq5T2Av5GLDxX
	    accessKeySecret: C0IrHzKZGKqU8S7YQcevcotD3Zd5Tc
	    bucketName: web-framework01
	```

4. 在 test 工程中的 `UploadController` 类编写代码。

	```java
	@RestController
	public class UploadController {
	    @Autowired
	    private AliOSSUtils aliOSSUtils;
	    @PostMapping("/upload")
	    public String upload(MultipartFile image) throws Exception {
	        //上传文件到阿里云 OSS
	        String url = aliOSSUtils.upload(image);
	        return url;
	    }
	}
	```


准备完毕后，我们即可启动当前的 SpringBoot 测试工程：

- 随着 SpringBoot 项目启动，自动配置会把 `AliOSSUtils` 的 bean 对象装配到 IOC 容器中：

	![image.png](assets/163464925331c054a79ea39b1f68f7c8.png)

- 用 postman 工具进行文件上传：

	![image.png](assets/79e4ea1061aaceeb011f45fd793c493f.png)


	通过断点可以看到自动注入 `AliOSSUtils` 的 bean 对象：


	![image.png](assets/37e999c06dc27b89f4d9aa67af2b5b90.png)


**总结：**


通过自定义 starter，可以将常用的第三方组件进行封装，简化项目中的配置和使用，提高开发效率。

- 自定义 starter 的核心在于 autoconfigure 模块中的自动配置类和配置文件。
- 自动配置类负责将 Bean 对象注册到 IOC 容器中。
- 配置文件负责指定自动配置类的全类名，使 SpringBoot 能够加载自动配置类。
