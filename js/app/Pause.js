class Pause extends GraphicalEntity{
    
    constructor(x, y, z, width, height, material){
        super();
        /* Create Pause Screen */

        var pause_geometry = new THREE.PlaneGeometry(width, height);

        this.mesh = new THREE.Mesh(pause_geometry, material);

        this.add(this.mesh);

        this.position.set(x, y, z);
    }   
}
