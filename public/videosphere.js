import { Mesh, MeshBasicMaterial, Object3D, PlaneGeometry, SRGBColorSpace, SphereGeometry, TextureLoader, VideoTexture } from "three";

class VideoSphere extends Mesh {

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
        this.video.muted = true
        this.video.playsinline = true
        this.video.style.display = "none"
        document.body.appendChild(this.video)

        //CREATE VIDEO TEXTURE
        const texture = new VideoTexture( this.video );
	    texture.colorSpace = SRGBColorSpace;
        //CREATE THE GEOMETRY
        this.geometry = new SphereGeometry(50,32,16);
        this.geometry.scale(1,1,-1)
        this.geometry.rotateY(Math.PI)
        this.material = new MeshBasicMaterial( { map:texture } );

        this.playing = startPlaying
        this.play(this.playing)

        this.name = name
    }

    play(playVideo){
        if(playVideo){
            this.video.play()
            this.playing = true
        }else{
            this.video.pause()
            this.playing = false
        }
    }
}

export { VideoSphere }