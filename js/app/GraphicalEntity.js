class GraphicalEntity extends THREE.Object3D {

	constructor(){
		super();

        // X, Y, Z
        this.rotationSpeed = [0, 0, 0];

	}

    update(t){

        this.rotation.x += this.rotationSpeed[0] * t;
        this.rotation.y += this.rotationSpeed[1] * t;
        this.rotation.z += this.rotationSpeed[2] * t;

    }

    setRotationSpeedX(x){
        this.rotationSpeed[0] = x;
    }

    setRotationSpeedY(y){
        this.rotationSpeed[1] = y;
    }

    setRotationSpeedZ(z){
        this.rotationSpeed[2] = z;
    }
    

    rotateX(w) {
        this.rotation.x = w;
    }

    get getRotationX() {
    	return this.rotation.x;
    }

    rotateY(w) {
        this.rotation.y = w;
    }

    get getRotationY() {
        return this.rotation.y;
    }

    rotateZ(w) {
        this.rotation.z = w;
    }

    get getRotationZ() {
        return this.rotation.z;
    }
}