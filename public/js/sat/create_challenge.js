define(["jquery"], function($){
        var rules = [],
            counter = 0,
            buttons = [];

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
            $new = $("<div style='position: relative'/>");
            $button = $('<button class="removerule"/>').html("remove").attr("arr-id",counter);
            buttons.push($button);
            $li = $("<li/>").append(rule, $button);
            $("#rule-box").append($new.html($li));
            counter++;
            //alert("Array: "+rules+"Counter:"+counter+"ButtonAttr: " + $button.attr("arr-id"));
        });

        $('#rule-box button.removerule').live('click', function(){
                $(this).parent().remove();
                $id = $(this).attr("arr-id");
                rules.splice($id,1);
                buttons.splice($id,1);
                /*for(var i=0; i<buttons.length -$id;i++){     <---------------GET THIS SHIT WORKING(Changing the arr-id of the buttons)
                    alert(buttons[i].attr("arr-id"));
                }*/
                counter--;
                alert("ID: "+$(this).attr('arr-id')+"Counter: "+counter);
            });

        //Disable the enter key.
        $('input').keypress(function (e) {
            var code = null;
            code = (e.keyCode ? e.keyCode : e.which);
            return (code == 13) ? false : true;
        });
	};
});