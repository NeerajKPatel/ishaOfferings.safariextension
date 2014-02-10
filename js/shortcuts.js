var mainForm = "mF";

/**
 * http://www.openjs.com/scripts/events/keyboard_shortcuts/
 * Version : 2.01.B
 * By Binny V A
 * License : BSD
 */
shortcut = {
    'all_shortcuts': {},
    //All the shortcuts are stored in this array
    'add': function (shortcut_combination, callback, opt) {
        //Provide a set of default options
        var default_options = {
            'type': 'keydown',
            'propagate': false,
            'disable_in_input': false,
            'target': document,
            'keycode': false
        }
        if (!opt) opt = default_options;
        else {
            for (var dfo in default_options) {
                if (typeof opt[dfo] == 'undefined') opt[dfo] = default_options[dfo];
            }
        }

        var ele = opt.target;
        if (typeof opt.target == 'string') ele = document.getElementById(opt.target);
        var ths = this;
        shortcut_combination = shortcut_combination.toLowerCase();

        //The function to be called at keypress
        var func = function (e) {
                e = e || window.event;

                if (opt['disable_in_input']) { //Don't enable shortcut keys in Input, Textarea fields
                    var element;
                    if (e.target) element = e.target;
                    else if (e.srcElement) element = e.srcElement;
                    if (element.nodeType == 3) element = element.parentNode;

                    if (element.tagName == 'INPUT' || element.tagName == 'TEXTAREA') return;
                }

                //Find Which key is pressed
                if (e.keyCode) code = e.keyCode;
                else if (e.which) code = e.which;
                var character = String.fromCharCode(code).toLowerCase();

                if (code == 188) character = ","; //If the user presses , when the type is onkeydown
                if (code == 190) character = "."; //If the user presses , when the type is onkeydown
                var keys = shortcut_combination.split("+");
                //Key Pressed - counts the number of valid keypresses - if it is same as the number of keys, the shortcut function is invoked
                var kp = 0;

                //Work around for stupid Shift key bug created by using lowercase - as a result the shift+num combination was broken
                var shift_nums = {
                    "`": "~",
                    "1": "!",
                    "2": "@",
                    "3": "#",
                    "4": "$",
                    "5": "%",
                    "6": "^",
                    "7": "&",
                    "8": "*",
                    "9": "(",
                    "0": ")",
                    "-": "_",
                    "=": "+",
                    ";": ":",
                    "'": "\"",
                    ",": "<",
                    ".": ">",
                    "/": "?",
                    "\\": "|"
                }
                //Special Keys - and their codes
                var special_keys = {
                    'esc': 27,
                    'escape': 27,
                    'tab': 9,
                    'space': 32,
                    'return': 13,
                    'enter': 13,
                    'backspace': 8,

                    'scrolllock': 145,
                    'scroll_lock': 145,
                    'scroll': 145,
                    'capslock': 20,
                    'caps_lock': 20,
                    'caps': 20,
                    'numlock': 144,
                    'num_lock': 144,
                    'num': 144,

                    'pause': 19,
                    'break': 19,

                    'insert': 45,
                    'home': 36,
                    'delete': 46,
                    'end': 35,

                    'pageup': 33,
                    'page_up': 33,
                    'pu': 33,

                    'pagedown': 34,
                    'page_down': 34,
                    'pd': 34,

                    'left': 37,
                    'up': 38,
                    'right': 39,
                    'down': 40,

                    'f1': 112,
                    'f2': 113,
                    'f3': 114,
                    'f4': 115,
                    'f5': 116,
                    'f6': 117,
                    'f7': 118,
                    'f8': 119,
                    'f9': 120,
                    'f10': 121,
                    'f11': 122,
                    'f12': 123
                }

                var modifiers = {
                    shift: {
                        wanted: false,
                        pressed: false
                    },
                    ctrl: {
                        wanted: false,
                        pressed: false
                    },
                    alt: {
                        wanted: false,
                        pressed: false
                    },
                    meta: {
                        wanted: false,
                        pressed: false
                    } //Meta is Mac specific
                };

                if (e.ctrlKey) modifiers.ctrl.pressed = true;
                if (e.shiftKey) modifiers.shift.pressed = true;
                if (e.altKey) modifiers.alt.pressed = true;
                if (e.metaKey) modifiers.meta.pressed = true;

                for (var i = 0; k = keys[i], i < keys.length; i++) {
                    //Modifiers
                    if (k == 'ctrl' || k == 'control') {
                        kp++;
                        modifiers.ctrl.wanted = true;

                    } else if (k == 'shift') {
                        kp++;
                        modifiers.shift.wanted = true;

                    } else if (k == 'alt') {
                        kp++;
                        modifiers.alt.wanted = true;
                    } else if (k == 'meta') {
                        kp++;
                        modifiers.meta.wanted = true;
                    } else if (k.length > 1) { //If it is a special key
                        if (special_keys[k] == code) kp++;

                    } else if (opt['keycode']) {
                        if (opt['keycode'] == code) kp++;

                    } else { //The special keys did not match
                        if (character == k) kp++;
                        else {
                            if (shift_nums[character] && e.shiftKey) { //Stupid Shift key bug created by using lowercase
                                character = shift_nums[character];
                                if (character == k) kp++;
                            }
                        }
                    }
                }

                if (kp == keys.length && modifiers.ctrl.pressed == modifiers.ctrl.wanted && modifiers.shift.pressed == modifiers.shift.wanted && modifiers.alt.pressed == modifiers.alt.wanted && modifiers.meta.pressed == modifiers.meta.wanted) {
                    callback(e);

                    if (!opt['propagate']) { //Stop the event
                        //e.cancelBubble is supported by IE - this will kill the bubbling process.
                        e.cancelBubble = true;
                        e.returnValue = false;

                        //e.stopPropagation works in Firefox.
                        if (e.stopPropagation) {
                            e.stopPropagation();
                            e.preventDefault();
                        }
                        return false;
                    }
                }
            }
        this.all_shortcuts[shortcut_combination] = {
            'callback': func,
            'target': ele,
            'event': opt['type']
        };
        //Attach the function with the event
        if (ele.addEventListener) ele.addEventListener(opt['type'], func, false);
        else if (ele.attachEvent) ele.attachEvent('on' + opt['type'], func);
        else ele['on' + opt['type']] = func;
    },

    //Remove the shortcut - just specify the shortcut and I will remove the binding
    'remove': function (shortcut_combination) {
        shortcut_combination = shortcut_combination.toLowerCase();
        var binding = this.all_shortcuts[shortcut_combination];
        delete(this.all_shortcuts[shortcut_combination])
        if (!binding) return;
        var type = binding['event'];
        var ele = binding['target'];
        var callback = binding['callback'];

        if (ele.detachEvent) ele.detachEvent('on' + type, callback);
        else if (ele.removeEventListener) ele.removeEventListener(type, callback, false);
        else ele['on' + type] = false;
    }
}

function clickElement(id) {

    var button = document.getElementById(id)
    button.click();

}

function saveRecord() {
    if (document.getElementById('mF:body:TaskDetailsMainBody:taskSaveButton')) { // Test for Task Save Button
        clickElement('mF:body:TaskDetailsMainBody:taskSaveButton');
    }
}


function rejectIntroduction() {

    clickElement('mF:body:rejectIntroductionButton');

}

function qualifyIntroduction() {
    clickElement('mF:body:qualifyIntroductionButton');
}

function nextIntroduction() {
    clickElement('mF:body:IntroductionDetailsBody:nextButtonForIntroductionDetails');
}

function prevIntroduction() {
    clickElement('mF:body:IntroductionDetailsBody:prevButtonForIntroductionDetails');
}

function createNewTask() {
    document.getElementById('mF:appSubHeader:createNewMenu').value = 'Task';
    document.getElementById("mF:appSubHeader:createNewMenu").onchange();
}

function createNewIntroduction() {
    document.getElementById('mF:appSubHeader:createNewMenu').value = 'Introduction';
    document.getElementById("mF:appSubHeader:createNewMenu").onchange();
}

function createNewCompany() {
    document.getElementById('mF:appSubHeader:createNewMenu').value = 'Company';
    document.getElementById("mF:appSubHeader:createNewMenu").onchange();
}

function createNewContact() {
    document.getElementById('mF:appSubHeader:createNewMenu').value = 'Contact';
    document.getElementById("mF:appSubHeader:createNewMenu").onchange();
}

function createNewOpportunity() {
    document.getElementById('mF:appSubHeader:createNewMenu').value = 'Opportunity';
    document.getElementById("mF:appSubHeader:createNewMenu").onchange();
}

function createNewTag() {
    document.getElementById('mF:appSubHeader:createNewMenu').value = 'Tag';
    document.getElementById("mF:appSubHeader:createNewMenu").onchange();
}


// Introductions

shortcut.add("Ctrl+R", function () {
    rejectIntroduction();
});

shortcut.add("Ctrl+.", function () {
    rejectIntroduction();
});

shortcut.add("Ctrl+Q", function () {
    qualifyIntroduction();
});

shortcut.add("Ctrl+[", function () {
    prevIntroduction();
});

shortcut.add("Ctrl+]", function () {
    nextIntroduction();
});

// New Records

shortcut.add("Ctrl+Shift+t", function () {
    createNewTask();
});

shortcut.add("Ctrl+Shift+o", function () {
    createNewOpportunity();
});

shortcut.add("Ctrl+Shift+i", function () {
    createNewIntroduction();
});

shortcut.add("Ctrl+Shift+c", function () {
    createNewContact();
});

shortcut.add("Ctrl+Shift+alt+c", function () {
    createNewCompany();
});

/* Navigation */

shortcut.add("Ctrl+1", function () {
    clickElement('mF:appHeader:tasks');
});

shortcut.add("Ctrl+2", function () {
    clickElement('mF:appHeader:introductions');
});

shortcut.add("Ctrl+3", function () {
    clickElement('mF:appHeader:companies');
});

shortcut.add("Ctrl+4", function () {
    clickElement('mF:appHeader:contacts');
});

shortcut.add("Ctrl+5", function () {
    clickElement('mF:appHeader:opportunities');
});

shortcut.add("Ctrl+6", function () {
    clickElement('mF:appHeader:tags');
});

shortcut.add("Ctrl+7", function () {
    clickElement('mF:appHeader:reports');
});

// POS Search


function runSearch() {

    var buttons = document.getElementById('Buttons')
    var searchButton = buttons.getElementsByTagName('input')[0];
    searchButton.click();

}

// POS Keyboard Commands
shortcut.add("Ctrl+Q", function () {
    qualifyIntroduction();
});

// Intro Commands
// POS Keyboard Commands
shortcut.add("Ctrl+Shift+A", function () {
    rejectIntroduction();
});


//safari.self.tab.dispatchMessage("doSomething",theData);