// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// GEOMETRY
// ---------- ----------
const geo_plane = new THREE.PlaneGeometry(10, 10, 10, 10);
geo_plane.rotateX(Math.PI * 1.5);
const geo_edges = new THREE.EdgesGeometry(geo_plane);
// ---------- ----------
// MATERIAL
// ---------- ----------
const material_points_1 = new THREE.PointsMaterial({color: 0xff0000, size: 0.75, transparent: true, opacity: 0.025});
const material_points_2 = new THREE.PointsMaterial({color: 0x00ff00, size: 0.25});
// ---------- ----------
// OBJECTS
// ---------- ----------
const points_plane = new THREE.Points(geo_plane, material_points_1);
points_plane.position.y = -3;
scene.add(points_plane);
const points_edges = new THREE.Points(geo_edges, material_points_2);
points_edges.position.y = 3;
scene.add(points_edges);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(12, 6, 12);
camera.lookAt(0,0,0);
renderer.render(scene, camera);

