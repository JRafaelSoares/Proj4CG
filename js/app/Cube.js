class Cube extends GraphicalEntity {

    constructor(x, y, z, side, materials){
        super();

        this.materials = materials;

        var geometry = new THREE.CubeGeometry(side, side, side);

        this.currentMaterial = 0;

        this.previousMaterial = 0;
        
        this.cube = new THREE.Mesh(geometry, this.selectMaterial(this.currentMaterial));

        this.add(this.cube);
        
        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
        
    }


    toggleWireframe(){

        if(this.cube.material.length != undefined){
            var newState = !this.cube.material[0].wireframe;

            for(var i = 0; i < this.cube.material.length; i++){
                this.cube.material[i].wireframe = newState;
            }
        }
        else{
            this.cube.material.wireframe = !this.cube.material.wireframe;
        }
        
    }


    // Assumes basic material is the last one in the array of materials
    toggleLightCalculation(){

        this.currentMaterial = (this.currentMaterial != this.materials.length - 1) ? this.materials.length - 1 : this.previousMaterial;

        this.cube.material = this.selectMaterial(this.currentMaterial);
    }

    selectMaterial(i){
        if(this.materials[i] == undefined){
            return this.materials;
        }

        return this.materials[i];
    }

}
