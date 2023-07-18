# shader-material-points r152 demo

The goal with this demo is to create a custom shader that is an alternative to THREE.PointsMaterial which seems to cause my raspberry PI to freeze up. I have no idea what the isshue would be with that, and it is possible that the problem might be with the use of THREE.Points in any capacity, and a custom shader will not change anything with that. Still I would like to see about doing making a custom shader material to be used with THREE.Points.

## Very Simple starting point

This is then a very striped down custom points material that does not offer much of anything compared to what is built into threejs itself. I am just setting gl\_PointSize to a given uniform value. The size and color can be set and that is it. There are a lot of features missing with this compared to the THREE.PointsMaterial but that is kind of the point. I just want to have a starting point for this, and also if the reason why the Points Material causes the PI to freeze because of one of those features than maybe this will fix that actually.