define(["./ssv"], function(SSV){

    window._online = false;
    window._userInits = [];

    return {
        init: function(){

            window._user = SSV.get("user");
            window._online = !window._online;

            window._userInits.forEach(function(func){
                func();
            });

            console.log("hello");
        },

        onInit: function(func){
            if(!this.online())
                window._userInits.push(func);
            else
                func();
        },

        online: function(){ return window._online; },
        get: function(){ return window._user; }
    }
});