define(function(){
        var rules = [];

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
            rules.push(rule);
            $new = $("<div style='position: relative' />");
            $("#rule-box").append($new.html('<li>' + rule));
        });

        $("#remove-rule-button").click(function(){
            $("#rule-box").html("");
            rules.pop();
            for(var i=0;i<rules.length;i++){
                $("#rule-box").append('<li>' + rules[i]);
            }
        });

        //Disable the enter key.
        $('input').keypress(function (e) {
            var code = null;
            code = (e.keyCode ? e.keyCode : e.which);
            return (code == 13) ? false : true;
        });
	};
});