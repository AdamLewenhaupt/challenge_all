var grid = require('../grid');

exports.upload = function(req, res){
	grid.write("jag.png", req.files.upload.path, function(err, gs){
		res.send("Uploaded file.");
	});
};

exports.get = function(req, res){

	grid.read(req.params.file, function(err, data){
		if(err) res.send(404, "File not found");
		else res.send(data);
	});
};