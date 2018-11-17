class Ball extends GraphicalEntity{
    
    constructor(x, y, z, radius, circleRadius, frequency, material){
        super();
        
        this.radius = radius;
        this.circleRadius = circleRadius;
        this.freq = frequency;
        
        /* Create Ball */
        var geometry = new THREE.SphereGeometry(this.radius, this.radius * 0.5, this.radius * 0.5);
        this.mesh = new THREE.Mesh(geometry, material);
        
        this.add(this.mesh);

        this.position.set(x, y, z);

        this.speed = 2*Math.PI * this.radius * this.getT;
        this.w = 2*Math.PI * this.freq;
        this.a = 5;

        /* Create axis helper */
        this.axisHelper = new THREE.AxesHelper(this.radius * 1.5);
        this.axisHelper.visible = true;

        this.add(this.axisHelper);
    }

    update(t){

        var linearMove = this.speed * t;
        this.rotation.y += this.w*t + this.a*t*t/2;
        /* Rotate mesh around itself according to its speed */
        //this.mesh.rotation.x = linearMove / this.radius;
        
        this.position.x = this.circleRadius * Math.sin(this.rotation.y);
        this.position.z = this.circleRadius * Math.cos(this.rotation.y);


    }

    toggleAxisHelper() {
        this.axisHelper.visible = !this.axisHelper.visible;
    }

    toggleMovement(){
        this.a = -this.a;
    }

    toggleAcceleration(){

    }
}
