class Field extends GraphicalEntity {

    constructor(x, y, z, side, material, camera = null){
        super();

        this.baseMaterial = material;

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