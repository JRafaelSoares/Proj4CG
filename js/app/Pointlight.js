class Pointlight extends THREE.PointLight{
    
    constructor(x, y, z, target = null){
        super();

        this.intensity = 0.8;

        this.defaultIntensity = this.intensity;
                
        this.shadow.camera.near = 0.1;
        this.shadow.camera.far = 100;
        this.shadow.camera.fov = 30;
        
        this.decay = 2;
        
        this.position.set(x, y, z);
    }
    
    toggleLight(){
        this.intensity = (this.intensity == 0 ? this.defaultIntensity : 0);
    }
}
