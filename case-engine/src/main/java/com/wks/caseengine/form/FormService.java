package com.wks.caseengine.form;

import java.util.List;

public interface FormService {

	void save(final Form form) throws Exception;

	Form getForm(final String formKey) throws Exception;

	List<Form> find() throws Exception;

	void delete(final String formKey) throws Exception;

}
