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