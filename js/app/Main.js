class Main {

    constructor(){
        'use strict';
        
        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        });

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;

        document.body.appendChild(this.renderer.domElement);
        
        this.createCamera();
        this.createScene();

        this.clock = new THREE.Clock();
        
        this.animate();
    }

    createScene() {
        'use strict';
        
        this.scene = new THREE.Scene();

        // Intensity of the sun
        this.baseIntensity = 1;

        this.axisHelper = new THREE.AxesHelper(200);
        this.axisHelper.visible = false;
        this.scene.add(this.axisHelper);
        

        // Materials 
        this.greyPhongMaterial = new THREE.MeshPhongMaterial( {color: 0x999999});
        this.greyGouraudMaterial = new THREE.MeshLambertMaterial( {color: 0x999999}); 
        this.greyBasicMaterial = new THREE.MeshBasicMaterial({ color: 0x999999, wireframe: false});

        //var greyMaterials = [greyPhongMaterial, greyGouraudMaterial, greyBasicMaterial];

        //this.materialInstances = greyMaterials;
        
        // Field

        this.field = new Field(0, 0, 0, 100, this.greyPhongMaterial);

        this.scene.add(this.field);

        // Sun Directional Light 
        this.sun = new Sun(200, 200, 0, 0xffffff, this.baseIntensity);

        this.scene.add(this.sun);
        
        
        // Create Spotlight
        var materialSpotlight = new THREE.MeshBasicMaterial({color: 0x666666});
        var materialLight = new THREE.MeshBasicMaterial({color: 0xffff33});
        materialSpotlight.side = THREE.DoubleSide;
        
        this.spotlight = new Spotlight(50, 50, 50, 5, [materialSpotlight, materialLight]);
        
        this.scene.add(this.spotlight);
        
    }

    createCamera() {
        'use strict';

        this.camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000); 

        this.camera.position.set(200,200,100);

        this.camera.lookAt(0,0,0);

        this.resizeEvent();

    }

    render() {
        'use strict';
        this.renderer.render(this.scene, this.camera);
    }


    animate() {
        'use strict';

        this.update();
        
        this.render();
        
        requestAnimationFrame(() => this.animate());
    }


    resizeEvent() {
        'use strict';

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        
        this.windowRatio = window.innerWidth / window.innerHeight;
        
        if (window.innerHeight > 0 && window.innerWidth > 0) {

            this.camera.aspect = this.windowRatio;
            
            this.camera.updateProjectionMatrix();
        }


    }

    keyboardDownEvent(k) {
        'use strict';

        switch(k) {
            case 66: //B 
                //Stop the ball movement
                break;

            case 68: //D
                this.toggleNightMode();
                break;

            case 71: //G
                this.toggleShadingType();
                break;
            
            case 76: //L
                this.toggleLightCalculation();
                break;
            
            case 80: //P
                this.spotlight.toggleLight();
                break;
            
            case 82: //R
                //Restart game if on pause;
                break;
            
            case 83: //S
                //Pause Game
                break;
            
            case 87: //W
                this.toggleWireframe();
                break;
        }

    }


    update(){

        var t = this.clock.getDelta();

    }

    toggleNightMode(){
        this.sun.toggleNightMode();
    }

    toggleLightCalculation(){
        //Apply to new objects;
    }
   

    toggleWireframe(){
        /*
        for(var i = 0; i < this.materialInstances.length; i++){
            for(var j = 0; j < this.materialInstances[i].length; j++){
                this.materialInstances[i][j].wireframe = !this.materialInstances[i][j].wireframe;

                console.log(this.materialInstances[i][j].wireframe);
            }
        }
        */
    }
}
