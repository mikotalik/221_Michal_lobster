import { Mesh, MeshBasicMaterial, Object3D, PlaneGeometry, SRGBColorSpace, TextureLoader, Vector3, VideoTexture } from "three";

class Button extends Mesh {

    pressed = false

    defaultPosition = new Vector3()
    defaultRotation = new Vector3()
    defaultScale = new Vector3()

    constructor(name, image) {
        super()

        //LOAD TEXTURES
        const texture = new TextureLoader().load(image)

        //CREATE THE GEOMETRY
        this.geometry = new PlaneGeometry(0.8,0.45,1)
        this.material = new MeshBasicMaterial({ map:texture, transparent:true, opacity:0.7});

        this.name = name
    }

}

export { Button }