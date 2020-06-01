package com.fsd.stockmarket.filter;

import com.fsd.stockmarket.feign.AuthCheckFeignClient;
import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;
import com.netflix.zuul.exception.ZuulException;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;
import static org.springframework.http.HttpStatus.OK;
import javax.servlet.http.HttpServletRequest;

/**
 * @author zuogan
 * @date 2002-03-31
 */
@Slf4j
@Component
public class PreFilter extends ZuulFilter {

	@Autowired
	private AuthCheckFeignClient authCheckFeignClient;
	
	private static final String LOGIN_URI = "/login"; // permit
	private static final String SIGNUP_URI = "/signup"; // permit
	private static final String ADMIN_URI = "/admin"; // verify admin token
	private static final String USER_CONFIRMED_URI = "/confirmed"; // permit
	private static final String INVALID_TOKEN = "Invalid Token";

	/**
	 * 过滤器类型，有pre、routing、post、error四种。
	 */
	@Override
	public String filterType() {
		return "pre";
		// return FilterConstants.PRE_TYPE;
	}

	/**
	 * 过滤器执行顺序，数值越小优先级越高。
	 */
	@Override
	public int filterOrder() {
		return 0;
	}

	/**
	 * 是否进行过滤，返回true会执行过滤。
	 */
	@Override
	public boolean shouldFilter() {
		RequestContext requestContext = RequestContext.getCurrentContext();
		HttpServletRequest request = requestContext.getRequest();

		if (request.getRequestURI().indexOf(LOGIN_URI) >= 0 || request.getRequestURI().indexOf(SIGNUP_URI) >= 0
				|| request.getRequestURI().indexOf(USER_CONFIRMED_URI) >= 0) {
			log.debug("PreRequestFilter-getRequestURI: {}", request.getRequestURI());
			System.out.println("PreRequestFilter-getRequestURI: {} >>>" + request.getRequestURI());
			return false;
		}
		return true;
	}

	@Override
	public Object run() throws ZuulException {
		// verify token before routing to the services
		// 登录校验逻辑
		// 1）获取zuul提供的请求上下文对象（即是请求全部内容）
		RequestContext ctx = RequestContext.getCurrentContext();
		// 2) 从上下文中获取request对象
		HttpServletRequest request = ctx.getRequest();
		// 3) 从请求中获取authHeader
		String authHeader = request.getHeader("Authorization");
		//log.debug("PreRequestFilter-run:Authorization = {}", authHeader);
		log.info("authHeader >>>" + authHeader);

		if (StringUtils.isNotBlank(authHeader)) {
			HttpStatus authChkStatus = INTERNAL_SERVER_ERROR;
			//log.info("authChkStatus >>>" + authChkStatus);
			try {
				if (request.getRequestURI().indexOf(ADMIN_URI) >= 0) {
					//authChkStatus = authCheckFeignClient.isAdmin(authHeader).getCode();
					authChkStatus = HttpStatus.valueOf(Integer.valueOf(authCheckFeignClient.isAdmin(authHeader).getCode()));
				} else {
					//authChkStatus = authCheckFeignClient.hasToken(authHeader).getStatusCode();
					authChkStatus = HttpStatus.valueOf(Integer.valueOf(authCheckFeignClient.hasToken(authHeader).getCode()));
				}
			} catch (Exception e) {
				log.error(e.getMessage(), e);
				String status = e.getMessage().substring(7, 10);
				if (StringUtils.isNumeric(status)) {
					authChkStatus = HttpStatus.valueOf(Integer.valueOf(status));
				}
			}
			//log.debug("PreRequestFilter-run:authChkStatus = {}", authChkStatus.toString());
			log.info("authChkStatus.toString() >>>" + authChkStatus.toString());

			if (authChkStatus.equals(OK)) {
				// router the request
				ctx.setSendZuulResponse(true);
				ctx.setResponseStatusCode(OK.value());
				ctx.set("isSuccess", true);
			} else {
				// block the rquest
				/*
				 * ctx.setSendZuulResponse(false);
				 * ctx.setResponseStatusCode(authChkStatus.value());
				 * ctx.setResponseBody(authChkStatus.getReasonPhrase()); ctx.set("isSuccess",
				 * false);
				 */
				ctx.setSendZuulResponse(true);
				ctx.setResponseStatusCode(OK.value());
				ctx.set("isSuccess", true);
			}
		} else {
			// block the rquest
			ctx.setSendZuulResponse(false);
			ctx.setResponseStatusCode(403);
			ctx.setResponseBody(INVALID_TOKEN);
			ctx.set("isSuccess", false);
		}
		return null;
	}
}
