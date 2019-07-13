(function() {

	var pressedKeys = {};


    function setKey(event, status) {

        var code = event.keyCode;

        var key;


        switch(code) {

        case 45:

            key = 'SPACE'; break;

        case 65:

            key = 'LEFT'; break;

        case 87:

            key = 'UP'; break;

        case 68:

            key = 'RIGHT'; break;

        case 83:

            key = 'DOWN'; break;

        default:

            // Convert ASCII codes to letters

            key = String.fromCharCode(code);
       }


        pressedKeys[key] = status;

    }


    document.addEventListener('keydown', function(e) {

        setKey(e, true);

    });


    document.addEventListener('keyup', function(e) {

        setKey(e, false);

    });


    window.addEventListener('blur', function() {

        pressedKeys = {};

    });


    window.input = {

        isDown: function(key) {

            return pressedKeys[key.toUpperCase()];

        }

    };

})();

