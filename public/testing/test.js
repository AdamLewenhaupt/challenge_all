$(document).ready(function(){

function makeButton()
{
    $("#content").html("<button id='maker'>Make another button</button>");
}

$("#maker").click(function(){
    makeButton();
});

});