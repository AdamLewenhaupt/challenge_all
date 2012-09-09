$(document).ready(function(){

function makeButton()
{
    $new = $("<button/>");
    $new.html("A button");
    $new.click(makeButton);
    $("#content").append($new);
}

$(".maker").click(function(){
    makeButton();
});
});