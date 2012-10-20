var ssv = [];

exports.add = function(name, value){
    if(typeof(value) === "string"){
        ssv.push({name: name, value: value});
    }else{
        ssv.push({name: name, value: JSON.stringify(value), json: true});
    }
}

exports.fetch = function(){
	var retval = ssv;
	ssv = [];
	console.log(retval);
	return retval;
}