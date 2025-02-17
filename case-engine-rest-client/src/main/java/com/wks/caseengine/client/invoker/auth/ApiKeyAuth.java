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
package com.wks.caseengine.client.invoker.auth;

import org.springframework.http.HttpHeaders;
import org.springframework.util.MultiValueMap;

@javax.annotation.Generated(value = "org.openapitools.codegen.languages.JavaClientCodegen", date = "2023-05-26T12:12:09.236578+01:00[Europe/Dublin]")
public class ApiKeyAuth implements Authentication {
	private final String location;
	private final String paramName;

	private String apiKey;
	private String apiKeyPrefix;

	public ApiKeyAuth(String location, String paramName) {
		this.location = location;
		this.paramName = paramName;
	}

	public String getLocation() {
		return location;
	}

	public String getParamName() {
		return paramName;
	}

	public String getApiKey() {
		return apiKey;
	}

	public void setApiKey(String apiKey) {
		this.apiKey = apiKey;
	}

	public String getApiKeyPrefix() {
		return apiKeyPrefix;
	}

	public void setApiKeyPrefix(String apiKeyPrefix) {
		this.apiKeyPrefix = apiKeyPrefix;
	}

	@Override
	public void applyToParams(MultiValueMap<String, String> queryParams, HttpHeaders headerParams,
			MultiValueMap<String, String> cookieParams) {
		if (apiKey == null) {
			return;
		}
		String value;
		if (apiKeyPrefix != null) {
			value = apiKeyPrefix + " " + apiKey;
		} else {
			value = apiKey;
		}
		if (location.equals("query")) {
			queryParams.add(paramName, value);
		} else if (location.equals("header")) {
			headerParams.add(paramName, value);
		} else if (location.equals("cookie")) {
			cookieParams.add(paramName, value);
		}
	}
}
