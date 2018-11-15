class Field extends GraphicalEntity {

    constructor(x, y, z, side, material, camera = null){
        super();

        this.baseMaterial = material;
        /* If there is a camera associated with this field */
        /*
        if(camera != null){
            this.camera = camera;
            this.add(this.camera);

            this.camera.position.set(-this.baseWidth / 1.2, diagonal / 10 * 4, -this.baseHeight / 1.2);
            this.camera.lookAt(0, 0, 0);
        }
        */

        var geometry = new THREE.CubeGeometry(side, 10, side);
        
        /* Create Base */
        this.base = new THREE.Mesh(geometry, this.baseMaterial);

        this.add(this.base);

        this.base.position.set(0, -5, 0);
        
        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
        
    }

}