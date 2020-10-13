





1、新建单位 /organ 的时候还需要添加一个根据authCode是否已存在的判断，都不重复则新建，重复不重复都返回单位id(自增的)
现在返回是这样
{
    "code": 1201,
    "message": "单位已存在",
    "data": null
}

2、管理员接口
  /admin/users  判断管理员身份、查询出所有用户、有分页功能
  结果包括 是否过期isOverTime ，到期时间  和其他基本信息

  /admin/user/{username} 给某用户的过期时间从今天+1年

  /admin/userBan/{username} 某用户变回游客权限()

3、

修改权重表 ，
{"id":1,"tables":{"key1":3}} 


获取单位下的权重表
Header : token ,authId
GET /weight/{type}  返回需要分页功能
{
message:
code:
data:[
    {
      词：权重1
    }
    {
      词：权重2
    }
]
}


{
        "id": 14,
        "userId": 7,
        "authId": 7,
        "batchId": 20,
        "docType": "official",
        "docDate": "20190808",
        "docTitle": "今天的猪肉12元",
        "docPage": 22,
        "docNum": 100,
        "remark": null,
        "docSequence": "rXJArH",
        "docAbout": "民生",
        "keyword": "猪肉",
        "sortYear": "2019",
        "docSubType": null,
        "docTypeCode": null,
        "docLevel": "市级",
        "docDesc": "桃县[2019]2号",
        "docDescAuthor": "桃源县",
        "docDescNum": "2",
        "dutyAuthor": "桃源县",
        "deadline": "yongjiu",
        "docSecret": "",
        "boxSeq": null





          "timestamp" : "2020-08-11T06:14:30.593+0000",
  "status" : 500,
  "error" : "Internal Server Error",
  "message" : "could not execute statement; SQL [n/a]; constraint [null]; nested exception is org.hibernate.exception.
  ConstraintViolationException: could not execute statement",
  "trace" : "org.springframework.dao.DataIntegrityViolationException: 
  could not execute statement; SQL [n/a]; constraint [null]; nested exception
   is org.hibernate.exception.ConstraintViolationException: could not execute
    statement\r\n\tat org.springframework.orm.jpa.vendor.HibernateJpaDialect.
    convertHibernateAccessException(HibernateJpaDialect.java:298)\r\n\tat
     org.springframework.orm.jpa.vendor.HibernateJpaDialect.translateExceptionIfPossibl
     e(HibernateJpaDialect.java:255)\r\n\tat org.springframework.orm.jpa.JpaTransactionManager.
     doCommit(JpaTransactionManager.java:538)\r\n\tat org.springframework.transaction.support
     .AbstractPlatformTransactionManager.processCommit(AbstractPlatformTransactionManager.java:743)
     \r\n\tat org.springframework.transaction.support.AbstractPlatformTransactionManager.commit
     (AbstractPlatformTransactionManager.java:711)\r\n\tat org.springframework.transaction.interceptor.
     TransactionAspectSupport.commitTransactionAfterReturning(TransactionAspectSupport.java:631)\r\n\tat 
     org.springframework.transaction.interceptor.TransactionAspectSupport.invokeWithinTransaction(
       TransactionAspectSupport.java:385)\r\n\tat org.springframework.transaction.interceptor.Tran
       sactionInterceptor.invoke(TransactionInterceptor.java:99)\r\n\tat org.springframework.aop.fram
       ework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:186)\r\n\tat org.spr
       ingframework.dao.support.PersistenceExceptionTranslationInterceptor.invoke(PersistenceExceptio
       nTranslationInterceptor.java:139)\r\n\tat org.springframework.aop.framework.ReflectiveMethodIn
       vocation.proceed(ReflectiveMethodInvocation.java:186)\r\n\tat org.springframework.data.jpa.repos
       itory.support.CrudMethodMetadataPostProcessor$CrudMethodMetadataPopulatingMethodIntercepto
       r.invoke(CrudMethodMetadataPostProcessor.java:178)\r\n\tat org.springframework.aop.framework.R
       eflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:186)\r\n\tat org.springframework
       .aop.interceptor.ExposeInvocationInterceptor.invoke(ExposeInvocationInterceptor.java:95)\r\n\tat or
       g.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.j
       ava:186)\r\n\tat org.springframework.aop.framework.JdkDynamicAopProxy.invoke(JdkDynamicAopProxy.java:212)\r\n\tat com.sun.proxy.$Proxy138.save(Unknown Source)\r\n\tat com.gdm.gdm.service.WeightService.updateWeight(WeightService.java:289)\r\n\tat com.gdm.gdm.controller.WeightController.updateWeightById(WeightController.java:129)\r\n\tat com.gdm.gdm.controller.WeightController$$FastClassBySpringCGLIB$$7be4f5fd.invoke(<generated>)\r\n\tat org.springframework.cglib.proxy.MethodProxy.invoke(MethodProxy.java:218)\r\n\tat org.springframework.aop.framework.CglibAopProxy$CglibMethodInvocation.invokeJoinpoint(CglibAopProxy.java:769)\r\n\tat org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:163)\r\n\tat org.springframework.aop.framework.CglibAopProxy$CglibMethodInvocation.proceed(CglibAopProxy.java:747)\r\n\tat org.apache.shiro.spring.security.interceptor.AopAllianceAnnotationsAuthorizingMethodInterceptor$1.proceed(AopAllianceAnnotationsAuthorizingMethodInterceptor.java:82)\r\n\tat org.apache.shiro.authz.aop.AuthorizingMethodInterceptor.invoke(AuthorizingMethodInterceptor.java:39)\r\n\tat org.apache.shiro.spring.security.interceptor.AopAllianceAnnotationsAuthorizingMethodInterceptor.invoke(AopAllianceAnnotationsAuthorizingMethodInterceptor.java:115)\r\n\tat org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:186)\r\n\tat org.springframework.aop.framework.CglibAopProxy$CglibMethodInvocation.proceed(CglibAopProxy.java:747)\r\n\tat org.springframework.aop.framework.CglibAopProxy$DynamicAdvisedInterceptor.intercept(CglibAopProxy.java:689)\r\n\tat com.gdm.gdm.controller.WeightController$$EnhancerBySpringCGLIB$$7b8fa3ef.updateWeightById(<generated>)\r\n\tat com.gdm.gdm.controller.WeightController$$FastClassBySpringCGLIB$$7be4f5fd.invoke(<generated>)\r\n\tat org.springframework.cglib.proxy.MethodProxy.invoke(MethodProxy.java:218)\r\n\tat org.springframework.aop.framework.CglibAopProxy$CglibMethodInvocation.invokeJoinpoint(CglibAopProxy.java:769)\r\n\tat org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:163)\r\n\tat org.springframework.aop.framework.CglibAopProxy$CglibMethodInvocation.proceed(CglibAopProxy.java:747)\r\n\tat org.apache.shiro.spring.security.interceptor.AopAllianceAnnotationsAuthorizingMethodInterceptor$1.proceed(AopAllianceAnnotationsAuthorizingMethodInterceptor.java:82)\r\n\tat org.apache.shiro.authz.aop.AuthorizingMethodInterceptor.invoke(AuthorizingMethodInterceptor.java:39)\r\n\tat org.apache.shiro.spring.security.interceptor.AopAllianceAnnotationsAuthorizingMethodInterceptor.invoke(AopAllianceAnnotationsAuthorizingMethodInterceptor.java:115)\r\n\tat org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:186)\r\n\tat org.springframework.aop.framework.CglibAopProxy$CglibMethodInvocation.proceed(CglibAopProxy.java:747)\r\n\tat org.springframework.aop.framework.CglibAopProxy$DynamicAdvisedInterceptor.intercept(CglibAopProxy.java:689)\r\n\tat com.gdm.gdm.controller.WeightController$$EnhancerBySpringCGLIB$$95fcef2b.updateWeightById(<generated>)\r\n\tat sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)\r\n\tat sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)\r\n\tat sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)\r\n\tat java.lang.reflect.Method.invoke(Method.java:498)\r\n\tat org.springframework.web.method.support.InvocableHandlerMethod.doInvoke(InvocableHandlerMethod.java:190)\r\n\tat org.springframework.web.method.support.InvocableHandlerMethod.invokeForRequest(InvocableHandlerMethod.java:138)\r\n\tat org.springframework.web.servlet.mvc.method.annotation.ServletInvocableHandlerMethod.invokeAndHandle(ServletInvocableHandlerMethod.java:106)\r\n\tat org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.invokeHandlerMethod(RequestMappingHandlerAdapter.java:879)\r\n\tat org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.handleInternal(RequestMappingHandlerAdapter.java:793)\r\n\tat org.springframework.web.servlet.mvc.method.AbstractHandlerMethodAdapter.handle(AbstractHandlerMethodAdapter.java:87)\r\n\tat org.springframework.web.servlet.DispatcherServlet.doDispatch(DispatcherServlet.java:1040)\r\n\tat org.springframework.web.servlet.DispatcherServlet.doService(DispatcherServlet.java:943)\r\n\tat org.springframework.web.servlet.FrameworkServlet.processRequest(FrameworkServlet.java:1006)\r\n\tat org.springframework.web.servlet.FrameworkServlet.doPut(FrameworkServlet.java:920)\r\n\tat javax.servlet.http.HttpServlet.service(HttpServlet.java:663)\r\n\tat org.springframework.web.servlet.FrameworkServlet.service(FrameworkServlet.java:883)\r\n\tat javax.servlet.http.HttpServlet.service(HttpServlet.java:741)\r\n\tat org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:231)\r\n\tat org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166)\r\n\tat org.apache.tomcat.websocket.server.WsFilter.doFilter(WsFilter.java:53)\r\n\tat org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193)\r\n\tat org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166)\r\n\tat org.apache.shiro.web.servlet.ProxiedFilterChain.doFilter(ProxiedFilterChain.java:61)\r\n\tat org.apache.shiro.web.servlet.AdviceFilter.executeChain(AdviceFilter.java:108)\r\n\tat org.apache.shiro.web.servlet.AdviceFilter.doFilterInternal(AdviceFilter.java:137)\r\n\tat org.apache.shiro.web.servlet.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:125)\r\n\tat org.apache.shiro.web.servlet.ProxiedFilterChain.doFilter(ProxiedFilterChain.java:66)\r\n\tat org.apache.shiro.web.servlet.AbstractShiroFilter.executeChain(AbstractShiroFilter.java:449)\r\n\tat org.apache.shiro.web.servlet.AbstractShiroFilter$1.call(AbstractShiroFilter.java:365)\r\n\tat org.apache.shiro.subject.support.SubjectCallable.doCall(SubjectCallable.java:90)\r\n\tat org.apache.shiro.subject.support.SubjectCallable.call(SubjectCallable.java:83)\r\n\tat org.apache.shiro.subject.support.DelegatingSubject.execute(DelegatingSubject.java:387)\r\n\tat org.apache.shiro.web.servlet.AbstractShiroFilter.doFilterInternal(AbstractShiroFilter.java:362)\r\n\tat org.apache.shiro.web.servlet.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:125)\r\n\tat org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193)\r\n\tat org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166)\r\n\tat org.springframework.web.filter.RequestContextFilter.doFilterInternal(RequestContextFilter.java:100)\r\n\tat org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:119)\r\n\tat org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193)\r\n\tat org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166)\r\n\tat org.springframework.web.filter.FormContentFilter.doFilterInternal(FormContentFilter.java:93)\r\n\tat org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:119)\r\n\tat org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193)\r\n\tat org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166)\r\n\tat org.springframework.web.filter.CharacterEncodingFilter.doFilterInternal(CharacterEncodingFilter.java:201)\r\n\tat org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:119)\r\n\tat org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193)\r\n\tat org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166)\r\n\tat org.apache.catalina.core.StandardWrapperValve.invoke(StandardWrapperValve.java:202)\r\n\tat org.apache.catalina.core.StandardContextValve.invoke(StandardContextValve.java:96)\r\n\tat org.apache.catalina.authenticator.AuthenticatorBase.invoke(AuthenticatorBase.java:541)\r\n\tat org.apache.catalina.core.StandardHostValve.invoke(StandardHostValve.java:139)\r\n\tat org.apache.catalina.valves.ErrorReportValve.invoke(ErrorReportValve.java:92)\r\n\tat org.apache.catalina.core.StandardEngineValve.invoke(StandardEngineValve.java:74)\r\n\tat org.apache.catalina.connector.CoyoteAdapter.service(CoyoteAdapter.java:343)\r\n\tat org.apache.coyote.http11.Http11Processor.service(Http11Processor.java:367)\r\n\tat org.apache.coyote.AbstractProcessorLight.process(AbstractProcessorLight.java:65)\r\n\tat org.apache.coyote.AbstractProtocol$ConnectionHandler.process(AbstractProtocol.java:868)\r\n\tat org.apache.tomcat.util.net.NioEndpoint$SocketProcessor.doRun(NioEndpoint.java:1639)\r\n\tat org.apache.tomcat.util.net.SocketProcessorBase.run(SocketProcessorBase.java:49)\r\n\tat java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1149)\r\n\tat java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:624)\r\n\tat org.apache.tomcat.util.threads.TaskThread$WrappingRunnable.run(TaskThread.java:61)\r\n\tat java.lang.Thread.run(Thread.java:748)\r\nCaused by: org.hibernate.exception.ConstraintViolationException: could not execute statement\r\n\tat org.hibernate.exception.internal.SQLExceptionTypeDelegate.convert(SQLExceptionTypeDelegate.java:59)\r\n\tat org.hibernate.exception.internal.StandardSQLExceptionConverter.convert(StandardSQLExceptionConverter.java:42)\r\n\tat org.hibernate.engine.jdbc.spi.SqlExceptionHelper.convert(SqlExceptionHelper.java:113)\r\n\tat org.hibernate.engine.jdbc.spi.SqlExceptionHelper.convert(SqlExceptionHelper.java:99)\r\n\tat org.hibernate.engine.jdbc.internal.ResultSetReturnImpl.executeUpdate(ResultSetReturnImpl.java:200)\r\n\tat org.hibernate.persister.entity.AbstractEntityPersister.update(AbstractEntityPersister.java:3430)\r\n\tat org.hibernate.persister.entity.AbstractEntityPersister.updateOrInsert(AbstractEntityPersister.java:3292)\r\n\tat org.hibernate.persister.entity.AbstractEntityPersister.update(AbstractEntityPersister.java:3704)\r\n\tat org.hibernate.action.internal.EntityUpdateAction.execute(EntityUpdateAction.java:201)\r\n\tat org.hibernate.engine.spi.ActionQueue.executeActions(ActionQueue.java:604)\r\n\tat org.hibernate.engine.spi.ActionQueue.lambda$executeActions$1(ActionQueue.java:478)\r\n\tat java.util.LinkedHashMap.forEach(LinkedHashMap.java:684)\r\n\tat org.hibernate.engine.spi.ActionQueue.executeActions(ActionQueue.java:475)\r\n\tat org.hibernate.event.internal.AbstractFlushingEventListener.performExecutions(AbstractFlushingEventListener.java:348)\r\n\tat org.hibernate.event.internal.DefaultFlushEventListener.onFlush(DefaultFlushEventListener.java:40)\r\n\tat org.hibernate.event.service.internal.EventListenerGroupImpl.fireEventOnEachListener(EventListenerGroupImpl.java:102)\r\n\tat org.hibernate.internal.SessionImpl.doFlush(SessionImpl.java:1352)\r\n\tat org.hibernate.internal.SessionImpl.managedFlush(SessionImpl.java:443)\r\n\tat org.hibernate.internal.SessionImpl.flushBeforeTransactionCompletion(SessionImpl.java:3202)\r\n\tat org.hibernate.internal.SessionImpl.beforeTransactionCompletion(SessionImpl.java:2370)\r\n\tat org.hibernate.engine.jdbc.internal.JdbcCoordinatorImpl.beforeTransactionCompletion(JdbcCoordinatorImpl.java:447)\r\n\tat org.hibernate.resource.transaction.backend.jdbc.internal.JdbcResourceLocalTransactionCoordinatorImpl.beforeCompletionCallback(JdbcResourceLocalTransactionCoordinatorImpl.java:183)\r\n\tat org.hibernate.resource.transaction.backend.jdbc.internal.JdbcResourceLocalTransactionCoordinatorImpl.access$300(JdbcResourceLocalTransactionCoordinatorImpl.java:40)\r\n\tat org.hibernate.resource.transaction.backend.jdbc.internal.JdbcResourceLocalTransactionCoordinatorImpl$TransactionDriverControlImpl.commit(JdbcResourceLocalTransactionCoordinatorImpl.java:281)\r\n\tat org.hibernate.engine.transaction.internal.TransactionImpl.commit(TransactionImpl.java:101)\r\n\tat org.springframework.orm.jpa.JpaTransactionManager.doCommit(JpaTransactionManager.java:534)\r\n\t... 104 more\r\nCaused by: java.sql.SQLIntegrityConstraintViolationException: Column 'auth_id' cannot be null\r\n\tat com.mysql.cj.jdbc.exceptions.SQLError.createSQLException(SQLError.java:117)\r\n\tat com.mysql.cj.jdbc.exceptions.SQLError.createSQLException(SQLError.java:97)\r\n\tat com.mysql.cj.jdbc.exceptions.SQLExceptionsMapping.translateException(SQLExceptionsMapping.java:122)\r\n\tat com.mysql.cj.jdbc.ClientPreparedStatement.executeInternal(ClientPreparedStatement.java:955)\r\n\tat com.mysql.cj.jdbc.ClientPreparedStatement.executeUpdateInternal(ClientPreparedStatement.java:1094)\r\n\tat com.mysql.cj.jdbc.ClientPreparedStatement.executeUpdateInternal(ClientPreparedStatement.java:1042)\r\n\tat com.mysql.cj.jdbc.ClientPreparedStatement.executeLargeUpdate(ClientPreparedStatement.java:1345)\r\n\tat com.mysql.cj.jdbc.ClientPreparedStatement.executeUpdate(ClientPreparedStatement.java:1027)\r\n\tat com.zaxxer.hikari.pool.ProxyPreparedStatement.executeUpdate(ProxyPreparedStatement.java:61)\r\n\tat com.zaxxer.hikari.pool.HikariProxyPreparedStatement.executeUpdate(HikariProxyPreparedStatement.java)\r\n\tat org.hibernate.engine.jdbc.internal.ResultSetReturnImpl.executeUpdate(ResultSetReturnImpl.java:197)\r\n\t... 125 more\r\n",
  "path" : "/weight/36"