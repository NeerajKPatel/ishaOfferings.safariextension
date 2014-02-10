/*

Jake Young
Apple Inc.
August 23, 2012

*/

var mainFormId = "mF";
var bodyId = "body";
var opportunityDetailsId = "ODMB"; // Opportunities Details Main Body
var introductionDetailsId = "IntroductionDetailsBody"; // Introductions Details Main Body
var taskDetailsId = "TaskDetailsMainBody"; // Task Details Main Body
var companyDetailsId = "CMDMB"; // Company Details Main Body

// LISTEN FOR A GATHER MESSAGE
safari.self.addEventListener("message", handleMessageEvent, false);

/* UTILITY FUNCTIONS */

var abort = function () {
	return;
}


function checkIfValueExists(id) {
    if(document.getElementById(id)) {
    var instance = document.getElementById(id);
    }

    if (instance.value) { // Test if it is empty...
        return true;
    } else {
        return false;
    }

}

function checkIfSelectValueExists(id) {
    var instance = document.getElementById(id);
    var selectValue = instance.options[instance.selectedIndex].value;

    if (selectValue) { // Test if it is empty...
        return true;
    } else {
        return false;
    }

}

function checkIfCheckboxValueExists(id) {
    var instance = document.getElementById(id);
    var isChecked = instance.checked;

    if (isChecked) { // Test if it is empty...
        return true;
    } else {
        return false;
    }

}

function getCreditCardType(accountNumber)
{

  //start without knowing the credit card type
  var result = "unknown";

  //first check for MasterCard
  if (/^5[1-5]/.test(accountNumber))
  {
    result = "mastercard";
  }

  //then check for Visa
  else if (/^4/.test(accountNumber))
  {
    result = "visa";
  }

  //then check for AmEx
  else if (/^3[47]/.test(accountNumber))
  {
    result = "amex";
  }

  return result;
}

/* VALIDATION OBJECTS */

function ValidationMessageNote(label, content, className) {
	this.label = label || '';
	this.content = content || '';
	this.className = className || '';
	return this;
}

function ValidationMessage(status, content, isRequired, id) {

    this.status = status || 'fail';
    this.content = content || '';
    this.isRequired = isRequired || true;
    this.id = id || '';
    this.notes = [];
    this.addNote = function (ValidationMessageNote) {
    	this.notes.push(ValidationMessageNote);
    }

    return this;
}

var validationKit = {



};


function Validator(type) {


    this.type = type;
    this.messages = [];
   
    this.questions = {
        introduction: {
            hasReceiptAttached: function () { /* Is there a POS receipt. */ },
            hasBeenAssigned: function () { /* Is the intro unassigned? */ },
            hasBeenActioned: function () { /* Has it been assigned and is there an attached task. */ },
            hasNotes: function () { /* Are notes present. */ },
            hasGreatNotes: function () { /* If the notes are present, are they longer than a certain character count (TBD). */ },
            hasNextCallDate: function () { /* A next call date has been scheduled. */ },
            isNotOverdue: function () {},
            hasValidAddress: function () {}
        },
        opportunity: {
    		hasValidContactInfo: function () {},
    		hasValidBillingAddress: function () {},
    		hasValidShippingAddress: function () {},
    		hasValidPaymentInfo: function () {},
    		hasValidTaskList: function () {}
        },
        task: {
            hasNotes: function () {  /* Are notes present. */ },
            hasGreatNotes: function () {  /* If the notes are present, are they longer than a certain character count (TBD). */ },
            hasAppropriateCloseDate: function () { /* Is the close date valid, is it past due?. */ },
            hasBeenAssigned: function () { /* There is an employee assigned to this task. */ }
        },
        company: {
        	hasValidContactInfo: function () { /* Does the primary contact have a complete set of contact info. Phone, Email, Title, and Address */ },
        	hasGreatDiscovery: function () { /* Does the discovery exceed a certain character note. */  },
        	isManagedAccount: function () { /* Is there a SAP number present. */ },
        	hasTermsAccount: function () { /* Is there a SAP number present. */ },
        	hasNextCallDate: function () { /* There is a next call date. */ },
        	hasCallCadence: function () { /* There is an open or scheduled follow up task. */ },
        	deviceProfileIsUnderstood: function () { /* Has the device profile been filled out? */ },
        	byodPoliciesAreUnderstood: function () { /* Something from BYOD is checked. */ }
        }
    };

    this.clearMessages = function () {
        this.messages = [];
    }

    this.addMessage = function (message) {
        this.messages.push(message);
    }

    this.header = function () {
        return this.type;
    }

    this.displayStatus = 'incomplete';

    this.draw = function draw() {

        var opportunityValidationWrapper = document.createElement('div');
        opportunityValidationWrapper.className = 'opportunity-validation-wrapper';

        var validationDialog = document.createElement('div');
        validationDialog.className = 'validation-dialog';

        var messagesToDisplay = this.messages;

        var messageList = document.createElement('ul');

        for (var i = 0; i < messagesToDisplay.length; i++) {
            var message = messagesToDisplay[i];
            console.log(message);
            var listItem = document.createElement('li');

            listItem.className = message.status;
            listItem.innerText = message.content;
            messageList.appendChild(listItem);
        }

        validationDialog.appendChild(messageList);
        opportunityValidationWrapper.appendChild(validationDialog);

        return opportunityValidationWrapper;
    }

    this.render = function render() {

    }
}

function stringIsPresentInElement(id, searchString) {

    if (document.getElementById(id)) {
        var searchItem = document.getElementById(id);
        var searchItemText = searchItem.innerHTML.toString().toLowerCase();

        var searchString = searchString;

        searchIndex = searchItemText.indexOf(searchString.toLowerCase());

        if (searchIndex >= 0) {
            return true;
        } else {
            return false;
        }

    }

}

/* CHALLENGES FOR VALIDATION */

/* CHALLENGES FOR INTRODUCTIONS */



Validator.prototype.firstName = function () {
	// Verify that there is a complete customer name
		// Check first name
		// Check last name
		console.log("This intro has a first name.");
}

Validator.prototype.lastName = function () {
	// Verify that there is a complete customer name
		// Check first name
		// Check last name
}

Validator.prototype.hasFullName = function () {
	// Verify that there is a complete customer name
		// Check first name
		if(this.firstName && this.lastName) {
			return this.firstName() + " " +this.lastName();
		}
		// Check last name
}

var hasBeenAssigned = function () {
	// Check that the Assigned To: is not equal to --Select Assigned To-- 
}

function hasBeenActioned() {
	// You can't have "new" intros
	// Check Status is not equal to "New" from select list
}

Validator.prototype.isNotOverdue = function () {
	var date = new Date();
	// You can't have "new" intros
	// Check Status is not equal to "New" from select list
}

function hasReceiptAttached() {
	// Check that receipt is attached
		// Match store receipt pattern - is it valid?
		// 11 digits, starts with store number
}


/* CHALLENGES FOR TASKS */

/* CHALLENGES FOR COMPANY PROFILE */

/* CHALLENGES FOR OPPORTUNITIES */

function isTaskListEmpty() {

    if (document.getElementById(mainFormId+':'+bodyId+':'+opportunityDetailsId+':assocTasksDataTable')) {

        var taskListText = document.getElementById(mainFormId+':'+bodyId+':'+opportunityDetailsId+':assocTasksDataTable').getElementsByClassName('rich-table-row')[0].innerText.toString(); // Get the Number of Tasks
        var taskListTextIndex = taskListText.indexOf("No Records found ...");
        if (taskListTextIndex != 0) {
            return true;
        } else {
            return false;
        }
    }

}

function isVcertPresent() {

    if (stringIsPresentInElement(mainFormId+':'+bodyId+':'+opportunityDetailsId+':notesDetailsDataTable:tb', 'vCert')) {
        return true;
    } else {
        return false;
    }
}

function hasBeenSentToSSO() {
    var id = mainFormId+':'+bodyId+':'+opportunityDetailsId+':proposalInfoTable:0:proposalStatus';

    if (stringIsPresentInElement(id, 'Sent to SSO') || stringIsPresentInElement(id, 'Order Booked')) {
        return true;
    } else {
        return false;
    }
}

function hasBeenOrderBooked() {
    var id = mainFormId+':'+bodyId+':'+opportunityDetailsId+':proposalInfoTable:0:proposalStatus';

    if (stringIsPresentInElement(id, 'Order Booked')) {
        return true;
    } else {
        return false;
    }
}

function isPoPresentInNotes() {

    if (document.getElementById(mainFormId+':'+bodyId+':'+opportunityDetailsId+':notesDetailsDataTable:tb')) {

        var notesTable = document.getElementById(mainFormId+':'+bodyId+':'+opportunityDetailsId+':notesDetailsDataTable:tb');

        var numberOfAttachedFiles = document.getElementsByClassName('attachment').length;

        var notesText = document.getElementById(mainFormId+':'+bodyId+':'+opportunityDetailsId+':notesDetailsDataTable:tb').innerText.toString().toLowerCase();

    }

    var notesTextIndex = notesText.indexOf("po");


    if ((notesTextIndex >= 0) && (numberOfAttachedFiles >= 1)) {
        return true;
    } else {
        return false;
    }
}

function getShippingAddress() {
	var addressLine1 = document.getElementById(mainFormId+':'+bodyId+':'+opportunityDetailsId+':shippingAddress1Text').value;
	var zipcode = document.getElementById(mainFormId+':'+bodyId+':'+opportunityDetailsId+':shippingZipCodeText').value;
	var city = document.getElementById(mainFormId+':'+bodyId+':'+opportunityDetailsId+':shippingCityText').value;
	
	var fullAddressString = addressLine1 + ", " +city+ ", " +zipcode;
	return fullAddressString;
}

function isShippingAddressValid() {
    // Look at shipping address
    // Check Zipcode
    // Street
    // City
    
    
    if (checkIfValueExists(mainFormId+':'+bodyId+':'+opportunityDetailsId+':shippingCityText') && checkIfValueExists(mainFormId+':'+bodyId+':'+opportunityDetailsId+':shippingZipCodeText') && checkIfValueExists(mainFormId+':'+bodyId+':'+opportunityDetailsId+':shippingAddress1Text')) {
        
        
        
        return true;
    } else {
        return false;
    }
}

function hasCardNumber() {
	var paymentNumberValue = document.getElementById(mainFormId+':'+bodyId+':'+opportunityDetailsId+':creditCardValue').value;
	// Length will be 15-16
	if(paymentNumberValue.length >= 15 && paymentNumberValue.length <= 16) {
		return true;	
	}
}

function hasSAPNumber() {
	// Length will be 4-7
	var paymentNumberValue = document.getElementById(mainFormId+':'+bodyId+':'+opportunityDetailsId+':creditCardValue').value;
	if(paymentNumberValue.length >= 3 && paymentNumberValue.length <= 7) {
		return true;
	}
}


function determineCardOrSAPNumber() {
	var paymentNumberValue = document.getElementById(mainFormId+':'+bodyId+':'+opportunityDetailsId+':creditCardValue').value;
	var response = "No payment.";
	
	if(paymentNumberValue.length != 0) {
		if(hasCardNumber()) {
			response = "CC";
			var type = getCreditCardType(paymentNumberValue);
			console.log(response);	
		}
		if(hasSAPNumber()) {
			response = "SAP";
			console.log(response);
		}
	}
}

function hasPONumber() {
	// Check for value
	return true;
}



function isCTOConfigurationPresentInNotes() {
    var isGHzPresent = stringIsPresentInElement(mainFormId+':'+bodyId+':'+opportunityDetailsId+':externalCommentsText', 'GHz');
    var isRAMPresent = stringIsPresentInElement(mainFormId+':'+bodyId+':'+opportunityDetailsId+':externalCommentsText', 'SDRAM');
    var isIntelPresent = stringIsPresentInElement(mainFormId+':'+bodyId+':'+opportunityDetailsId+':externalCommentsText', 'Intel');

    if (isGHzPresent || isRAMPresent || isIntelPresent) {
        return true;
    } else {
        return false;
    }
}

function isCTOProductPresent() {
    // Look at all MPN
    // Check PartNumbers against ZXXX pattern
    var searchTable = document.getElementById(mainFormId+':'+bodyId+':'+opportunityDetailsId+':manuallyConfiguredProducts') || document.getElementById(mainFormId+':'+bodyId+':'+opportunityDetailsId+':appleStoreProducts');
    var searchText = searchTable.innerHTML.toString();

    searchText.match(/Z(\w{1,3})/);

    var pattern = new RegExp(/\bZ(\w{1,3})\b/i);

    return pattern.test(searchText);
}

function byodStrategyIsUnderstood() {
    if (checkIfCheckboxValueExists(mainFormId+':'+bodyId+':'+companyDetailsId+':deviceDetails:byodMacsAndComputersCheckbox') || checkIfCheckboxValueExists(mainFormId+':'+bodyId+':'+companyDetailsId+':deviceDetails:byodIpadsAndTabletsCheckbox') || checkIfCheckboxValueExists(mainFormId+':'+bodyId+':'+companyDetailsId+':deviceDetails:byodIphonesAndMobilePhonesCheckbox')) {
        return true;
    } else {
        return false;
    }
}

function nonAppleDeviceProfileIsComplete() {
    if (checkIfSelectValueExists(mainFormId+':'+bodyId+':'+companyDetailsId+':deviceDetails:numberOfComputersDropDown') && checkIfSelectValueExists(mainFormId+':'+bodyId+':'+companyDetailsId+':deviceDetails:numberOfTabletsDropDown') && checkIfSelectValueExists(mainFormId+':'+bodyId+':'+companyDetailsId+':deviceDetails:numberOfNonAppleMobilesDropDown')) {
        return true;
    } else {
        return false;
    }
}

function appleDeviceProfileIsComplete() {
    if (checkIfSelectValueExists(mainFormId+':'+bodyId+':'+companyDetailsId+':deviceDetails:numberOfMacsDropDown') && checkIfSelectValueExists(mainFormId+':'+bodyId+':'+companyDetailsId+':deviceDetails:numberOfIPadsDropDown') && checkIfSelectValueExists(mainFormId+':'+bodyId+':'+companyDetailsId+':deviceDetails:numberOfIPhonesDropDown')) {
        return true;
    } else {
        return false;
    }
}

function deviceProfileIsComplete() {
    if (appleDeviceProfileIsComplete() && nonAppleDeviceProfileIsComplete()) {
        return true;
    } else {
        return false;
    }
}

function createMessageFromElement(id, content, isRequired) {
    var status = '';
    var isRequired = isRequired;

    if (!isRequired) {
        status = 'neutral';
    }

    if (checkIfValueExists(id)) {
        status = 'pass';
    } else {
        var message = new ValidationMessage(status, content, isRequired);
    }

    var message = new ValidationMessage(status, content, isRequired);

    return message;
}

function createMessageFromSelectElement(id, content, isRequired) {
    var status = '';
    var isRequired = isRequired;

    if (!isRequired) {
        status = 'neutral';
    }

    if (checkIfSelectValueExists(id)) {
        status = 'pass';
    } else {
        var message = new ValidationMessage(status, content, isRequired);
    }
    var message = new ValidationMessage(status, content, isRequired);
    return message;
}

function createMessageFromChallenge(challenge, content, isRequired) {
    var status = '';
    var isRequired = isRequired;
    var challenge = challenge;

    if (challenge) { // Passed
        status = 'pass';
    }

    if (!challenge) { // Failed
        if (!isRequired) {
            status = 'neutral';
        }
    }

    var message = new ValidationMessage(status, content, isRequired);
    return message;
}





function validateOpportunity() {
    var validator = new Validator("Opportunity");
    validator.addMessage(createMessageFromElement(mainFormId+':'+bodyId+':'+opportunityDetailsId+':opportunityDescriptionText', 'Have a discovery', true));
    validator.addMessage(createMessageFromElement(mainFormId+':'+bodyId+':'+opportunityDetailsId+':estCloseDateText', 'Have an accurate close date', true));
    validator.addMessage(createMessageFromElement(mainFormId+':'+bodyId+':'+opportunityDetailsId+':phoneText', 'Have a phone number', true));
    validator.addMessage(createMessageFromElement(mainFormId+':'+bodyId+':'+opportunityDetailsId+':emailText', 'Have an email', true));
    validator.addMessage(createMessageFromChallenge(isTaskListEmpty(), 'Have completed and scheduled tasks', true));

    validator.addMessage(createMessageFromSelectElement(mainFormId+':'+bodyId+':'+opportunityDetailsId+':paymentTypeText', 'Have a selected form of payment', true));

    validator.addMessage(createMessageFromElement(mainFormId+':'+bodyId+':'+opportunityDetailsId+':creditCardValue', 'Have an Card or SAP Number', false));
    
  
    
    if (hasCardNumber) {
    	var paymentNumberValue = document.getElementById(mainFormId+':'+bodyId+':'+opportunityDetailsId+':creditCardValue').value;var type = getCreditCardType(paymentNumberValue);
    	
    }
    
    
    
    if (hasSAPNumber()) {
	validator.addMessage(createMessageFromElement(mainFormId+':'+bodyId+':'+opportunityDetailsId+':purchaseOrderNumberText', 'Have a PO Number', true));
    	validator.addMessage(createMessageFromChallenge(isPoPresentInNotes(), 'Have a valid PO attached in Notes', true));
    }
    
    
    var shippingAddressMessage = createMessageFromChallenge(isShippingAddressValid(), 'Have a valid shipping address', true);
    
    shippingAddressMessage.id = "shippingAddress";
    
    if(isShippingAddressValid()) {
    	var note = new ValidationMessageNote("Shipping Address:", getShippingAddress());
    	shippingAddressMessage.addNote(note);
    }
    
    
    validator.addMessage(shippingAddressMessage);

    validator.addMessage(createMessageFromChallenge(isVcertPresent(), 'Include vCert in Notes for Tax Exemption', false));
    validator.addMessage(createMessageFromChallenge(isCTOConfigurationPresentInNotes(), 'CTO Configuration in Notes', false));
    validator.addMessage(createMessageFromChallenge(hasBeenSentToSSO(), 'Proposal Status is "Sent To SSO" or "Order Booked"', true));

    return validator;

}

function validateCompanyProfile() {
    // Check company profile integrity
    var validator = new Validator("Company");
    validator.addMessage(createMessageFromElement(mainFormId+':'+bodyId+':'+companyDetailsId+':descriptionTextArea', 'Have a discovery', true));
    validator.addMessage(createMessageFromSelectElement(mainFormId+':'+bodyId+':'+companyDetailsId+':industryDropDown', 'Have an industry type', true));

    validator.addMessage(createMessageFromChallenge(deviceProfileIsComplete(), 'Have a complete device profile', true));

    validator.addMessage(createMessageFromChallenge(byodStrategyIsUnderstood(), 'Understand BYOD Strategy', false));

    validator.addMessage(createMessageFromSelectElement(mainFormId+':'+bodyId+':'+companyDetailsId+':managedBySelectOneMenu', 'Have a preferred contact', true));
    validator.addMessage(createMessageFromSelectElement(mainFormId+':'+bodyId+':'+companyDetailsId+':ratingSelectOneMenu', 'Have a customer rating', true));


    return validator;
}



function validateTask() {
    // Check introduction integrity
    // Check company profile integrity
    var validator = new Validator("Task");
    
    validator.addMessage(createMessageFromElement(mainFormId+':'+bodyId+':'+taskDetailsId+':commentTextArea', 'Have notes', true));
    
    validator.addMessage(createMessageFromElement(mainFormId+':'+bodyId+':'+taskDetailsId+':dueDateInputBox', 'Have an accurate due date', true));
    
    return validator;
    
    
}

function validateIntroduction() {
    // Check introduction integrity
    var validator = new Validator("Introduction");
    
    validator.addMessage(createMessageFromElement(mainFormId+':'+bodyId+':'+introductionDetailsId+':firstNameInputText', 'Have a first name', true));
    validator.addMessage(createMessageFromElement(mainFormId+':'+bodyId+':'+introductionDetailsId+':lastNameInputText', 'Have a last name', true));
    
    validator.addMessage(createMessageFromElement(mainFormId+':'+bodyId+':'+introductionDetailsId+':companyNameInputText', 'Have a company name', true));
    
    validator.addMessage(createMessageFromElement(mainFormId+':'+bodyId+':'+introductionDetailsId+':contactTitleInputText', 'Have a contact title', true));
    
    validator.addMessage(createMessageFromElement(mainFormId+':'+bodyId+':'+introductionDetailsId+':commentTextArea', 'Have a discovery', true));
    
    validator.addMessage(createMessageFromElement(mainFormId+':'+bodyId+':'+introductionDetailsId+':nextCallDateInputText', 'Have a next call date', true));
    validator.addMessage(createMessageFromElement(mainFormId+':'+bodyId+':'+introductionDetailsId+':contactPhoneInputText', 'Have an employee name', true));
    
    validator.addMessage(createMessageFromElement(mainFormId+':'+bodyId+':'+introductionDetailsId+':contactPhoneInputText', 'Have a phone number', true));
    validator.addMessage(createMessageFromElement(mainFormId+':'+bodyId+':'+introductionDetailsId+':contactEmailInputText', 'Have an email address', true));
    
    return validator;
}

function validate() {
    // Check for Type (Task, Intro, Opp, Company Profile)
    // Order Matters, Task Dialogs often appear on top of intros, opp and, company screens


    if (document.getElementById(mainFormId+':'+bodyId+':'+opportunityDetailsId+':detailsResultDiv')) {
        var validator = validateOpportunity();
        return validator;
    }

    // Check for Company
    else if (document.getElementById('detailsOfCompany')) {
        var validator = validateCompanyProfile();
        return validator;
    }
    
    else if (document.getElementById(mainFormId+':'+bodyId+':'+introductionDetailsId+':topHeaderIntroductionDtails')) {
        var validator = validateIntroduction();
        return validator;
    }
    
    else if(document.getElementById('detailsOfTask') || document.getElementById('dialog_newtask')) {
    	var validator = validateTask();
    	return validator;
    } else {
        return;
    }

}



function handleMessageEvent(event) {
    if (event.name !== "gatherValidationInfo") // Escape if its any other command
    return;

    var validator = validate();

    if (validator) {
        // Send the information back up to the Application layer.
        safari.self.tab.dispatchMessage("validationReport", validator);
    } else {
        //alert("Nothing to validate.");
    }
}

//var validator = validate();
//safari.self.tab.dispatchMessage("validationReportUpdate", validator);

//GET ALL THE INFO
//RETURN THE VALIDATION OBJECT
//
//SEND THE VALIDATION INFO BACK TO THE APPLICATION LAYER