import { Mesh, MeshBasicMaterial, Object3D, PlaneGeometry, SRGBColorSpace, TextureLoader, Vector3, VideoTexture } from "three";

class VideoPlane extends Mesh {

    defaultPosition = new Vector3()
    defaultRotation = new Vector3()
    defaultScale = new Vector3()

    video
    playing = false

    constructor(name, startPlaying, url) {
        super()
        //CREATE VIDEO ELEMENT AND APPEND IT TO DOM
        this.video = document.createElement("video")
        this.video.src = url
        this.video.type = "video/mp4"
        this.video.loop = true
        this.video.autoplay = true
        this.video.allowfullscreen = false
        this.video.muted = true
        this.video.playsinline = true
        this.video.style.display = "none"
        document.body.appendChild(this.video)

        //CREATE VIDEO TEXTURE
        const texture = new VideoTexture( this.video );
	    texture.colorSpace = SRGBColorSpace;

        //CREATE THE GEOMETRY
        this.geometry = new PlaneGeometry(1.6, 0.9);
        this.material = new MeshBasicMaterial( { map:texture } ); 

        this.playing = startPlaying
        this.play(this.playing)

        this.name = name
    }

    play(toggle){
        if(toggle == true){
            this.video.play()
            this.playing = true
        }else{
            this.video.pause()
            this.playing = false
        }
    }

    fullscreen(toggle){
        if(toggle == true){
            this.video.style.display = "inline"
            this.video.style.position = "absolute"
            this.video.style.left = "4vw"                           //Later set to 0
            this.video.style.top = "calc(50vh - ((92vw/16)*9)/2)"   //Later set to 100vw
            this.video.style.width = "92vw"                         //Later set to 100vw
            this.video.controlsList="nodownload nofullscreen disablepictureinpicture"
            this.video.controls = true

            //this.video.requestFullscreen()

            
        }else{
            this.video.style = "display:none"
        }
    }
}

export { VideoPlane }