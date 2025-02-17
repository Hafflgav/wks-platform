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
package com.wks.caseengine.rest.server;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wks.bpm.engine.client.BpmEngineClientFacade;

@RestController
@RequestMapping("deployment")
public class DeploymentController {

	// TODO replace this hard code
	private static final String FILE_NAME_BPMN = "fileName.bpmn";

	@Autowired
	private BpmEngineClientFacade processEngineClient;

	@PostMapping("/")
	public void deploy(@RequestBody String file) throws Exception {
		processEngineClient.deploy(FILE_NAME_BPMN, new String(file.getBytes()));
	}

}
