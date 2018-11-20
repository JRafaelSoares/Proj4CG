class Ball extends GraphicalEntity{
    
    constructor(x, y, z, radius, circleRadius, material){
        super();

        this.radius = radius;
        this.circleRadius = circleRadius;

        this.freq = 0.1;
        this.w = 0;
        this.attrition = 0.5;
        this.acceleration = 0;
        this.defaultAcceleration = 0.5;

        // Create inner ball
        var geometry = new THREE.SphereGeometry(this.radius, this.radius * 1, this.radius * 1);
        this.mesh = new THREE.Mesh(geometry, material);

        // Create ball
        this.ball = new THREE.Object3D();
        this.ball.add(this.mesh);
        this.add(this.ball);

        this.position.set(x, y, z);

        /* Create axis helper */
        this.axisHelper = new THREE.AxesHelper(this.radius * 1.5);
        this.axisHelper.visible = true;

        this.add(this.axisHelper);
    }

    update(t){
        
        // movement of the ball
        var actualAcceleration = this.acceleration - this.attrition * this.w;
        this.w += actualAcceleration * t;

        var angleMoved = this.w * t + 0.5 * actualAcceleration * t * t;
        this.rotation.y += angleMoved;

        var linearMove = angleMoved * this.circleRadius;
        
        // Rotate mesh around itself according to its speed 
        this.ball.rotation.z -= linearMove / this.radius;
        

        // this.w max : this.acceleration/this.attrtion = 1
        if(this.w > 0.99){
            this.w = 1;
        }
        else if(this.w < 0.01 && this.w > -0.01){
            this.w = 0;
        }
        this.position.x = this.circleRadius * Math.sin(this.rotation.y);
        this.position.z = this.circleRadius * Math.cos(this.rotation.y);

        
    }

    toggleAxisHelper() {
        this.axisHelper.visible = !this.axisHelper.visible;
    }

    toggleMovement(){
        this.acceleration = (this.acceleration == 0 ? this.defaultAcceleration : 0);
    }
}
