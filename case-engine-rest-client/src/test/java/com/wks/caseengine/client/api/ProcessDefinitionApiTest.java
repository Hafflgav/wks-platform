/*
 * OpenAPI definition
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

package com.wks.caseengine.client.api;

import java.util.List;

import org.junit.Ignore;
import org.junit.Test;

import com.wks.caseengine.client.model.ProcessDefinition;

/**
 * API tests for ProcessDefinitionApi
 */
@Ignore
public class ProcessDefinitionApiTest {

	private final ProcessDefinitionApi api = new ProcessDefinitionApi();

	/**
	 *
	 *
	 *
	 *
	 * @throws ApiException if the Api call fails
	 */
	@Test
	public void find4Test() {
		List<ProcessDefinition> response = api.find4();

		// TODO: test validations
	}

	/**
	 *
	 *
	 *
	 *
	 * @throws ApiException if the Api call fails
	 */
	@Test
	public void get2Test() {
		String processDefinitionId = null;
		String response = api.get2(processDefinitionId);

		// TODO: test validations
	}

	/**
	 *
	 *
	 *
	 *
	 * @throws ApiException if the Api call fails
	 */
	@Test
	public void get3Test() {
		String bpmEngineId = null;
		String processDefinitionId = null;
		String response = api.get3(bpmEngineId, processDefinitionId);

		// TODO: test validations
	}

}
