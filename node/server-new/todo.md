# server-new nodejs script todo list

## () mark down file parsing
* () make marked part of the stack
* () use marked to parse readme files in path-forpost.js
* () use maked to parse readme files in demos.js

## () - /views/themes/novel
* () start a novel theme starting with the legacy theme
* () just server-new will use this theme
* () go with a ligher theme color
* () new header app of course
* () use grid layout for forpost folder index pages
* () have demo links to the left and readme text to the right
* () should be reacive when making the page smaller, readme sould fall to the bottom
* () render todo lists as well

## () - 400, 404, and 500 ejs pages
* () have error pages for 400, 500, and 404
* () make changes for index.js, path-forpost.js and path-demo.js so that these pages are rendered for such events

## () themes folder, legacy theme, server new and olde updated to work with it
* () start a /views/themes folder that will hold both the current and future themes for this server
* () have a /views/themes/legacy that will be the current theme
* () folders that have to do with the theme should be moved to /views/themes/legacy over views root
* () update server-new to work with /views/themes/legacy
* () update server-old to work with /views/themes/legacy

## () - array of functions for path-demo.js
* () have an array of functions for path-demo.js as with path-forpost.js
* () have better error handing by adding catch promise calls like in path-forpost.js

## (done 02/09/2023 ) - sending 500 status for bad reqs to forpost
* (done) sendStatus(500) for last function

## (done 02/09/2023 ) - better error handling
* (done) fixed the built index method would not reject a promise.
* (done) add catch calls for all promsies in path-forpost.js