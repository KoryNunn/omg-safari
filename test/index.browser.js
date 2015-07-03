(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/home/kory/dev/omg-safari/index.js":[function(require,module,exports){
require('./pasteEventsFix');
require('./selectFix');
},{"./pasteEventsFix":"/home/kory/dev/omg-safari/pasteEventsFix.js","./selectFix":"/home/kory/dev/omg-safari/selectFix.js"}],"/home/kory/dev/omg-safari/pasteEventsFix.js":[function(require,module,exports){
// Safari doesn't trigger 'change' events when you paste.
// Just trigger a keyup on 'a'. Safari wont put 'a' in the box..

document.addEventListener('paste', function(event) {
    var target = event.target;

    setTimeout(function(){
        var virtualEvent = new KeyboardEvent('keyup');

        virtualEvent.initKeyboardEvent(
            'keyup', 
            true, 
            true, 
            window, 
            'a',
            3,
            true,
            false,
            true,
            false,
            false
        );

        target.dispatchEvent(virtualEvent);
    },50);
});
},{}],"/home/kory/dev/omg-safari/selectFix.js":[function(require,module,exports){
// Safari doesn't trigger 'change' events when you select
// the first item in a select element, if no option is currently selected.
// Just trigger a keyup on 'a'. Safari wont put 'a' in the box..

function fuckifySelect(select){
    if(
        select.tagName !== 'SELECT' || 
        select.selectedIndex !== -1
    ){
        return;
    }

    if(!select.options[0] || !select.options[0]._isDumbshitOption){    
        var blank = document.createElement('option');
        blank._isDumbshitOption = true;

        select.insertBefore(blank, select.options[0]);
        select._dumbshitOption = blank;
    }
}

function updateTarget(target) {
    setTimeout(function(){
        fuckifySelect(target);

        var selects = target.querySelectorAll ? target.querySelectorAll('select') : [];

        for(var i = 0; i < selects.length; i++){
            fuckifySelect(selects[i]);
        }
    },50);
}

document.addEventListener('DOMNodeInserted', function(event){
    updateTarget(event.target);
}, true);

document.addEventListener('change', function(event){
    if(
        event.target.tagName = 'SELECT' &&
        event.target.selectedOptions.length && 
        event.target._dumbshitOption && 
        event.target._dumbshitOption.parentElement &&
        (
            event.target.selectedOptions[0]._isDumbshitOption || 
            event.target.value
        )
    ){
        event.target._dumbshitOption.parentElement.removeChild(event.target._dumbshitOption);
        event.target._dumbshitOption = null;
    }
}, true);

window.addEventListener('load', function(event){
    updateTarget(document);
});

updateTarget(document);

},{}],"/home/kory/dev/omg-safari/test/index.js":[function(require,module,exports){
require('../');
},{"../":"/home/kory/dev/omg-safari/index.js"}]},{},["/home/kory/dev/omg-safari/test/index.js"]);
