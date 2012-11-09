define(["jquery", "../user"], function($, User){
        var rules = {},
            counter = 0;

	return function(){
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
        $( "#friend-box" ).selectable({
            stop:function() {
                var result = $( "#unchallengeall-button" ).empty();
                $( ".ui-selected", this ).each(function(){
                    var index = $( "#friend-box li" ).index( this );
                    result.append( " #" + ( index + 1 ) );

                });
            }
        });

        $("#add-rule-button").click(function(){
            var rule = $("#rule-input").val();
            $("#rule-input").val("");
            rules[counter] = rule;
            $new = $("<div style='position: relative'/>");
            $button = $('<button class="removerule"/>').html("remove").attr("arr-id",counter);
            $li = $("<li/>").append(rule, $button);
            $("#rule-box").append($new.html($li));
            counter++;
        });

        $('#rule-box button.removerule').live('click', function(){
                $(this).parent().remove();
                var id = $(this).attr("arr-id");
                rules[id] = null;
                counter--;
                console.log(rules);
            });

        //Disable the enter key.
        $('input').keypress(function (e) {
            var code = null;
            code = (e.keyCode ? e.keyCode : e.which);
            return (code == 13) ? false : true;
        });
	};
});