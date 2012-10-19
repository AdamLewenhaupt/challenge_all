/*
Author: Adam Lewenhaupt
Keywords: Package, Main, Saturate
Description:
This package provides saturate functions for the mainframe.
In other words when a mainframe is loaded. The same id can be used to call
a saturater function that initializes the mainframe.
*/

define(["./social","./create_challenge"], function(social,create_challenge){
    return {
        social: social,
        create_challenge: create_challenge
    }
})