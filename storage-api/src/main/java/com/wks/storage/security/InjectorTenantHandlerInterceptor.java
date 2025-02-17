/*
 * WKS Platform - Open-Source Project
 * 
 * This file is part of the WKS Platform, an open-source project developed by WKS Power.
 * 
 * WKS Platform is licensed under the MIT License.
 * 
 * © 2021 WKS Power. All rights reserved.
 * 
 * For licensing information, see the LICENSE file in the root directory of the project.
 */
package com.wks.storage.security;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import com.wks.api.security.BearerTokenHandlerInputResolver;
import com.wks.api.security.context.SecurityContextTenantHolder;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class InjectorTenantHandlerInterceptor implements HandlerInterceptor {

	@Autowired
	private SecurityContextTenantHolder tenantHolder;

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		setTenantId(request, tenantHolder);
		return true;
	}

	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler,
			@Nullable Exception ex) throws Exception {
		tenantHolder.clear();
	}

	private void setTenantId(HttpServletRequest request, SecurityContextTenantHolder tenantHolder) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

		BearerTokenHandlerInputResolver handler = new BearerTokenHandlerInputResolver();

		Map<String, Object> params = handler.resolver(request, authentication);
		if (params.isEmpty()) {
			return;
		}

		String tenantId = (String) params.get("org");
		if (tenantId == null || tenantId.isBlank()) {
			log.warn("Could't find tenantId by subdomain, it was expected to be filled but it is empty {}", tenantId);
		}

		tenantHolder.setTenantId(tenantId);
	}

}
