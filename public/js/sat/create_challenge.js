define(["jquery", "../user","../persistent","../achievements"], function($, User, Persistent, Achievements){
        var ruleslist = {},
            counter = 0,
            friends = [],
            achievements = [],
            isPublic = false;

	return function(){

        var $mainframe = $("#main-frame");
        $mainframe.find(".friend-display li div").button();
        $mainframe.find(".friend-display").selectable({
            stop: function() {
                
                friends = [];
                $(this).children().removeClass("ui-selected");

                $( "li.ui-selected", this ).each(function(){
                    friends.push($(this).attr("tag"));
                    $(this).children().addClass("ui-selected");
                });
            }
        });

		$( "#from" ).datepicker({
            defaultDate: "+1w",
            changeMonth: true,
            numberOfMonths: 1,
            onSelect: function( selectedDate ) {
                $( "#to" ).datepicker( "option", "minDate", selectedDate );
            }
        });
        $( "#to" ).datepicker({
            defaultDate: "+1w",
            changeMonth: true,
            numberOfMonths: 1,
            onSelect: function( selectedDate ) {
                $( "#from" ).datepicker( "option", "maxDate", selectedDate );
            }
        });

        $("#add-rule-button").click(function(){
            var rule = $("#rule-input").val();
            $("#rule-input").val("");
            ruleslist[counter] = rule;
            $new = $("<div style='position: relative'/>");
            $button = $('<button class="removerule"/>').html("remove").attr("arr-id",counter);
            $li = $("<li/>").append(rule, $button);
            $("#rule-box").append($new.html($li));
            counter++;
        }).button();

        $('#rule-box button.removerule').live('click', function(){
                $(this).parent().remove();
                var id = $(this).attr("arr-id");
                ruleslist[id] = null;
                counter--;
                console.log(rules);
            });

        $("#achievement-box").click(function(){
            Achievements.createAchievement(function(e){
                achievements.push(e);
            });
        }).button();

        $("#public-box").click(function(){
            if(isPublic){
                isPublic = false;
                $("#public-box").css("background", "white");
            }
            else if(!isPublic){
                isPublic = true;
                $("#public-box").css("background", "#4DB8DB");
            }
        }).button();

        $("#create-button").click(function(){
            var name = $("#name-input").val();
            var description = $("#description-input").val();
            var arrRules = [];
            for(var x in ruleslist){
                arrRules.push(ruleslist[x]);
            }
            var rules = arrRules;
            var users = friends;
            var date = $("#from").val()+" - " +$("#to").val();
            Persistent.createChallenge(name,description,rules,users,isPublic,date,achievements, [User.get().tag]);
            return false;
        }).button();

        //Disable the enter key.
        $('input').keypress(function (e) {
            var code = null;
            code = (e.keyCode ? e.keyCode : e.which);
            return (code == 13) ? false : true;
        });

        $mainframe.find(".form-input").each(function(){
            var $this = $(this);

            $this.css("font-size", $this.height() * 0.8);

            $this.click(function(){
                if($this.val() === "Enter Name"){
                    $this.val("");
                }
                if($this.val() === "Enter Description"){
                    $this.val("");
                }
                if($this.val() === "Enter Rule"){
                    $this.val("");
                }
            });
        });
        $mainframe.find("#description-input").css("font-size", ($("#description-input").height()/2.5) * 0.8);

        $mainframe.find(".line-height").each(function(){
            var $this = $(this);
            $this.css("line-height", $this.height());
        });
	};
});

/* Achvievement
{
    name: string,
    description: string,
    image: string,
    color: string
}
*/