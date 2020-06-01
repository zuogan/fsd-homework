package com.fsd.stockmarket.controller;

import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.HttpStatus.OK;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import com.fsd.stockmarket.pojo.AuthRequest;
import com.fsd.stockmarket.pojo.AuthResponse;
import com.fsd.stockmarket.pojo.Result;
import com.fsd.stockmarket.utils.JwtTokenUtil;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class AuthController {

	@Autowired
	private UserDetailsService userDetailsService;
	@Autowired
	private AuthenticationManager authenticationManager;

	@PostMapping("/login")
	public Result<AuthResponse> login(@RequestBody AuthRequest request) throws Exception {

		log.info("**** /login run");
		Authentication authentication = authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		
		// Reload password post-security so we can generate token
		UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());

		String jwtToken = JwtTokenUtil.generateToken(userDetails, false);
		log.info("jwtToken >>>>" + jwtToken);

		AuthResponse authResponse = new AuthResponse();
		// authResponse.setUsername(request.getUsername());
		authResponse.setUsername(userDetails.getUsername());
		@SuppressWarnings("unchecked")
		Set<GrantedAuthority> authorities = (Set<GrantedAuthority>) userDetails.getAuthorities();
		authResponse.setUsertype(authorities.toArray()[0].toString());
		authResponse.setJwtToken(jwtToken);
		authResponse.setHeader(jwtToken);
		//authResponse.setHeader("jwttoken", JwtTokenUtil.TOKEN_PREFIX + jwtToken);

		// return ResponseEntity.ok().header("JWT-Token", jwtToken).body(new
		// ResponseBean(OK.value(), OK.getReasonPhrase()).data(authResponse));
		// return ResponseEntity.ok().header("JWT-Token", jwtToken);
		
		return new Result<AuthResponse>(authResponse, "Login successfully", OK.value());
	}

	// use for test
	@RequestMapping(value = "/authenticated", method = RequestMethod.GET)
	@ResponseBody
	public Result<String> authenticated() throws Exception {
		return new Result<String>("AUTHENTICATED - hasToken VERIFIED");
	}

	// use for test
	@RequestMapping(value = "/admin", method = RequestMethod.GET)
	@ResponseBody
	public Result<String> isAdmin() throws Exception {
		return new Result<String>("AUTHENTICATED - isAdmin VERIFIED");
	}

	@ExceptionHandler(AuthenticationException.class)
	@ResponseStatus(UNAUTHORIZED)
	public Result<String> handleAuthentication401Exception(AuthenticationException exception)
			throws Exception {
		return new Result<String>(exception.getMessage(), UNAUTHORIZED.value());
	}

	/* @ExceptionHandler(AuthenticationException.class) */
	@ResponseStatus(FORBIDDEN)
	public Result<String> handleAuthentication403Exception(AuthenticationException exception)
			throws Exception {
		return new Result<String>(exception.getMessage(), FORBIDDEN.value());
	}

}
