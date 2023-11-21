import * as THREE from 'three'
import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';
import { animateAnything } from './animator.js';

console.clear();

let renderer = new CSS3DRenderer()
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 0, 0)

let frame = 0

let mouse = new THREE.Vector2()
let pmouse = new THREE.Vector2()
let mouseDown = false
let mouseDownTime = 0

console.log("Starting app load...")
setupRendering()

function setupRendering() {
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    setup()
    animate()
}

function setup() {
    document.body.style.backgroundColor="#001a79"
    scene.add(camera)

    const video_preparation = new CSS3DObject(document.getElementById("section-preparation"))
    video_preparation.rotateY((Math.PI*2)*0.0)
    video_preparation.translateZ(-750)
    scene.add(video_preparation)

    const video_preparation2 = new CSS3DObject(document.getElementById("section-sustainability"))
    video_preparation2.rotateY((Math.PI*2)*0.2)
    video_preparation2.translateZ(-750)
    scene.add(video_preparation2)
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    frame++
}

function onMouseMove(event) {
    //event.preventDefault();

    pmouse.x = mouse.x
    pmouse.y = mouse.y

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    if (mouseDown) {
        camera.rotateY(mouse.x - pmouse.x)
    }
}

function onMouseDown(event) {
    mouseDown = true

    if (event.timeStamp - mouseDownTime < 200) {
        
    }

    mouseDownTime = event.timeStamp
}

function onMouseUp(event) {
    mouseDown = false


        if (event.timeStamp - mouseDownTime < 90) {

        }
    
}

function onWindowResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

window.addEventListener("resize", onWindowResize)
window.addEventListener('mousemove', onMouseMove);
window.addEventListener("mousedown", onMouseDown)
window.addEventListener("mouseup", onMouseUp)

