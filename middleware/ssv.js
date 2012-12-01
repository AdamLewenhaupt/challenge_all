exports.func = function(req, res, next){
	res.ssv = [];
	res.ssv.add = function(name, value){
    if(typeof(value) === "string"){
	        this.push({name: name, value: value});
	    }else{
	        this.push({name: name, value: JSON.stringify(value), json: true});
	    }
	}

	next();
}