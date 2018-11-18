class Spotlight extends THREE.SpotLight{
    
    constructor(x, y, z, radius, material, target = null){
        super();

        this.materialSpotLight = material[0];
        this.materialLight = material[1];
        this.radius = radius;

        // Create spotlight object
        
        var geometry_cone = new THREE.ConeGeometry(this.radius * 2 + 0.5, this.radius * 2, this.radius * 4, this.radius * 4, true);
        var mesh_cone = new THREE.Mesh(geometry_cone, this.materialSpotLight);
        
        mesh_cone.position.set(0, 0, 0);
        mesh_cone.rotation.x = Math.PI + Math.PI / 2;
        mesh_cone.rotation.z = Math.PI;

        //this.add(mesh_cone);

        var geometry_sphere = new THREE.SphereGeometry(this.radius, this.radius * 2, this.radius * 2, 0, Math.PI);
        this.mesh_sphere = new THREE.Mesh(geometry_sphere, this.materialLight);
        this.mesh_sphere.rotation.z = Math.PI / 2;
        this.mesh_sphere.rotation.y = Math.PI;

        //this.add(this.mesh_sphere);
        
        this.intensity = 0.8;

        this.defaultIntensity = this.intensity;

        this.castShadow = true;
        
        this.angle = 1/5 * Math.PI;
        
        this.shadow.camera.near = 0.1;
        this.shadow.camera.far = 100;
        this.shadow.camera.fov = 30;
        
        this.decay = 2;
        this.penumbra = 1;
        
        if(target != null){
            this.target = target;
            this.lookAt(x + target.position.x, y + target.position.y, z + target.position.z);
        }
        
        this.position.set(x, y, z);
    }

    toggleLight(){
        this.intensity = (this.intensity == 0 ? this.defaultIntensity : 0);
        this.mesh_sphere.material.color.set((this.mesh_sphere.material.color.getHex() == 0xcccc00 ? 0xffff4d : 0xcccc00));
    }
}
