define(["jquery"], function($){
        var rules = [],
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
        $( "#friend-box" ).selectable();

        $("#add-rule-button").click(function(){
            var rule = $("#rule-input").val(); 
            $("#rule-input").val("");
            rules.push(rule);
            counter++;
            $new = $("<div style='position: relative'/>");
            $button = $("<button/>").click(function(e){
                e.preventDefault();
                $new.remove();
            }).html("remove");
            $li = $("<li/>").append(rule, $button);
            $("#rule-box").append($new.html($li));
        });

        //Disable the enter key.
        $('input').keypress(function (e) {
            var code = null;
            code = (e.keyCode ? e.keyCode : e.which);
            return (code == 13) ? false : true;
        });
	};
});