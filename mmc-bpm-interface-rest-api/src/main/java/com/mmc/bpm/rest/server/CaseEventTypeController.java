package com.mmc.bpm.rest.server;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.mmc.bpm.client.cases.definition.event.CaseEventType;
import com.mmc.bpm.json.EnumAdapterFactory;

@RestController
public class CaseEventTypeController {

	@GetMapping(value = "case-event-type")
	public JsonArray find() {

		GsonBuilder builder = new GsonBuilder();
		builder.registerTypeAdapterFactory(new EnumAdapterFactory());
		Gson gson = builder.create();
		return gson.fromJson(gson.toJson(CaseEventType.values()), JsonArray.class);
	}

}
