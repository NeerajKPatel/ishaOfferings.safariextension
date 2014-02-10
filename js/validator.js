function ValidationMessage(status, content, isRequired) {
	
	this.status = status || 'fail';
	this.content = content || '';
	this.isRequired = isRequired || true;
	
	return this;
}


function Validator(type) {
	this.type = type;
	this.messages = [];
	this.displayStatus = function () {
		return "incomplete";
	};
	
	this.clearMessages = function () {
		this.messages = [];
	}
	
	this.addMessage = function (message) {
		this.messages.push(message);
	}
	
	this.draw = function () {
		
		var opportunityValidationWrapper = document.createElement('div');
		opportunityValidationWrapper.className = 'opportunity-validation-wrapper';
		
		var validationDialog = document.createElement('div');
		validationDialog.className = 'validation-dialog';
		
		var messagesToDisplay = this.messages;
		
		var messageList = document.createElement('ul');
		
		for (var i = 0; i < messagesToDisplay.length; i++) {
			var message = messagesToDisplay[i];
			var listItem = document.createElement('li');
			listItem.className = message.status;
			listItem.innerText = message.content;
			messageList.appendChild(listItem);
		}
		
		
		validationDialog.appendChild(messageList);
		opportunityValidationWrapper.appendChild(validationDialog);
		
		return opportunityValidationWrapper;
	}
	
	this.display = function () {
		console.log(this.messages);
	}
}

function isTaskListIsEmpty() {
	
	if(document.getElementById('mainForm:body:OpportunityDetailsMainBody:assocTasksDataTable')) {
	
	var taskList = document.getElementById('mainForm:body:OpportunityDetailsMainBody:assocTasksDataTable').getElementsByClassName('rich-table-row'); // Get the Number of Tasks
		if (taskList.length > 0) {
			return false;
		}
		
		else {
			return true;
		}
	}
	
}




function checkIfValueExists(id) {
	var instance = document.getElementById(id);
	
	if(instance.value) { // Test if it is empty...
		return true;
	}
	else {
		return false;
	}

}

function createMessageFromElement(id, content, isRequired) {
	var status = '';
	
	if(checkIfValueExists(id)) {
		status = 'pass';
	}
	else {
		var message = new ValidationMessage(status, content, isRequired);
	}
	
	var message = new ValidationMessage(status, content, isRequired);
	
	return message;
}

function validateOpportunity() {
	var validator = new Validator("Opportunity");
	validator.addMessage(createMessageFromElement('mainForm:body:OpportunityDetailsMainBody:phoneText', 'Have a phone number', true));	
	validator.addMessage(createMessageFromElement('mainForm:body:OpportunityDetailsMainBody:emailText', 'Have an email', true));	
	validator.addMessage(createMessageFromElement('mainForm:body:OpportunityDetailsMainBody:opportunityDescriptionText', 'Have a discovery', true));
	validator.addMessage(createMessageFromElement('mainForm:body:OpportunityDetailsMainBody:creditCardValue', 'Have an Card or SAP Number', true));
	validator.addMessage(createMessageFromElement('mainForm:body:OpportunityDetailsMainBody:purchaseOrderNumberText', 'Have a PO Number', true));
	
	if(isTaskListIsEmpty()) {
		var taskListMessage = new ValidationMessage('fail','Have completed and scheduled tasks', true);
		validator.addMessage(taskListMessage);
	}
	else {
		var taskListMessage = new ValidationMessage('pass','Have completed and scheduled tasks', true);
		validator.addMessage(taskListMessage);
	}
	
	validator.display();
	console.log(validator.draw());
}

function validate() {
	// Check for Type (Task, Intro, Opp, Company Profile)
	
	// Check for Description
	validateOpportunity();

}

validate();