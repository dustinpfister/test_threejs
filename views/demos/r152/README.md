## threejs r152 notes

Looks like the use of javaScript modules over that of plain old text\/javaScript mime type script tags is what will be the standard in future revisions of threejs. The removal of the js folder in the examples folder of the repo has all ready happened, so in order to use up to date add ons  need to start using javaScript modules anyway. Although three.js, and three.module.js are still being rendered in builds of threejs at this point, it is only a matter of time until they will be placed on the chopping block as well.

With r152 I will need to follow these guidelines then:

* The type="script" attribute will be used for script tags in html
* The use of import and export will be used in the demos
* 
