// Position the Google Map
		function Map(elementId, geolocation) {
		    var myOptions = {
		        zoom: 13,
		        disableDefaultUI: true,
		        mapTypeId: google.maps.MapTypeId.ROADMAP
		    }
		    var map = new google.maps.Map(document.getElementById(elementId), myOptions);
		    map.setCenter(geolocation);
		    
		    var marker = new google.maps.Marker({
		        position: geolocation,
		        map: map,
		        title: "Hello World!"
		    });
		    
		}
		
		
	
		function ValidateAddress(address) {
		
		// Convert the value variable into something a bit more descriptive
		var CurrentAddress = address;
		
		// If the address is blank, then this is for the required validator to deal with.
		if (address.length == 0) {
		    return;
		}
		
		// Google Maps doesn't like line-breaks, remove them
		CurrentAddress = CurrentAddress.replace(/\n/g, "");
		
		// Create a new Google geocoder
		var geocoder = new google.maps.Geocoder();
		var result = geocoder.geocode({ 'address': CurrentAddress}, function (results, status) {
		
			// Google reported a valid geocoded address
			                if (status == google.maps.GeocoderStatus.OK) {
			
								console.log(status);
			
			                    // Get the formatted Google result
			                    var address = results[0].formatted_address;
			                    // Count the commas in the fomatted address.
			                    // This doesn't look great, but it helps us understand how specific the geocoded address
			                    // is.  For example, "CA" will geocde to "California, USA".
			                    numCommas = address.match(/,/g).length;
			                    
			                    if (numCommas >= 3) {
			                    
			                                            // Replace the first comma found with a line-break
			                                            address = address.replace(/, /, "\n");
			                    
			                                            // Remove USA from the address (remove this, if this is important to you)
			                                            address = address.replace(/, USA$/, "");
			                    
			                                            // Check for the map_canvas, if it exists then position the Google Map
			                                            
			                                           Map("map_canvas", results[0].geometry.location);
			                                           
			                                           
			                    
			                                            // Set the textarea value to the geocoded address
//			                                            $(element).val(address);
//			                    
			                                            // Cache this latest result
//			                                            $(element).data("LastAddressValidated", address);
//			                    
			                                            // We have a valid geocoded address
//			                                            $(element).data("IsValid", true);
			                                        } else {
			                                            // Google Maps was able to geocode the address, but it wasn't specific
			                                            // enough (not enough commas) to be a valid street address.
			                                            }
			                    
			                    
			                    
			                    }
		
		});
		
		}