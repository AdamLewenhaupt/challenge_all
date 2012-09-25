require.config({
    paths: {
        backbone: "./backbone",
        jquery: "./jquery",
        underscore: "./underscore",
        items: "./items",
        templates: "./templates",
        collections: "./collections",
        views: "./views"
    },

    shim: 
    {
        backbone: {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },

        underscore: {
            exports: '_'
        }
    }
});

requirejs(['jquery', 'views/appview'], function($, AppView){
    $(document).ready(function(){
      var app = new AppView();
    });
});