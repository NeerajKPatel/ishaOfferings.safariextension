/*

Jake Young
Apple Inc.
August 23, 2012

*/



//LISTEN FOR POPOVER EVENT

safari.application.addEventListener("popover", popoverHandler, true);

function getValidationInfo() {	safari.application.activeBrowserWindow.activeTab.page.dispatchMessage("gatherValidationInfo");
}

function popoverHandler(event) {
	
	if (event.target.identifier == "popover.resource.validator") {
		console.log("Validation Request Pressed");
		
		//clearValidationInformation();
		safari.application.activeBrowserWindow.activeTab.page.dispatchMessage("gatherValidationInfo");
	};
	
}

/* Callbacks from showValidation.js */

function makeUIAdjustments()
{
    // Adjust the height of the popover to be the minimum necessary to show all the colors.
    var thisPopover;

    // Find the popover in the array of popvers using its unique identifier.
    var allPopovers = safari.extension.popovers;
    for (var popoverIndex = 0; popoverIndex < allPopovers.length; ++popoverIndex) {
        if (allPopovers[popoverIndex].identifier === "popover.resource.validator") {
            thisPopover = allPopovers[popoverIndex];
            break;
        }
    }
    // Update the height of the popover to fit the content.
    thisPopover.height = document.documentElement.offsetHeight;
}

//setInterval("getValidationInfo()", 5000);


//RUN POPOVER HANDLER
//CLEAR INFORMATION
//ASK INJECTED SCRIPT TO GATHER VALIDATION INFORMATION
//
//
//MAKE UI ADJUSTMENTS BASED ON CONTENT (IDENTIFY THE VALIDATION POPOVER)
