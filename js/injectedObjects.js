if (window.top === window) {

function printObject(object) {
    var output = '';
    for (property in object) {
        output += property + ':' + object[property] + '\n';
    }
    console.log(output);
}

function displayObject(object) {
    var output = '';
    for (property in object) {
        output += property + ':' + object[property] + '\n';
    }
    return output;
}

function listPropertiesForObject(object) {
    var output = '<ul>';
    for (property in object) {
        output += '<li>'+property + ':' + object[property] + '</li>';
    }
    output += '</ul>';
    return output;
}

function Introduction(id, firstName, lastName, phone, email, address, employee, description, dateCreated, companyName, receiptNumber) {
    this.id = id || '';
    this.firstName = firstName || '';
    this.lastName = lastName || '';
    this.phone = phone || '';
    this.email = email || '';
    this.address = address || new Address();
    this.employee = employee || '';
    this.description = description || '';
    this.dateCreated = dateCreated || new Date();
    this.companyName = companyName || '';
    this.receiptNumber = receiptNumber || '';
}

function Company(id, name, spend, totalSpend, description, sapNumber, referredBy, userTerritory, numEmployees, industryType) {
    this.id = id || '';
    this.name = name || '';
    this.spend = spend || 0;
    this.totalSpend = totalSpend || 0;
    this.description = description || '';
    this.sapNumber = sapNumber || '';
    this.referredBy = referredBy || '';
    this.userTerritory = userTerritory || '';
    this.numEmployees = numEmployees || '';
    this.industryType = industryType || '';
}

function Task(type, contact, company, description) {
    this.type = type || '';
    this.contact = contact || new Contact();
    this.company = company || new Company();
    this.description = description || '';
}

function Opportunity(id, name, company, amount, contact, discovery, salesRep, userTerritory, closeDate, estShipDate, shippingAddress, billingAddress) {
    this.id = id || '';
    this.name = name || '';
    this.company = company || new Company();
    this.amount = amount || '';
    this.contact = contact || new Contact();
    this.salesRep = salesRep || '';
    this.userTerritory = userTerritory || '';
    this.closeDate = closeDate || new Date();
    this.estShipDate = estShipDate || new Date();
    this.shippingAddress = shippingAddress || new Address();
    this.billingAddress = billingAddress || new Address();
}
/* Primitive Business Types */
function Address(line1, line2, line3, city, state, zipcode, country) {
    this.line1 = line1 || '';
    this.line2 = line2 || '';
    this.line3 = line3 || '';
    this.city = city || '';
    this.state = state || '';
    this.zipcode = zipcode || '';
    this.country = country || '';
}

function Email(to, from, cc, bcc, subject, body, header) {
    this.to = to || '';
    this.from = from || '';
    this.cc = cc || '';
    this.bcc = bcc || '';
    this.subject = subject || '';
    this.body = body || '';
}

function Contact(id, firstName, lastName, phone, email, address, company) {
    this.id = id || '';
    this.firstName = firstName || '';
    this.lastName = lastName || '';
    this.phone = phone || '';
    this.email = email || '';
    this.company = company || new Company();
}



/* GET DATA FUNCTIONS */

function getIntroductionData() { // Create Introduction Object
    var introduction = new Introduction();
    var address = new Address();
    introduction.firstName = document.getElementById('mainForm:body:IntroductionDetailsBody:firstNameInputText').value;
    introduction.lastName = document.getElementById('mainForm:body:IntroductionDetailsBody:lastNameInputText').value;
    introduction.employee = document.getElementById('mainForm:body:IntroductionDetailsBody:employeeNameInputText').value;
    introduction.description = document.getElementById('mainForm:body:IntroductionDetailsBody:commentTextArea').innerHTML;
    introduction.dateCreated = document.getElementById('mainForm:body:IntroductionDetailsBody:dateCreatedText').innerHTML;
    introduction.companyName = document.getElementById('mainForm:body:IntroductionDetailsBody:companyNameInputText').value;
    introduction.phone = document.getElementById('mainForm:body:IntroductionDetailsBody:contactPhoneInputText').value;
    introduction.email = document.getElementById('mainForm:body:IntroductionDetailsBody:contactEmailInputText').value;
    introduction.companyName = document.getElementById('mainForm:body:IntroductionDetailsBody:companyNameInputText').value;
    introduction.receiptNumber = document.getElementById('mainForm:body:IntroductionDetailsBody:posNumberInputText').value;
    address.line1 = document.getElementById('mainForm:body:IntroductionDetailsBody:addressDataTable:0:addressDetailsAddressInputBox').value;
    address.line3 = document.getElementById('mainForm:body:IntroductionDetailsBody:addressDataTable:0:addressDetailsSuiteFloorInputBox').value;
    address.city = document.getElementById('mainForm:body:IntroductionDetailsBody:addressDataTable:0:addressDetailsCityInputBox').value;
    var stateList = document.getElementById('mainForm:body:IntroductionDetailsBody:addressDataTable:0:addressDetailsCountrySelectMenu');
    address.state = stateList[stateList.selectedIndex].innerText;
    address.zipcode = document.getElementById('mainForm:body:IntroductionDetailsBody:addressDataTable:0:addressDetailsZipInputBox').value;
    introduction.address = address;
    //return introduction;
    //printObject(introduction);
    return introduction;
}

function getTaskData() {
    var task = new Task();
    var contact = new Contact();
    var company = new Company();
    //var company = new Company();
    // Test for Elements in an Task Dialog
    contact.firstName = document.getElementById('mainForm:body:TaskDetailsMainBody:contactFirstNameInputBox').value; // Value
    contact.lastName = document.getElementById('mainForm:body:TaskDetailsMainBody:contactLastNameInputBox').value; // Value
    contact.email = document.getElementById('mainForm:body:TaskDetailsMainBody:contactEmailInputBox').value; // Value
    contact.phone = document.getElementById('mainForm:body:TaskDetailsMainBody:contactPhoneInputBox').value; // Value
    company.name = document.getElementById('mainForm:body:TaskDetailsMainBody:companyNameCommandLink').innerHTML; // Value
    task.comments = document.getElementById('mainForm:body:TaskDetailsMainBody:commentTextArea').innerHTML;
    var taskTypeMenu = document.getElementById('mainForm:body:TaskDetailsMainBody:taskTypeDropDown');
    task.type = taskTypeMenu[taskTypeMenu.selectedIndex].innerHTML;
    task.company = company;
    task.contact = contact;
    //task.company = company;
    return task;
}

function getOpportunityData() {
    // Get Data from Opportunity Page
    var opportunity = new Opportunity();
    var contact = new Contact();
    var company = new Company();
    var shippingAddress = new Address();
    var billingAddress = new Address();
    contact.firstName = document.getElementById('mainForm:body:OpportunityDetailsMainBody:contactFirstText').value; // Value
    contact.lastName = document.getElementById('mainForm:body:OpportunityDetailsMainBody:contactLastText').value; // Value
    contact.email = document.getElementById('mainForm:body:OpportunityDetailsMainBody:emailText').value; // Value
    contact.phone = document.getElementById('mainForm:body:OpportunityDetailsMainBody:phoneText').value; // Value
    company.name = document.getElementById('mainForm:body:OpportunityDetailsMainBody:companyNameCommandLink').innerHTML;
    // shippingAddress = mainForm:body:OpportunityDetailsMainBody:shippingAddress1Text;
    billingAddress.line1 = document.getElementById('mainForm:body:OpportunityDetailsMainBody:billingAddress1Text').value;
    billingAddress.line2 = document.getElementById('mainForm:body:OpportunityDetailsMainBody:billingAddress2Text').value;
    billingAddress.city = document.getElementById('mainForm:body:OpportunityDetailsMainBody:billingCityText').value;
    billingAddress.state = document.getElementById('mainForm:body:OpportunityDetailsMainBody:billingStateText').value;
    billingAddress.zipcode = document.getElementById('mainForm:body:OpportunityDetailsMainBody:billingZipCodeText').value;
    billingAddress.country = document.getElementById('mainForm:body:OpportunityDetailsMainBody:billingCountryText').value;
    shippingAddress.line1 = document.getElementById('mainForm:body:OpportunityDetailsMainBody:shippingAddress1Text').value;
    shippingAddress.line2 = document.getElementById('mainForm:body:OpportunityDetailsMainBody:shippingAddress2Text').value;
    shippingAddress.city = document.getElementById('mainForm:body:OpportunityDetailsMainBody:billingCityText').value;
    shippingAddress.state = document.getElementById('mainForm:body:OpportunityDetailsMainBody:shippingStateText').value;
    shippingAddress.zipcode = document.getElementById('mainForm:body:OpportunityDetailsMainBody:shippingZipCodeText').value;
    shippingAddress.country = document.getElementById('mainForm:body:OpportunityDetailsMainBody:shippingCountryText').value;
    var salesRepMenu = document.getElementById('mainForm:body:OpportunityDetailsMainBody:salesRepText');
    opportunity.salesRep = salesRepMenu[salesRepMenu.selectedIndex].innerHTML;
    opportunity.id = document.getElementById('mainForm:body:OpportunityDetailsMainBody:opportunityIDText').innerHTML;
    opportunity.name = document.getElementById('mainForm:body:OpportunityDetailsMainBody:opportunityNameText').value; // Value
    opportunity.closeDate = document.getElementById('mainForm:body:OpportunityDetailsMainBody:estCloseDateText').value; // Value
    opportunity.estShipDate = document.getElementById('mainForm:body:OpportunityDetailsMainBody:estShipDateText').value; // Value
    opportunity.amount = document.getElementById('mainForm:body:OpportunityDetailsMainBody:estimatedTotalUSDText').value; // Value
    opportunity.description = document.getElementById('mainForm:body:OpportunityDetailsMainBody:opportunityDescriptionText').innerHTML;
    opportunity.billingAddress = billingAddress;
    opportunity.shippingAddress = shippingAddress;
    opportunity.contact = contact;
    opportunity.company = company;
    return opportunity;
}

function getCompanyData(msgEvent) {
    // Get Data from Opportunity Page
    var company = new Company();
    address = new Address();
    company.id = document.getElementById('mainForm:body:CompanyDetailsMainBody:companyIDText').innerHTML; // Value
    company.name = document.getElementById('mainForm:body:CompanyDetailsMainBody:companyNameInputText').value; // Value
    company.description = document.getElementById('mainForm:body:CompanyDetailsMainBody:descriptionTextArea').innerHTML;
    company.spend = document.getElementById('mainForm:body:CompanyDetailsMainBody:companytwelevePurchaseTotalCompanyText').innerHTML;
    company.totalSpend = document.getElementById('mainForm:body:CompanyDetailsMainBody:companyPurchaseTotalCompanyText').innerHTML;
    company.sapNumber = document.getElementById('mainForm:body:CompanyDetailsMainBody:sapTitleInputText').value;
    company.referredBy = document.getElementById('mainForm:body:CompanyDetailsMainBody:referredByInputText').value;
    var userTerritoryMenu = document.getElementById('mainForm:body:CompanyDetailsMainBody:territoryIdDropDown');
    company.userTerritory = userTerritoryMenu[userTerritoryMenu.selectedIndex].innerHTML;
    var noOfEmployeesMenu = document.getElementById('mainForm:body:CompanyDetailsMainBody:noOfEmployeesSelectOneMenu');
    company.numEmployees = noOfEmployeesMenu[noOfEmployeesMenu.selectedIndex].innerHTML;
    var industryDropDownMenu = document.getElementById('mainForm:body:CompanyDetailsMainBody:industryDropDown');
    company.industryType = industryDropDownMenu[industryDropDownMenu.selectedIndex].innerHTML;
    if (company.sapNumber === '0' || company.sapNumber === 'null') {
        company.sapNumber = 'No SAP Number On File';
    }
    return company;
}

function getContactData() {
    // Get Data from Contact Profile
    var contact = new Contact();
    var company = new Company();
    var contactAddress = new Address();
    var companyAddress = new Address();
    contact.firstName = document.getElementById('mainForm:body:ContactDetailsMainBody:firstNameInputText').value; // Value
    contact.lastName = document.getElementById('mainForm:body:ContactDetailsMainBody:lastNameInputText').value; // Value
    phoneAreaCode = document.getElementById('mainForm:body:ContactDetailsMainBody:phoneDetails:phoneDataTable:0:phoneAreaCode').value; // Value
    phoneNumber = document.getElementById('mainForm:body:ContactDetailsMainBody:phoneDetails:phoneDataTable:0:phoneBase').value; // Value
    contact.phone = phoneAreaCode + phoneNumber;
    contact.email = document.getElementById('mainForm:body:ContactDetailsMainBody:emailDetails:emailDataTable:0:emailDetailsAddressInputBox').value; // Value
    contact.id = document.getElementById('mainForm:body:ContactDetailsMainBody:dsIdOutputBox').innerHTML; // Value
    companyAddress.line1 = document.getElementById('mainForm:body:ContactDetailsMainBody:assocCompaniesDataTable:0:assocCompaniesAddress').innerHTML;
    companyAddress.city = document.getElementById('mainForm:body:ContactDetailsMainBody:assocCompaniesDataTable:0:assocCompaniesCityOutputBox').innerHTML;
    companyAddress.state = document.getElementById('mainForm:body:ContactDetailsMainBody:assocCompaniesDataTable:0:assocCompaniesStateOutputBox').innerHTML;
    companyAddress.zipcode = document.getElementById('mainForm:body:ContactDetailsMainBody:assocCompaniesDataTable:0:assocCompaniesZipOutputBox').innerHTML;
    companyAddress.country = document.getElementById('mainForm:body:ContactDetailsMainBody:assocCompaniesDataTable:0:assocCompaniesCountryOutputBox').innerHTML;
    company.id = document.getElementById('mainForm:body:ContactDetailsMainBody:assocCompaniesDataTable:0:assocCompaniesCompanyIdCommandLink').innerHTML; // Value
    company.name = document.getElementById('mainForm:body:ContactDetailsMainBody:assocCompaniesDataTable:0:assocCompaniesCompanyNameOutputBox').innerHTML; // Value
    contact.address = contactAddress;
    company.address = companyAddress;
    contact.company = company;
    return contact;
}

function determineCurrentPage() {
    
    function isIntroduction() {
        if (document.getElementById('IntroductionDetails')) {
            return true;
        }
        else {
            return;
        }
    }

    function isOpportunity() {
        if (document.getElementById('mainForm:body:OpportunityDetailsMainBody:detailsResultDiv')) {
            return true;
        }
        else {
            return;
        }
    }

    function isContactProfile() {
        if (document.getElementById('mainForm:body:ContactDetailsMainBody:mainFormOfContactDetails')) {
            return true;
        }
        else {
            return;
        }
    }

    function isTask() {
        if (document.getElementById('mainForm:body:TaskDetailsMainBody:mainFormOfTaskDetails')) {
            return true;
        }
        else {
            return;
        }
    }

    function isCompany() {
        if (document.getElementById('mainForm:body:CompanyDetailsMainBody:mainFormOfCompanyDetails')) {
            return true;
        }
        else {
            return;
        }
    }
    
    var currentPage;
    if (isCompany()) { // Find an Company Page
        currentPage = "company";
    }
    else if (isTask()) { // Find an Task Page
        currentPage = "task";
    }
    else if (isOpportunity()) { // Find an Opp Page
        currentPage = "opportunity";
    }
    else if (isIntroduction()) { // Find an Intro Page
        currentPage = "introduction";
    }
    else if (isContactProfile()) { // Find an Contact Page
        currentPage = "contact";
    }
    else {
        currentPage = 'No Valid Page';
    }
    console.log("Determined Page: "+ currentPage);
    return currentPage;
}




function getPageData() {
 
    var _currentPage = determineCurrentPage();
    var _message = "Current Page: ";
    var _data;
   
    switch (_currentPage) { // Create necessary data from given page for emails
    case "introduction":
        console.log(_message+_currentPage);
        _data = getIntroductionData;
        break;
    case "task":
    	console.log(_message+_currentPage);
        _data = getTaskData;
        break;
    case "opportunity":
        console.log(_message+_currentPage);
        _data = getOpportunityData();
        break;
    case "company":
        console.log(_message+_currentPage);
        _data = getCompanyData();
        break;
    case "contact":
        console.log(_message+_currentPage);
        _data = getContactData();
        break;
    default:
        console.log(_message+document.title);
        _data = 'No data.';
        break;
    }
    
    if(_data != 'No Data.') {
    	
    }
    return _data;
    
}

function createMailToLink(email) {
	var mailToLink = 'mailto:'+encodeURI(email.to)+'?subject='+encodeURI(email.subject)+'&body='+encodeURI(email.body);
	//console.log(mailToLink);
	return mailToLink;
}


function sendEmail(link) 
{


 //window.open(link, '_self');
 document.location.href = link;
 
//document.location.href = this.options[this.selectedIndex].value;	 
//this.selectedIndex = 0;
 
}

function followUp() 
{
	
}

function handleEvents(aMessageEvent) {
    
    if (aMessageEvent.name === "getPageData") {
        getPageData();
    }
    if (aMessageEvent.name === "sendEmail") {
        var link = aMessageEvent.message;
        sendEmail(link);
    }
    if (aMessageEvent.name === "followUp") {
        followUp();
    }
}
console.log('Injected Objects Script Ran');
getPageData();
// register for message events
safari.self.addEventListener("message", handleEvents, false);

}