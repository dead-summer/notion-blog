---
title: Day13-3 AOP 进阶
createTime: 2025/03/01T12:58:00.000Z
updateTime: 2025/03/02T02:52:00.000Z
permalink: /itheima-javaweb/day13-3-aop-advanced/
---

## ****通知类型****


Spring AOP 提供了五种通知类型：


| 注解                | 类型    | 执行时机                  |
| ----------------- | ----- | --------------------- |
| `@Around`         | 环绕通知  | 在目标方法前、后都被执行          |
| `@Before`         | 前置通知  | 在目标方法前被执行             |
| `@After`          | 后置通知  | 在目标方法后被执行，无论是否有异常都会执行 |
| `@AfterReturning` | 返回后通知 | 在目标方法后被执行，有异常不会执行     |
| `@AfterThrowing`  | 异常后通知 | 在目标方法发生异常后执行          |


**示例：**


```java
@Slf4j
@Component
@Aspect
public class MyAspect1 {
    // 前置通知
    @Before("execution(* com.itheima.service.*.*(..))")
    public void before(JoinPoint joinPoint) {
        log.info("before ...");
    }

    // 环绕通知
    @Around("execution(* com.itheima.service.*.*(..))")
    public Object around(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        log.info("around before ...");
        // 调用目标对象的原始方法执行
        Object result = proceedingJoinPoint.proceed();

        // 原始方法如果执行时有异常，环绕通知中的后置代码不会在执行了

        log.info("around after ...");
        return result;
    }

    // 后置通知
    @After("execution(* com.itheima.service.*.*(..))")
    public void after(JoinPoint joinPoint) {
        log.info("after ...");
    }

    // 返回后通知（程序在正常执行的情况下，会执行的后置通知）
    @AfterReturning("execution(* com.itheima.service.*.*(..))")
    public void afterReturning(JoinPoint joinPoint) {
        log.info("afterReturning ...");
    }

    // 异常通知（程序在出现异常的情况下，执行的后置通知）
    @AfterThrowing("execution(* com.itheima.service.*.*(..))")
    public void afterThrowing(JoinPoint joinPoint) {
        log.info("afterThrowing ...");
    }
}
```


**注意事项：**

- `@Around` 环绕通知需要自己调用 `ProceedingJoinPoint.proceed()` 来让原始方法执行，其他通知不需要考虑目标方法执行。
- `@Around` 环绕通知方法的返回值，必须指定为 `Object`，来接收原始方法的返回值，否则原始方法执行完毕，是获取不到返回值的。

容易发现，每一个注解里面都指定了切入点表达式，而且这些切入点表达式都一模一样。此时，我们的代码当中就存在了大量的重复性切入点表达式，假如此时切入点表达式需要变动，就需要将所有的切入点表达式逐一改动，这会变得非常繁琐。


那么，应该如何解决这个切入点表达式重复的问题呢？ 答案是：**抽取**。


Spring 提供了 `@PointCut` 注解，该注解的作用是将公共的切入点表达式抽取出来，在需要用到时引用该切入点表达式即可。


**@Pointcut 注解**


`@Pointcut` 注解用于抽取公共的切入点表达式，避免重复定义。


**示例：**


```java
@Slf4j
@Component
@Aspect
public class MyAspect1 {
    // 切入点方法（公共的切入点表达式）
    @Pointcut("execution(* com.itheima.service.*.*(..))")
    private void pt() {
    }

    // 前置通知（引用切入点）
    @Before("pt()")
    public void before(JoinPoint joinPoint) {
        log.info("before ...");
    }
    // ...
}
```


## ****通知顺序****


当多个切面类的切入点匹配到同一个目标方法时，通知的执行顺序如下：

1. **默认顺序：** 按照切面类的类名字母排序。
2. **`@Order`** **注解：** 使用 `@Order` 注解可以控制切面类的执行顺序，数字越小，优先级越高。

**示例：**


```java
@Slf4j
@Component
@Aspect
@Order(2)  // 切面类的执行顺序（前置通知：数字越小先执行; 后置通知：数字越小越后执行）
public class MyAspect2 {
    // ...
}
```


## ****切入点表达式****


切入点表达式用于描述哪些方法需要加入通知。


**常见的形式：**

1. **`execution(......)`****：** 根据方法的签名来匹配。
2. **`@annotation(......)`****：** 根据注解匹配。

### ******execution******


`execution` 切入点表达式的语法如下：


```plain text
execution(访问修饰符?  返回值  包名.类名.?方法名(方法参数) throws 异常?)
```


其中带 `?` 的表示可以省略的部分：

- 访问修饰符：可省略 (例如：`public`、`protected`)
- `包名.类名`：可省略
- `throws` 异常：可省略。（这里指的是方法声明中抛出的异常，而非实际抛出的异常）

使用通配符描述切入点：

- `*` ：单个独立的任意符号，可以通配任意返回值、包名、类名、方法名、任意类型的一个参数，也可以通配包、类、方法名的一部分。
- `..` ：多个连续的任意符号，可以通配任意层级的包，或任意类型、任意个数的参数。

**切入点表达式的语法规则**：

1. 方法的访问修饰符可以省略。

	```plain text
	execution(void com.itheima.service.impl.DeptServiceImpl.delete(java.lang.Integer))
	```

2. 返回值可以使用  `*` 号代替（任意返回值类型）。

	```plain text
	execution(* com.itheima.service.impl.DeptServiceImpl.delete(java.lang.Integer))
	```

3. 包名可以使用 `*`  号代替，代表任意包（一层包使用一个 `*`）。

	```plain text
	execution(* com.itheima.*.*.DeptServiceImpl.delete(java.lang.Integer))
	```

4. 使用 `..` 配置包名，标识此包以及此包下的所有子包。

	```plain text
	execution(* com..DeptServiceImpl.delete(java.lang.Integer))
	```

5. 类名可以使用 `*`  号代替，标识任意类。

	```plain text
	execution(* com..*.delete(java.lang.Integer))
	```

6. 方法名可以使用 `*`  号代替，表示任意方法。

	```plain text
	execution(* com..*.*(java.lang.Integer))
	```

7. 可以使用 `*`  配置参数，一个任意类型的参数。

	```plain text
	execution(* com.itheima.service.impl.DeptServiceImpl.delete(*))
	```

8. 可以使用 `..` 配置参数，任意个任意类型的参数。

	```plain text
	execution(* com..*.*(..))
	```


**注意事项**：

- 根据需求，可以使用 `&&`、`||`、`!` 来组合复杂的切入点表达式。

	```plain text
	execution(* com.itheima.service.DeptService.list(..)) || execution(*com.itheima.service.DeptService.delete(..))
	```


**建议：**

- 所有业务方法名在命名时尽量规范，方便切入点表达式快速匹配。
- 描述切入点方法通常基于接口描述，而不是直接描述实现类，增强拓展性。
- 在满足业务需要的前提下，尽量缩小切入点的匹配范围。

### ******@annotation******


`@annotation` 切入点表达式用于匹配带有指定注解的方法。


**步骤：**

1. 编写自定义注解。
2. 在业务类中要做为连接点的方法上添加自定义注解。

**示例：**

- **自定义注解：****`MyLog`**

	```java
	@Target(ElementType.METHOD)
	@Retention(RetentionPolicy.RUNTIME)
	public @interface MyLog {
	}
	```

	- `@Target(ElementType.METHOD)` 意味着 `MyLog` 注解只能应用于方法上。
	- **`RetentionPolicy.RUNTIME`****：** 表示该注解在运行时仍然可用。这意味着我们可以在程序运行时通过反射来获取 `MyLog` 注解的信息。 这将允许我们编写代码来检查一个方法是否被 `@MyLog` 注解标记，并根据这个信息来执行某些操作。
- **业务类：****`DeptServiceImpl`**

	```java
	@Slf4j
	@Service
	public class DeptServiceImpl implements DeptService {
	    @Autowired
	    private DeptMapper deptMapper;
	
	    @Override
	    @MyLog  // 自定义注解（表示：当前方法属于目标方法）
	    public List<Dept> list() {
	        List<Dept> deptList = deptMapper.list();
	        return deptList;
	    }
	
	    @Override
	    @MyLog  // 自定义注解（表示：当前方法属于目标方法）
	    public void delete(Integer id) {
	        deptMapper.delete(id);
	    }
	}
	```

- **切面类**

	```java
	@Slf4j
	@Component
	@Aspect
	public class MyAspect6 {
	    // 针对list方法、delete方法进行前置通知和后置通知
	
	    // 前置通知
	    @Before("@annotation(com.itheima.anno.MyLog)")
	    public void before() {
	        log.info("MyAspect6 -> before ...");
	    }
	
	    // 后置通知
	    @After("@annotation(com.itheima.anno.MyLog)")
	    public void after() {
	        log.info("MyAspect6 -> after ...");
	    }
	}
	```


## ****连接点****


在 Spring AOP 中，连接点特指方法的执行。


Spring 使用 `JoinPoint` 抽象了连接点，可以获得方法执行时的相关信息，如目标类名、方法名、方法参数等。


| 方法名                        | 返回类型        | 说明                                                             | 常用场景                                  |
| -------------------------- | ----------- | -------------------------------------------------------------- | ------------------------------------- |
| `getArgs()`                | `Object[]`  | 获取目标方法的参数数组。                                                   | 记录方法参数、参数校验、根据参数值进行不同的处理。             |
| `getThis()`                | `Object`    | 获取当前正在执行的对象（即目标对象）。                                            | 获取目标对象实例，调用目标对象的方法或访问其属性。             |
| `getTarget()`              | `Object`    | 获取目标对象。与 `getThis()` 在某些情况下可能相同，但 `getTarget()` 更通用，尤其是在使用代理时。 | 获取目标对象实例，与 `getThis()` 类似，但在使用代理时更可靠。 |
| `getSignature()`           | `Signature` | 获取封装了连接点信息的 `Signature` 对象。                                    | 获取方法名、类名、方法签名等更详细的信息。                 |
| `getSignature().getName()` | `String`    | 从 `Signature` 对象中获取目标方法的方法名。                                   | 记录方法名、根据方法名进行不同的处理。                   |

- 对于 `@Around` 通知，获取连接点信息只能使用 `ProceedingJoinPoint` 类型。
- 对于其他四种通知，获取连接点信息只能使用 `JoinPoint`，它是 `ProceedingJoinPoint` 的父类型。

**示例：**


```java
@Slf4j
@Component
@Aspect
public class MyAspect7 {
    @Pointcut("@annotation(com.itheima.anno.MyLog)")
    private void pt() {
    }

    // 前置通知
    @Before("pt()")
    public void before(JoinPoint joinPoint) {
        log.info(joinPoint.getSignature().getName() + " MyAspect7 -> before ...");
    }

    // 后置通知
    @Before("pt()")
    public void after(JoinPoint joinPoint) {
        log.info(joinPoint.getSignature().getName() + " MyAspect7 -> after ...");
    }

    // 环绕通知
    @Around("pt()")
    public Object around(ProceedingJoinPoint pjp) throws Throwable {
        // 获取目标类名
        String name = pjp.getTarget().getClass().getName();
        log.info("目标类名：{}", name);
        // 目标方法名
        String methodName = pjp.getSignature().getName();
        log.info("目标方法名：{}", methodName);
        // 获取方法执行时需要的参数
        Object[] args = pjp.getArgs();
        log.info("目标方法参数：{}", Arrays.toString(args));
        // 执行原始方法
        Object returnValue = pjp.proceed();
        return returnValue;
    }
}
```

