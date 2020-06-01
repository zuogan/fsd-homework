package com.fsd.stockmarket.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import com.fsd.stockmarket.entity.User;
import com.fsd.stockmarket.repository.UserRepository;
import com.fsd.stockmarket.utils.JwtTokenUtil;
import io.jsonwebtoken.Claims;
import lombok.extern.slf4j.Slf4j;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
public class JWTAuthenticationFilter extends OncePerRequestFilter {

  @Autowired
  private UserDetailsService userDetailsService;
  @Autowired
  private UserRepository userRepository;

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {
    String authToken = request.getHeader(JwtTokenUtil.TOKEN_HEADER);
    if (authToken != null && authToken.startsWith(JwtTokenUtil.TOKEN_PREFIX)) {
      authToken = authToken.substring(JwtTokenUtil.TOKEN_PREFIX.length());
      if (authToken.equals("null")) {
	      filterChain.doFilter(request, response);
	      return;
	    }
      log.info("JWTAuthenticationFilter - authTokenHeader = {}", authToken);
    } else {
      authToken = request.getParameter("JWT-Tonken");
      log.info("JWTAuthenticationFilter - authTokenParams = {}" + authToken);

      if (authToken == null) {
        filterChain.doFilter(request, response);
        return;
      }
    }

    try {
      String username = JwtTokenUtil.getUsername(authToken); // if token invalid, will get exception here
      
      // add start
      Claims claims = JwtTokenUtil.getTokenBody(authToken);
      if(claims == null ){
      	filterChain.doFilter(request, response);
      	return;
      }else{
    	  //UserInfo user = userService.getUserByUsername(username);
    	  User user = userRepository.findByUsername(username);
          //if(JwtTokenUtil.isTokenExpired(claims.getExpiration(), user.getUpdatets(), claims.getIssuedAt())){
    	  if(JwtTokenUtil.isTokenExpired(claims.getExpiration(), null, claims.getIssuedAt())){
          	filterChain.doFilter(request, response); 
          	return;
          }
      }
      // add end

      if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
    	  log.info("JWTAuthenticationFilter: checking authentication for user = {}", username);
    	  UserDetails userDetails = userDetailsService.loadUserByUsername(username);
    	  if (JwtTokenUtil.validateToken(authToken, userDetails)) {
    		  UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails.getUsername(), "N/A",                                                                                        userDetails.getAuthorities());
    		  authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
    		  SecurityContextHolder.getContext().setAuthentication(authentication);
    	  }
      }
    } catch (Exception e) {
     logger.debug("JWTAuthenticationFilter:Exception");
     logger.error(e.getMessage(), e);
    }

    filterChain.doFilter(request, response);
  }

}
