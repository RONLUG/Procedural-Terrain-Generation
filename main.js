import * as THREE from 'three'
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
// import {generateNoise} from "./noise.mjs"
import {createNoise2D} from "simplex-noise";
import * as dat from 'dat.gui';

// Add renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add camera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.set(0, 0, 40);

// Add camera controller
const controls = new OrbitControls( camera, renderer.domElement );
controls.update()

// Create scene
const scene = new THREE.Scene();

// Add grid
const gridSize = 100;
const gridDivisions = 100;
const gridHelper = new THREE.GridHelper( gridSize, gridDivisions );
scene.add( gridHelper );

// Add test sphere
const sphereGeom = new THREE.SphereGeometry( 1, 32, 16 );
const sphereMaterial = new THREE.MeshPhysicalMaterial();
const sphere = new THREE.Mesh( sphereGeom, sphereMaterial );
scene.add(sphere)
const light = new THREE.PointLight(0xffffff,1);
light.position.set(10, 10, 10)
scene.add(light);

// Create plane

const planeWidth = 100
const planeHeight = 100
const planeGeom = new THREE.PlaneGeometry(planeWidth, planeHeight, planeWidth, planeHeight)
const planeMat = new THREE.MeshBasicMaterial({wireframe: true, color: 0x00ffff})
const plane = new THREE.Mesh(planeGeom, planeMat)
scene.add(plane)


// const noise = generateNoise(planeWidth  + 1, planeHeight + 1)
const noise = createNoise2D()
let planeVertices = plane.geometry.attributes.position.array
console.log(planeVertices.length)
// console.log(101 % 100)
if (planeVertices)
{
    const totalVertex = (planeWidth + 1)  * (planeHeight + 1)
    for (let i = 0; i < totalVertex; i++)
    {
        let xPos = i / (planeWidth + 1)
        let yPos = i % (planeWidth + 1)
        // Apply noise to z position
        // planeVertices[(3 * i) + 2] += noise[Math.floor(i / (planeWidth + 1))][i % (planeWidth + 1)]
        planeVertices[(3 * i) + 2] = (1 + noise(xPos/100, yPos/100)) * 10
        planeVertices[(3 * i) + 2] += (noise(xPos/10, yPos/10)) * 0.5
    }

}
plane.position.y += 0.1;

plane.rotateX(-Math.PI / 2)
// const edges = new THREE.EdgesGeometry( geom );
// const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial( { color: 0xffffff } ) );
// scene.add( line )
// line.rotateX(1/4)


// Render canvas
function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
}
animate();
// Creating a GUI with options.
const gui = new dat.GUI({name: 'My GUI'});
console.log(dat)

// Update canvas when resized
window.addEventListener('resize', ()=>{
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix();
    controls.update()
    renderer.setSize(window.innerWidth, window.innerHeight)
})


