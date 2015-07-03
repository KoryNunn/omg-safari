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
