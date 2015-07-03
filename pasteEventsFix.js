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