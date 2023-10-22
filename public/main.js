import * as THREE from 'three'
import { GLTFLoader } from "./jsm/loaders/GLTFLoader.js"
import { AmbientLight, DirectionalLight, MeshNormalMaterial, Object3D, Vector3 } from 'three'
import { VideoPlane } from './videoplane.js';
import { VideoSphere } from './videosphere.js';
import { animateAnything } from './animator.js';
import { Card } from './card.js';
import { TEXTURES } from './constants.js';
import { Button } from './button.js';

//import { default as config } from './data/config.json' assert { type: 'json' };

console.clear();

let renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 0, 0)

let frame = 0

let mouse = new THREE.Vector2()
let pmouse = new THREE.Vector2()
let mouseDown = false
let mouseDownTime = 0
const raycaster = new THREE.Raycaster()

let fullscreenVideo

console.log("Starting app load...")
setupRendering()

function setupRendering() {
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(2)

    renderer.shadowMap.enabled = true;
    renderer.shadowCameraNear = 0.5;
    renderer.shadowCameraFar = 500;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    document.body.appendChild(renderer.domElement)

    setup()
}

function setup() {
    scene.background = new THREE.Color(0.1, 0.1, 0.1)
    scene.add(camera)

    const light_ambient = new AmbientLight(0xffffff);
    light_ambient.intensity = 0.5;
    scene.add(light_ambient);

    const vid = new VideoPlane("video", false, "LobsterImmersiveExperienceDevelopment/FinalLobsterImmersiveExperience/1%20-%20BoatTrip/1.%20Preparation&SettingPots/PreparationSettingPots_OPT.mp4")
    vid.position.z = -3
    scene.add(vid)

    const vid2 = new VideoPlane("video", true, "LobsterImmersiveExperienceDevelopment%5CFinalLobsterImmersiveExperience%5C1%20-%20BoatTrip%5C2.%20CatchingLobster%5CCatchingLobster_OPT.mp4")
    vid2.position.z = -3
    vid2.position.x = 2
    scene.add(vid2)

    const vid3 = new VideoPlane("video", false, "LobsterImmersiveExperienceDevelopment%5CFinalLobsterImmersiveExperience%5C1%20-%20BoatTrip%5C3.%20LobsterFishing%5CLobsterFishing_OPT.mp4")
    vid3.position.z = -3
    vid3.position.x = -2
    scene.add(vid3)

    const sphere = new VideoSphere("sphere", true, "LobsterImmersiveExperienceDevelopment/FinalLobsterImmersiveExperience/1%20-%20BoatTrip/1.%20Preparation&SettingPots/PreparationSettingPots_OPT.mp4")
    scene.add(sphere)
    sphere.play(true)

    const card = new Card("card", "exports/card_front.png", "exports/card_back.png")
    card.translateZ(-3)
    card.translateY(1.3)
    scene.add(card)

    const button = new Button("button", "exports/button.png")
    button.translateZ(-3)
    button.translateY(-1)
    scene.add(button)

    renderer.setAnimationLoop(draw);

    console.log("App loaded.")

    
    //animateAnything(vid, "translateY", 1000, [vid.position.y], [1])
    //animateAnything(document, "title", 2000, [0], [100])
}

function draw() {
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

    //console.log(mouse.distanceTo(pmouse))


}

function onMouseDown(event) {
    mouseDown = true

    if (event.timeStamp - mouseDownTime < 200) {
        raycaster.setFromCamera(mouse, camera)
        const intersection = raycaster.intersectObjects(scene.children);
        if (intersection.length > 0) {
            const object = intersection[0].object;

            if (object.name == "video") {
                if (fullscreenVideo) {
                    fullscreenVideo.fullscreen(false)
                    fullscreenVideo = null

                } else {
                    fullscreenVideo = object
                    fullscreenVideo.fullscreen(true)
                }
            }
        }
    }

    mouseDownTime = event.timeStamp
}

function onMouseUp(event) {
    mouseDown = false

    raycaster.setFromCamera(mouse, camera)
    const intersection = raycaster.intersectObjects(scene.children);

    if (intersection.length > 0) {
        let object = intersection[0].object;

        if (event.timeStamp - mouseDownTime < 90) {

            if (object.name == "video") {
                if (object.playing) {
                    object.play(false)
                } else {
                    object.play(true)
                }
            }
            if (object.name == "card") {
                object = object.parent
                if(object.frontFacing){
                    animateAnything(object, "rotateX", 300,0, [0], [Math.PI])
                    object.frontFacing = false
                }else{
                    animateAnything(object, "rotateX", 300,0, [0], [Math.PI])
                    object.frontFacing = true
                }
            }
            if (object.name == "button") {
                animateAnything(object, "translateZ", 65,0, [0], [-0.1])
                animateAnything(object, "translateZ", 65,75, [0], [0.1])
                object.pressed = true

                //animateAnything(document, "title", 1000, 0, [0], [100])
                //animateAnything(console, "log", 1000, 0, [0], [1])
            }

        }
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