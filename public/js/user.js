define(["./ssv"], function(SSV){

    window._online = false;
    window._userInits = [];

    return {
        init: function(){

            window._user = $.parseJSON(SSV.get("user"));
            window._online = !window._online;

            window._userInits.forEach(function(func){
                func();
            });
        },

        onInit: function(func){
            window._userInits.push(func);
        },

        online: window._online,
        get: window._user
    }
});