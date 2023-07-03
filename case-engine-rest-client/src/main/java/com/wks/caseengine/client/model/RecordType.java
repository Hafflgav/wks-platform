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

package com.wks.caseengine.client.model;

import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

/**
 * RecordType
 */
@JsonPropertyOrder({ RecordType.JSON_PROPERTY_ID, RecordType.JSON_PROPERTY_FIELDS })
@javax.annotation.Generated(value = "org.openapitools.codegen.languages.JavaClientCodegen", date = "2023-05-26T12:12:09.236578+01:00[Europe/Dublin]")
public class RecordType {
	public static final String JSON_PROPERTY_ID = "id";
	private String id;

	public static final String JSON_PROPERTY_FIELDS = "fields";
	private JsonObject fields;

	public RecordType() {
	}

	public RecordType id(String id) {

		this.id = id;
		return this;
	}

	/**
	 * Get id
	 *
	 * @return id
	 **/
	@javax.annotation.Nullable
	@JsonProperty(JSON_PROPERTY_ID)
	@JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

	public String getId() {
		return id;
	}

	@JsonProperty(JSON_PROPERTY_ID)
	@JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)
	public void setId(String id) {
		this.id = id;
	}

	public RecordType fields(JsonObject fields) {

		this.fields = fields;
		return this;
	}

	/**
	 * Get fields
	 *
	 * @return fields
	 **/
	@javax.annotation.Nullable
	@JsonProperty(JSON_PROPERTY_FIELDS)
	@JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)

	public JsonObject getFields() {
		return fields;
	}

	@JsonProperty(JSON_PROPERTY_FIELDS)
	@JsonInclude(value = JsonInclude.Include.USE_DEFAULTS)
	public void setFields(JsonObject fields) {
		this.fields = fields;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (o == null || getClass() != o.getClass()) {
			return false;
		}
		RecordType recordType = (RecordType) o;
		return Objects.equals(this.id, recordType.id) && Objects.equals(this.fields, recordType.fields);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, fields);
	}

	@Override
	public String toString() {
		StringBuilder sb = new StringBuilder();
		sb.append("class RecordType {\n");
		sb.append("    id: ").append(toIndentedString(id)).append("\n");
		sb.append("    fields: ").append(toIndentedString(fields)).append("\n");
		sb.append("}");
		return sb.toString();
	}

	/**
	 * Convert the given object to string with each line indented by 4 spaces
	 * (except the first line).
	 */
	private String toIndentedString(Object o) {
		if (o == null) {
			return "null";
		}
		return o.toString().replace("\n", "\n    ");
	}

}
