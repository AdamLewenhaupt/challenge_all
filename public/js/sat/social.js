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

    var compiled = _.template('<h1><%= fname %> "<%= tag %>" <%= lname %></h1><h2><%= email %></h2>');

    function cap(string)
    {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function saturateRenderer(user){
        var temp = $.extend({}, user);
        temp.fname = cap(temp.fname);
        temp.tag = cap(temp.tag);
        temp.lname = cap(temp.lname);
        return compiled(temp);
    }

    function displayUser(user){
        $("#mainframe-profile").animate({opacity: 0}, { duration: 500, queue: false, complete: function(){
                var result = saturateRenderer(user);
            
                $("#mainframe-profile").html(result).animate({opacity: 1}, { duration: 500, queue: false });
            } });
    }

    function runUserRelationAnalyzis(self, target){
        var friends = User.friends().indexOf(target) !== -1,
            $dynamic = $("#main-frame").find("#mainframe-profile-menu .dynamic-content").html("");

        if(!friends){
            $addFriend = $("<div/>").html("Add friend").css({
                width: "50%",
                height: "100%",
            }).button().click(function(){
                alert("TODO: send friend request :)");
            });

            $dynamic.append($addFriend);

            $addFriend.children("span").css({
                "line-height": $addFriend.height()+"px"
            })
        }
    }

    return function(){

        var $mainframe = $("#main-frame");

        $mainframe.find(".friend-display li div").button();

        $mainframe.find(".profile-menu").each(function(){
            var $this = $(this);

            $this.css("font-size", $this.height() * 0.8);

            $this.click(function(){
                if($this.val() === "Find user"){
                    $this.val("");
                }
            });

            $this.keydown(function(e){

                if (e.which == 13) {

                    e.preventDefault();

                    Persistent.getUser($this.val(), function(err, user){
                        if(user){
                            displayUser(user);
                            runUserRelationAnalyzis(User.get(), user);
                            $this.val("");
                        }else{
                            alert("Not found");
                        }

                    });

                    return false;
                }
            });
        });

        // §1
        $(".friend-display li").click(function(){

            var $this = $(this);

           var found = _.find(User.friends(), function(user){
                return user.tag === $this.attr("tag");
            });

            displayUser(found);
        });

        // §2
        $("#side-profile-frame-image").click(function(){
            displayUser(User.get());
        });

    };

});