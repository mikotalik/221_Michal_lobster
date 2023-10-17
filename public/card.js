import { Mesh, MeshBasicMaterial, Object3D, PlaneGeometry, SRGBColorSpace, TextureLoader, Vector3, VideoTexture } from "three";

class Card extends Mesh {

    frontFacing = true

    defaultPosition = new Vector3()
    defaultRotation = new Vector3()
    defaultScale = new Vector3()

    constructor(name, frontImage, backImage) {
        super()

        //LOAD TEXTURES
        const frontTexture = new TextureLoader().load(frontImage)
        const backTexture = new TextureLoader().load(backImage)

        //CREATE THE GEOMETRY
        let frontGeometry = new PlaneGeometry(1.6,0.9,1)
        let frontMaterial = new MeshBasicMaterial({ map:frontTexture, transparent:true, opacity:0.7});

        let backGeometry = new PlaneGeometry(1.6,0.9,1)
        let backMaterial = new MeshBasicMaterial({ map:backTexture, transparent:true, opacity:0.7});

        let frontMesh = new Mesh(frontGeometry, frontMaterial)

        let backMesh = new Mesh(backGeometry, backMaterial)
        backMesh.rotateX(Math.PI)

        frontMesh.name = name
        backMesh.name = name

        this.add(frontMesh)
        this.add(backMesh)

        this.name = name
    }

}

export { Card }