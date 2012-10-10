var ssv = [];

exports.add = function(name, value){
	ssv.push({name: name, value: value});
}

exports.fetch = function(){
	var retval = ssv;
	ssv = [];
	return retval;
}