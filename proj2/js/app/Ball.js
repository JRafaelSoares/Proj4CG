class Ball extends GraphicalEntity{
    
    constructor(x, y, z, radius, material, camera = null){
        super();
        
        this.radius = radius;
        
        /* Create Ball */
        var geometry = new THREE.SphereGeometry(this.radius, this.radius * 0.5, this.radius * 0.5);
        this.mesh = new THREE.Mesh(geometry, material);
        
        this.add(this.mesh);

        /* If there is a camera associated with the ball */
        if(camera != null){
            this.camera = camera;
            this.add(this.camera);

            this.camera.position.set(0, this.radius * 2, this.radius * -4);
            this.camera.lookAt(0, 0, 0);
        }

        this.position.set(x, y, z);

        this.speed = 0;

        /* Create axis helper */
        this.axisHelper = new THREE.AxesHelper(this.radius * 1.5);
        this.axisHelper.visible = true;

        this.add(this.axisHelper);
    }

    tryUpdate(t){

        var linearMove = this.speed * t;

        /* Rotate mesh around itself according to its speed */
        this.mesh.rotation.x += linearMove / this.radius;

        /* Position of the ball */
        var positions = [this.position.x, this.position.z];
        
        positions[0] += linearMove * Math.sin(this.rotation.y); // x
        positions[1] += linearMove * Math.cos(this.rotation.y); // z

        return positions;
        
    }

    update(t){

        var linearMove = this.speed * t;

        /* Rotate mesh around itself according to its speed */
        this.mesh.rotation.x += linearMove / this.radius;

        this.position.x += linearMove * Math.sin(this.rotation.y);
        this.position.z += linearMove * Math.cos(this.rotation.y);

    }

    rotateY(w) {
        this.rotation.y = w;
    }

    incrementSpeed(s) {
        this.speed += s;
        
        if(this.speed < 0.5){
            this.speed = 0;
        }
    }

    toggleAxisHelper() {
        this.axisHelper.visible = !this.axisHelper.visible;
    }
    
    get getRotationY() {
    	return this.rotation.y;
    }

    get getSpeed() {
        return this.speed;
    }
    
    setSpeed(s) {
        this.speed = s;

        if(this.speed < 0.5){
            this.speed = 0;
        }
    }
}
