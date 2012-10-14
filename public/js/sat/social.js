define(["jquery", "underscore", "../user"], function($, _, User){

    return function(){

        $(".friend-display li").click(function(){

            var $this = $(this);

            $("#mainframe-profile").animate({opacity: 0}, function(){
                var compiled = _.template('<h1><%= fname %> "<%= tag %>" <%= lname %></h1><h2><%= email %></h2><h3>Age: <%= age %></h3>'),
                    found = _.find(User.friends(), function(user){
                    return user.tag === $this.attr("tag").toLowerCase();
                });

            var result = compiled(found);

            $("#mainframe-profile").html(result).animate({opacity: 1});
            });
        });

        $("#side-profile-frame-image").click(function(){

            $("#mainframe-profile").animate({opacity: 0}, function(){
                var compiled = _.template('<h1><%= fname %> "<%= tag %>" <%= lname %></h1><h2><%= email %></h2><h3>Age: <%= age %></h3>'),
                    result = compiled(User.get());
            
                $("#mainframe-profile").html(result).animate({opacity: 1});
            });
        });

    };

});