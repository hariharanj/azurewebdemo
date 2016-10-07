

$(document).ready(function() {
    
    var uLightOff = readCookie('ulight_off');

    if (uLightOff != "true") {  
       $('.u-light-white #u-light, .u-light-white-blink #u-light, .u-light-red #u-light, .u-light-red-blink #u-light').slideDown('slow');
    }


    /*  -------- Close Light the U Banner ------------- */
    $(".u-light-close a").click(function() {
        $('#u-light').slideUp();
        
        // create cookie to track u light off state
        createCookie('ulight_off','true',0);
    });

});





/*  ------------------------------------------------
    COOKIES SCRIPT:
    http://www.quirksmode.org/js/cookies.html
-------------------------------------------------- */

function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}

/* -------- end cookie functions -------- */




