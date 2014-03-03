define(function() {

    'use strict';

    var getExperationDate = function(expires) {

        var date = new Date();
        
        date.setTime(date.getTime()+(expires*24*60*60*1000));
        
        return date.toGMTString();

    };

    var cookies = function(key, value, options) {

        if(value) {
            
            cookies.setCookie(key, value, options);

        } else {

            return cookies.getCookie(key);

        }

    };

    cookies.deleteCookie = function(key) {

        cookies.setCookie(key, '', {expires: -1});

    };

    cookies.getCookie = function(key) {

        var keyPattern = key + "=",
            cookiesArray = document.cookie.split(';');

        for(var i=0, len = cookiesArray.length; i < len; i++) {
            
            var cookieFragment = cookiesArray[i];
            
            while (cookieFragment.charAt(0)==' ') {
                cookieFragment = cookieFragment.substring(1,cookieFragment.length);
            }
            
            if (cookieFragment.indexOf(keyPattern) === 0) {
                return cookieFragment.substring(keyPattern.length, cookieFragment.length);
            }
        }

        return null;

    };

    cookies.setCookie = function(key, value, options) {

        var expires = options && options.expires ? getExperationDate(options.expires) : '',
            path = options && options.path ? options.path : '/';

        document.cookie = key+"="+value+"; expires="+expires+"; path="+path;

    };


    window.cookies = cookies;

    return cookies;

});