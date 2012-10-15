/*
Author: Adam Lewenhaupt
Keywords: API, User
Description:
This module provides a API for the user.

§1:
init()
Should be executed when the SSV 'user' variable is defined.

§2:
onInit(func); -- (func: a function that should be executed when the user is defined.)
This function should be used for safetly using the user api as it's only after the init function
that the api can be used.

§3:
online()
Returns true if the api can be used.

§4:
get()
Returns the user object.

§5:
friends()
Returns the user's friends.

*/

define(["./ssv"], function(SSV){

    window._online = false;
    window._userInits = [];

    return {
        // §1
        init: function(){

            window._user = SSV.get("user");
            window._online = !window._online;

            window._userInits.forEach(function(func){
                func();
            });
        },

        // §2
        onInit: function(func){
            if(!this.online())
                window._userInits.push(func);
            else
                func();
        },

        // §3
        online: function(){ return window._online; },

        // §4
        get: function(){ return window._user; },

        // §5
        friends: function(){ return SSV.get("friends"); }
    }
});