/*

Jake Young
Apple Inc.
August 23, 2012

*/

//LISTEN FOR VALIDATION REPORT

// Global variable for the unread message count. Initialize from settings.
var violations = safari.extension.settings.violations;


// Set a interval to call newMessage every 20 seconds.
//setInterval(newMessage, 20000);

// Register for the validate and command events.
safari.application.addEventListener("validate", performValidate, false);
safari.application.addEventListener("command", performCommand, false);

function performValidate(event)
{
	// Switch based on the command of the event. You should always check the command.
	switch (event.command) {
	case "resource.validator":
		// Set the badge of the target, if the target has a badge property.
		// Some targets that send commands, like context menu items, don't have badges.
		if ("badge" in event.target)
			event.target.badge = violations;
		break;
	}
}

function performCommand(event)
{
	// Switch based on the command of the event. You should always check the command.
	switch (event.command) {
	case "resource.validator":
		// Show a badge with the number of messages.

		var validator = event.message;
		var numberOfViolations = getNumberOfViolations(validator.messages);
		
		updateViolations(numberOfViolations);
		
		
		break;
	}
}

// Function to update the unread messages count and toolbar item badges.
function updateViolations(count)
{
	// Set the unread message count.
	violations = count;

	// Store the value in settings so it persists between launches.
	safari.extension.settings.violations = violations;

	// Make all the toolbar items validate to update their badge.
	validateToolbarItems();
}



function validateToolbarItems()
{
	// Iterate over all the toolbar items and tell them to validate, so their
	// badge will be updated.
	var toolbarItems = safari.extension.toolbarItems;
	for (var i = 0; i < toolbarItems.length; ++i) {
		// Skip any toolbar item that is not the messages item. You should always
		// check the identifier, even if your extension only has one toolbar item.
		//if (toolbarItems[i].identifier !== "messages")
		//	continue;

		// Calling validate will dispatch a validate event, which will call
		// performValidate for each toolbar item. This is the recommended method
		// of updating items instead of directly setting a badge here, so multiple
		// event listeners have a chance to validate the item.
		toolbarItems[i].validate();
	}
}

var itemArray = safari.extension.toolbarItems;
for (var i = 0; i < itemArray.length; ++i) {
    var item = itemArray[i];
    if (item.identifier == "resource.validator")
       {
       var validatorToolBarItem = item;
       }
}



function updateBadge(toolBarItem, value) {
	
	if ("badge" in toolBarItem)
		toolBarItem.badge = violations;
}

function updateValidationBadge(value) {
	updateBadge(validatorToolBarItem, value);
}

// Listen for the messages from the content script with the color information.
safari.application.addEventListener("message", handleMessageEvent, false);
function handleMessageEvent(event)
{
    if (event.name == "validationReport") {       
       clearValidationReport();
       showValidationReport(event);
       if(document.getElementById("shippingAddress")) {
       	var address = document.getElementById("shippingAddress").getElementsByTagName("li")[0].innerHTML || '';
       	ValidateAddress(address);
       }
       
       validateToolbarItems();
    }
    
    if (event.name == "validationReportUpdate") {     
       	console.log("Validation Report was Updated");
    }   	
    
}

function getStatus(messages) {
var status = '';
var count = 0;
for (var i = 0; i < messages.length; i++) {
  		var message = messages[i];
  		if(message.status == 'fail') { 
  			count++;
  		}
  	}
  	
  	if(count > 0) {
  		return 'incomplete';
  	}
  	
  	if(count == 0) {
  		return 'complete';
  	}
}

function printNotes(notes) {
	if(notes){
	var noteString = "- ";
	for (var i = 0; i < notes.length; i++) {
		var note = notes[i];
		noteString = noteString + note.label + "\n" + note.content;
	}
	}
	return noteString;

}

function makeULListFromNotes(notes) {
	var list = document.createElement("ul");
	for (var i = 0; i < notes.length; i++) {
		var note = notes[i];
		var listItem = document.createElement("li");
		var text = document.createTextNode(note.content);
		listItem.appendChild(text);
		list.appendChild(listItem);
	}


	return list;
}

function getNumberOfViolations(messages) {
	var count = 0;
	for (var i = 0; i < messages.length; i++) {
	  		var message = messages[i];
	  		if(message.status == 'fail') { 
	  			count++;
	  		}
	  	}
	  	violations = count;
	  	
	return count;
}


function showValidationReport(event) {




var container = document.getElementById('container');
var validator = event.message;

var opportunityValidationWrapper = document.createElement('div');
opportunityValidationWrapper.className = 'opportunity-validation-wrapper';

var header = document.createElement('h1');
var headerText = document.createTextNode(validator.type + ' integrity: ');
header.appendChild(headerText);

var status = document.createElement('span');
	if(status == 'incomplete') {
		status.className = 'weak';
	}



// MAKE THIS DYNAMIC --- August 23, 2012 at 12:15 PM
var statusText = document.createTextNode(getStatus(validator.messages));

var numberOfViolations = getNumberOfViolations(validator.messages);

updateValidationBadge(numberOfViolations);

console.log(numberOfViolations);

status.appendChild(statusText);
header.appendChild(status);
	
opportunityValidationWrapper.appendChild(header);

var validationDialog = document.createElement('div');
validationDialog.className = 'validation-dialog';

var messagesToDisplay = validator.messages;

var messageList = document.createElement('ul');

for (var i = 0; i < messagesToDisplay.length; i++) {
	var message = messagesToDisplay[i];
	console.log(message);
	
	
	
	var listItem = document.createElement('li');
	if(message.id != null || message.id != undefined) {
		listItem.id = message.id;
	}
	if(message.notes) {
		var notesList = makeULListFromNotes(message.notes);
	}
	
	listItem.className = message.status;
	listItem.innerText = message.content;
	listItem.appendChild(notesList);
	messageList.appendChild(listItem);
}

validationDialog.appendChild(messageList);
opportunityValidationWrapper.appendChild(validationDialog);
container.appendChild(opportunityValidationWrapper);

// Now that the HTML content has been generated, make any adjustments to the UI to make it
// the content fit where it is being displayed.
makeUIAdjustments();

// Submit Analytics
// Send Messages with Log Date 


}

function clearValidationReport()
{
    var parentElement = document.getElementById('container');
        while (parentElement.hasChildNodes()) {
            parentElement.removeChild(parentElement.firstChild);
    }
    
    var parentElement = document.getElementById('map_canvas');
        while (parentElement.hasChildNodes()) {
            parentElement.removeChild(parentElement.firstChild);
    }
}


//SHOW THE VALIDATION REPORT
//
//GET CONTAINER
//ATTACH VALIDATION ITEMS FOR EACH MESSAGE
//MAKE UI ADJUSTMENTS