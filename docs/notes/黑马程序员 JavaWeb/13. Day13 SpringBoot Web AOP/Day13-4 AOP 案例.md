---
title: Day13-4 AOP 案例
createTime: 2025/03/01T12:58:00.000Z
updateTime: 2025/03/02T02:52:00.000Z
permalink: /itheima-javaweb/day13-4-aop-example/
---

**需求：** 将案例中增、删、改相关接口的操作日志记录到数据库表中。


操作日志信息包含：操作人、操作时间、执行方法的全类名、执行方法名、方法运行时参数、返回值、方法执行时长。


## ****准备工作****

1. **AOP 起步依赖**

	```xml
	<!-- AOP -->
	<dependency>
	    <groupId>org.springframework.boot</groupId>
	    <artifactId>spring-boot-starter-aop</artifactId>
	</dependency>
	```

2. **数据库表结构和实体类**
- **数据表：****`operate_log`**

	```sql
	create table operate_log(
	    id int unsigned primary key auto_increment comment 'ID',
	    operate_user int unsigned comment '操作人',
	    operate_time datetime comment '操作时间',
	    class_name varchar(100) comment '操作的类名',
	    method_name varchar(100) comment '操作的方法名',
	    method_params varchar(1000) comment '方法参数',
	    return_value varchar(2000) comment '返回值',
	    cost_time bigint comment '方法执行耗时, 单位:ms'
	) comment '操作日志表';
	```

- **实体类：****`OperateLog`**

	```java
	@Data
	@NoArgsConstructor
	@AllArgsConstructor
	public class OperateLog {
	    private Integer id; // 主键ID
	    private Integer operateUser; // 操作人ID
	    private LocalDateTime operateTime; // 操作时间
	    private String className; // 操作类名
	    private String methodName; // 操作方法名
	    private String methodParams; // 操作方法参数
	    private String returnValue; // 操作方法返回值
	    private Long costTime; // 操作耗时
	}
	```

- **Mapper 接口：****`OperateLogMapper`**

	```java
	@Mapper
	public interface OperateLogMapper {
	    // 插入日志数据
	    @Insert("insert into operate_log (operate_user, operate_time, class_name, method_name, method_params, return_value, cost_time) " +
	            "values (#{operateUser}, #{operateTime}, #{className}, #{methodName}, #{methodParams}, #{returnValue}, #{costTime});")
	    public void insert(OperateLog log);
	}
	```


## ****编码实现****

1. **自定义注解：****`@Log`**

	```java
	/**
	 * 自定义Log注解
	 */
	@Target({ElementType.METHOD})
	@Documented
	@Retention(RetentionPolicy.RUNTIME)
	public @interface Log {
	}
	```

2. **修改业务实现类，在增删改业务方法上添加** **`@Log`** **注解**
	- `EmpServiceImpl`

		```java
		@Slf4j
		@Service
		public class EmpServiceImpl implements EmpService {
		    @Autowired
		    private EmpMapper empMapper;
		
		    @Override
		    @Log
		    public void update(Emp emp) {
		        emp.setUpdateTime(LocalDateTime.now()); // 更新修改时间为当前时间
		        empMapper.update(emp);
		    }
		
		    @Override
		    @Log
		    public void save(Emp emp) {
		        // 补全数据
		        emp.setCreateTime(LocalDateTime.now());
		        emp.setUpdateTime(LocalDateTime.now());
		        // 调用添加方法
		        empMapper.insert(emp);
		    }
		
		    @Override
		    @Log
		    public void delete(List<Integer> ids) {
		        empMapper.delete(ids);
		    }
		    // 省略其他代码...
		}
		```

3. **定义切面类，完成记录操作日志的逻辑**

	```java
	@Slf4j
	@Component
	@Aspect // 切面类
	public class LogAspect {
	    @Autowired
	    private HttpServletRequest request;
	    @Autowired
	    private OperateLogMapper operateLogMapper;
	
	    @Around("@annotation(com.itheima.anno.Log)")
	    public Object recordLog(ProceedingJoinPoint joinPoint) throws Throwable {
	        // 操作人ID - 当前登录员工ID
	        // 获取请求头中的jwt令牌, 解析令牌
	        String jwt = request.getHeader("token");
	        Claims claims = JwtUtils.parseJWT(jwt);
	        Integer operateUser = (Integer) claims.get("id");
	        // 操作时间
	        LocalDateTime operateTime = LocalDateTime.now();
	        // 操作类名
	        String className = joinPoint.getTarget().getClass().getName();
	        // 操作方法名
	        String methodName = joinPoint.getSignature().getName();
	        // 操作方法参数
	        Object[] args = joinPoint.getArgs();
	        String methodParams = Arrays.toString(args);
	        long begin = System.currentTimeMillis();
	        // 调用原始目标方法运行
	        Object result = joinPoint.proceed();
	        long end = System.currentTimeMillis();
	        // 方法返回值
	        String returnValue = JSONObject.toJSONString(result);
	        // 操作耗时
	        Long costTime = end - begin;
	        // 记录操作日志
	        OperateLog operateLog = new OperateLog(null, operateUser, operateTime, className, methodName, methodParams, returnValue, costTime);
	        operateLogMapper.insert(operateLog);
	        log.info("AOP记录操作日志: {}", operateLog);
	        return result;
	    }
	}
	```


	**代码解释：**

	- `@Around("@annotation(com.itheima.anno.Log)")`：定义一个环绕通知，`@annotation(com.itheima.anno.Log)` 是切入点表达式，表示带有 `@Log` 注解的方法。
	- `HttpServletRequest`：用于获取请求头中的 JWT 令牌，从中解析出当前用户的 ID。
	- `OperateLog`：用于封装操作日志信息。
	- `operateLogMapper.insert(operateLog)`：将操作日志信息插入到数据库中。
