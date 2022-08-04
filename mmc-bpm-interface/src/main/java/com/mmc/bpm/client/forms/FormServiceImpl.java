package com.mmc.bpm.client.forms;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.mmc.bpm.engine.camunda.client.ProcessEngineClient;
import com.mmc.bpm.engine.model.spi.CamundaForm;

@Component
public class FormServiceImpl implements FormService {

	@Autowired
	private ProcessEngineClient processEngineClient;

	@Override
	public CamundaForm getTaskForm(String taskId) {
		return processEngineClient.getTaskForm(taskId);
	}

}
