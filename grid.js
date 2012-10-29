var mongoose = require('mongoose'),
  	GridStore = mongoose.mongo.GridStore,
  	assert = require('assert');

exports.read = function(path, cb){
	this.gs = new GridStore(mongoose.connection.db, path, "r", {
		"chunk_size": 1024*256
	});
	assert(this.gs, "GS undefined");
	this.gs.open(function(err, gs){
		if(err){
		 	console.log(err);
		 	return;
		}

		gs.read(cb);
	});
}

exports.write = function(path, file, cb){
	this.gs = new GridStore(mongoose.connection.db, path, "w", {
		"chunk_size": 1024*256
	});
	this.gs.writeFile(file, cb);
}

exports.delete = function(){

}