class Field extends GraphicalEntity {

    constructor(x, y, z, side, materials, camera = null){
        super();

        this.baseMaterial = materials[0];
        this.basicMaterial = materials[1];

        var geometry = new THREE.CubeGeometry(side, 10, side);
        
        /* Create Base */
        this.base = new THREE.Mesh(geometry, this.baseMaterial);

        this.add(this.base);

        this.base.position.set(0, -5, 0);
        
        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
    }

    toggleWireframe(){        
            this.base.material.wireframe = !this.base.material.wireframe;
    }

    toggleLightCalculation(){
        this.base.material = (this.base.material == this.basicMaterial ? this.baseMaterial : this.basicMaterial);
    }
}