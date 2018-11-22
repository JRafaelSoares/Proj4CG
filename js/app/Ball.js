class Ball extends GraphicalEntity{
    
    constructor(x, y, z, radius, circleRadius, materials){
        super();

        this.baseMaterial = materials[0];
        this.basicMaterial = materials[1];

        this.radius = radius;
        this.circleRadius = circleRadius;

        this.w = 0;
        this.attrition = 0.5;
        this.acceleration = 0;
        this.defaultAcceleration = 0.5;

        // Create inner ball
        var geometry = new THREE.SphereGeometry(this.radius, this.radius * 1, this.radius * 1);
        this.mesh = new THREE.Mesh(geometry, this.baseMaterial);

        // Create ball
        this.ball = new THREE.Object3D();
        this.ball.add(this.mesh);
        this.add(this.ball);

        this.position.set(x, y, z);

        /* Create axis helper 
        this.axisHelper = new THREE.AxesHelper(this.radius * 1.5);
        this.axisHelper.visible = true;

        this.add(this.axisHelper);
        */
        
    }

    update(t){
        
        // Movement of the ball
        var actualAcceleration = this.acceleration - this.attrition * this.w;
        this.w += actualAcceleration * t;

        var angleMoved = this.w * t + 0.5 * actualAcceleration * t * t;
        this.rotation.y += angleMoved;

        var linearMove = angleMoved * this.circleRadius;
        
        // Rotate mesh around itself according to its speed 
        this.ball.rotation.z -= linearMove / this.radius;
        
        this.position.x = this.circleRadius * Math.sin(this.rotation.y);
        this.position.z = this.circleRadius * Math.cos(this.rotation.y);

        
    }

    toggleAxisHelper() {
        this.axisHelper.visible = !this.axisHelper.visible;
    }

    toggleMovement(){
        this.acceleration = (this.acceleration == 0 ? this.defaultAcceleration : 0);
    }

    toggleWireframe(){        
        this.mesh.material.wireframe = !this.mesh.material.wireframe;
    }

    toggleLightCalculation(){
        this.mesh.material = (this.mesh.material == this.basicMaterial ? this.baseMaterial : this.basicMaterial);
    }
}
