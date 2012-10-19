/*
Author: Adam Lewenhaupt
Keywords: Social, Saturator
Description:
This is the social saturator that does following:

§1:
Addes the ability to select friends.

§2:
Added the ability to check your own profile from the profile-image.
*/

define(["jquery", "underscore", "../user", "../persistent"], function($, _, User, Persistent){

    function cap(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

    function renderUser(template, user){
        var temp = $.extend({}, user);
        temp.fname = cap(temp.fname);
        temp.tag = cap(temp.tag);
        temp.lname = cap(temp.lname);
        return template(temp);
    }

    return function(){

        var $mainframe = $("#main-frame");

        var compiled = _.template('<h1><%= fname %> "<%= tag %>" <%= lname %></h1><h2><%= email %></h2>');

        $mainframe.find(".friend-display li div").button();

        $mainframe.find(".profile-menu").each(function(){
            var $this = $(this);

            $this.css("font-size", $this.height());

            $this.click(function(){
                if($this.val() === "Find user"){
                    $this.val("");
                }
            });

            $this.keydown(function(e){
                if (e.which == 13) {
                    event.preventDefault();
                    if(var user = Persistent.getUser($this.val())){
                        alert(user.email);
                    }
                }
            });
        });

        // §1
        $(".friend-display li").click(function(){

            var $this = $(this);

            $("#mainframe-profile").animate({opacity: 0}, { duration: 500, queue: false, complete: function(){
                var found = _.find(User.friends(), function(user){
                    return user.tag === $this.attr("tag");
                });

            var result = renderUser(compiled, found);

            $("#mainframe-profile").html(result).animate({opacity: 1}, { duration: 500, queue: false });
            } });
        });

        // §2
        $("#side-profile-frame-image").click(function(){

            $("#mainframe-profile").animate({opacity: 0}, { duration: 500, queue: false, complete: function(){
                var result = renderUser(compiled, User.get());
            
                $("#mainframe-profile").html(result).animate({opacity: 1}, { duration: 500, queue: false });
            } });
        });

    };

});