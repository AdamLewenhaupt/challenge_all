/*
Author: Adam Lewenhaupt
Keywords: Package, Main, Saturate
Description:
This package provides saturate functions for the mainframe.
In other words when a mainframe is loaded. The same id can be used to call
a saturater function that initializes the mainframe.
*/

define(["./social", "./create_challenge", "./achievements"], function(social, create_challenge, achievements){
    return {
        social: social,
        create_challenge: create_challenge,
        achievements: achievements
    }
})