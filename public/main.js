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
let touchdist = 0
let doubletouch = false
let gyroON = false
let gyroRot = 0

console.log("Starting app load...")
setupRendering()

function setupRendering() {
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    setup()
    animate()
}

function setup3Dobject(objID, rotation)
{
    const obj = new CSS3DObject(document.getElementById(objID))
    obj.rotateY((Math.PI*2)*rotation)
    obj.translateZ(-750)
    scene.add(obj)
}

function setup() {
    document.body.style.backgroundColor="#001a79"
    scene.add(camera)

    setup3Dobject("section-preparation", -0.2)
    setup3Dobject("section-sustainability", 0.0)
    setup3Dobject("section-catching", -0.4)

    /*const preparation = new CSS3DObject(document.getElementById("section-preparation"))
    preparation.rotateY((Math.PI*2)*-0.2)
    preparation.translateZ(-750)
    scene.add(preparation)

    const sustainability = new CSS3DObject(document.getElementById("section-sustainability"))
    sustainability.rotateY((Math.PI*2)*0.0)
    sustainability.translateZ(-750)
    scene.add(sustainability)

    const catching = new CSS3DObject(document.getElementById("section-catching"))
    catching.rotateY((Math.PI*2)*-0.4)
    catching.translateZ(-750)
    scene.add(catching)*/
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

function onMouseScroll(event) {
    camera.setFocalLength(camera.getFocalLength() - (event.deltaY / 100))
}

function onFingerMove(event) {
    if (event.touches.length == 1 && !doubletouch) {
        pmouse.x = mouse.x
        pmouse.y = mouse.y

        mouse.x = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;

        camera.rotateY(mouse.x - pmouse.x)
    }
    else if (event.touches.length == 2) {
        let tmptouchdist = Math.abs(event.touches[0].clientX - event.touches[1].clientX) / 50
        let diff = tmptouchdist - touchdist
        camera.setFocalLength(camera.getFocalLength() + diff)
        touchdist = tmptouchdist
    }
}

function onFingerDown(event) {
    mouse.x = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
    
    if (event.touches.length == 2) {
        doubletouch = true
        touchdist = Math.abs(event.touches[0].clientX - event.touches[1].clientX) / 50
    }
}

function onFingerUp(event) {
    if (event.touches.length == 0) {
        doubletouch = false
    }
}

function onWindowResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

function gyroRotate(event) {
    if (gyroON) {
        if (gyroRot != 0)
        {
            let diff = event.alpha / 60 - gyroRot
            if (Math.abs(diff) > 0.1)
            {
                diff = (diff / Math.abs(diff)) * 0.1
            }
            camera.rotateY(diff)
        }
        gyroRot = event.alpha / 60
    }
}

function enableGyro() {
    if (gyroON) {
        gyroON = false
    }
    else {
        gyroON = true
    }
}

function isMobile() {
    const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
  }

window.addEventListener("resize", onWindowResize)
window.addEventListener('mousemove', onMouseMove);
window.addEventListener("mousedown", onMouseDown)
window.addEventListener("mouseup", onMouseUp)
window.addEventListener("wheel", onMouseScroll)
window.addEventListener("touchmove", onFingerMove)
window.addEventListener("touchstart", onFingerDown)
window.addEventListener("touchend", onFingerUp)
if (isMobile() && window.DeviceMotionEvent) {
    document.getElementById("gyrobutton").addEventListener("click", enableGyro)
    window.addEventListener("deviceorientation", gyroRotate, false)
}
else {
    document.getElementById("gyrobutton").remove();
}
