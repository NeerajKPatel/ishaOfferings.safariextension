/* Primitive Business Types */


	function Address(line1, line2, line3, city, state, zipcode, country) {
		this.line1 = line1 || '';
		this.line2 = line2 || '';
		this.line3 = line3 || '';
		this.city = city || '';
		this.state = state || '';
		this.zipcode = zipcode|| '';
		this.country = country || '';
		return this;
	}
	
	function Email(to, from, cc, bcc, subject, body, header) {
		this.to = to || '';
		this.from = from || '';
		this.cc = cc || '';
		this.bcc = bcc || '';
		this.subject = subject || '';
		this.body = body || '';
		return this;
	}
	
	function Contact(id, firstName, lastName, phone, email, address, company) {
	   	this.id = id || '';
	    this.firstName = firstName || '';
	    this.lastName = lastName || '';
	    this.phone = phone || '';
	    this.email = email || '';
	    this.company = company || new Company();
	    return this;
	}
	
	function printObject(object) {
	    var output = '';
	    for (property in object) {
	        output += property + ':' + object[property] + '\n';
	    }
	    console.log(output);
	}
