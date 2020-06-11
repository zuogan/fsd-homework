package com.fsd.stockmarket.security;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;
import lombok.extern.slf4j.Slf4j;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;

@Slf4j
@Component
public class UserAuthenticationEntryPoint implements AuthenticationEntryPoint {

	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException e)
			throws IOException, ServletException {

		log.info("AuthenticationEntryPoint: FOUND 401 Unauthorized");

		/*
		 * This is invoked when user tries to access a secured REST resource without
		 * supplying any credentials We should just send a 401 Unauthorized response
		 * because there is no 'login page' to redirect to
		 */
		response.sendError(UNAUTHORIZED.value(), UNAUTHORIZED.getReasonPhrase());
	}

}
