import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.set(0, 0, 40);
const controls = new OrbitControls( camera, renderer.domElement );
controls.update()

const scene = new THREE.Scene();

// Add grid
const gridSize = 100;
const gridDivisions = 100;
const gridHelper = new THREE.GridHelper( gridSize, gridDivisions );
scene.add( gridHelper );

const sphereGeom = new THREE.SphereGeometry( 1, 32, 16 );
const sphereMaterial = new THREE.MeshPhysicalMaterial();
const sphere = new THREE.Mesh( sphereGeom, sphereMaterial );
sphere.position.set(0, 0, 1)
scene.add(sphere)
const light = new THREE.PointLight(0xffffff,1);
light.position.set(10, 10, 10)
scene.add(light);

const vertices = []
const indices = []

const col = 10;
const row = 2;

const meshWidth = 1;
const meshHeight = 1;

const anchorX = 0;
const anchorY = 0;

const offSetX = anchorX - (meshWidth * col) / 2
const offSetY = anchorY - (meshHeight * row) / 2

const amplitude = 2

for (let i = 0; i < row + 1; i++) {
    for (let j = 0; j < col + 1; j++) {
        let posX = offSetX + (j * meshWidth)
        let posY = offSetY + (i * meshHeight)
        let posZ = 1 + Math.random() * amplitude
        vertices.push(posX, posY, posZ) // Add vertex (x, y ,z) components
    }
}
console.log(vertices)

for (let i = 0; i < row; i++) {
    const currentRowIndex = i * (col + 1);
    const nextRowIndex = (i + 1) * (col + 1);
    for (let j = 0; j < col; j++) {
        indices.push(currentRowIndex + j + 1, nextRowIndex + j, currentRowIndex + j)
        indices.push(nextRowIndex + j + 1, nextRowIndex + j, currentRowIndex + j + 1)
    }
}


console.log(indices)
const geom = new THREE.BufferGeometry()
geom.setIndex(indices)
geom.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3))

// const mat = new THREE.MeshPhysicalMaterial();
const mat = new THREE.MeshPhysicalMaterial();
mat.side = THREE.DoubleSide;
// const mesh = new THREE.Mesh(geom, mat)
// scene.add(mesh)
// scene.add(light);
// mesh.rotateX(1/4)

const planeGeom = new THREE.PlaneGeometry(100, 100, 100, 100)
const planeMat = new THREE.MeshBasicMaterial({wireframe: true, color: 0x00ffff})
// const planeMat = new THREE.MeshPhysicalMaterial()
const plane = new THREE.Mesh(planeGeom, planeMat)
scene.add(plane)

let planeVertices = plane.geometry.attributes.position.array
if (planeVertices)
{
    for (let i = 0; i < planeVertices.length; i += 3)
    {
        // planeVertices[3 * i]
        planeVertices[(3 * i) + 2] += Math.random()
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

// Update canvas when resized
window.addEventListener('resize', ()=>{
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix();
    controls.update()
    renderer.setSize(window.innerWidth, window.innerHeight)
})


