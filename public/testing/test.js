$(document).ready(function(){

$("#container").css({position:"absolute",left:"10px",top:"50px"});

var num = 0,
    width = 60,
    height = 60,
    xOffset = 5,
    yOffset = 5;
    row = 0;
    color = 0;

var buttonlist = [];

function makeButton()	
{   
    $new = $("<div/>");
    if(num==5){
        num = 0;
        row++;
    }
    if(color==0)$new.css("background","blue");
    if(color==1)$new.css("background","green");
    if(color==2)$new.css("background","yellow");
    if(color==3)$new.css("background","red");
    $new.css({position:"absolute",width:"60px",height:"60px",
        left:num*(width+xOffset),top:row*(height+yOffset)});
    $new.click(removeButton);
    $new.animate({
        top: '+=50'
    }, 400);
    buttonlist.push($new);
    $("#container").html(buttonlist);
    num++;
    if(color<3)color++;
    else color=0;
}

function removeButton()
{
    
}

$("#maker").click(function(){
    makeButton();
});

$("#flip").click(function(){
    buttonlist.reverse();
});

});