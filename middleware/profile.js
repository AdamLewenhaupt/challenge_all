/*
Author: Adam Lewenhaupt
Keywords: Middleware, profile
Description:
This middleware provides support for the challenge all profile system.
*/

exports.func = function profile(req, res, next){
    console.log("hello");
    req.user = {
        fname: "adam",
        lname: "lewenhaupt",
        tag: "spinno",
        age: 17
    };

    next();
}