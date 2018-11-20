class Cube extends GraphicalEntity {

    constructor(x, y, z, side, materials){
        super();

        this.materials = materials;

        var geometry = new THREE.CubeGeometry(side, side, side);

        this.currentMaterial = 0;

        this.previousMaterial = 0;
        
        this.cube = new THREE.Mesh(geometry, this.selectMaterial(this.currentMaterial));

        this.add(this.cube);
        
        this.position.set(x, y, z);
        
    }


    toggleWireframe(){

        if(this.materials.length != undefined){
            for(var i = 0; i < this.materials.length; i++){
                if(this.materials[i].length != undefined){
                    var newState = !this.materials[i][0].wireframe;

                    for(var j = 0; j < this.materials[i].length; j++){
                        this.materials[i][j].wireframe = newState;
                    }
                }
                else{
                    this.materials[i].wireframe = !this.materials[i].wireframe;
                }
            }
        }
        else{
            this.materials.wireframe = !this.materials.wireframe;
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
