class Main {

    constructor(){
        'use strict';
        
        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        });

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;

        document.body.appendChild(this.renderer.domElement);
        
        this.defaultWidth = 600;
        this.defaultHeight = 1200;

        this.createCamera();
        this.createScene();

        this.clock = new THREE.Clock();
        
        this.animate();
    }

    createScene() {
        'use strict';
        
        //Main scene (0) and Pause (1)
        this.scenes = new Array(2);
        
        this.scenes[0] = new THREE.Scene();

        //Active (0) or Paused (1)
        this.mode = 0;

        // Intensity of the sun
        this.baseIntensity = 1;

        this.axisHelper = new THREE.AxesHelper(200);
        this.axisHelper.visible = false;
        this.scenes[0].add(this.axisHelper);
        

        // Materials 
        this.greyPhongMaterial = new THREE.MeshPhongMaterial( {color: 0x999999});
        this.greyGouraudMaterial = new THREE.MeshLambertMaterial( {color: 0x999999}); 
        this.greyBasicMaterial = new THREE.MeshBasicMaterial({ color: 0x999999, wireframe: false});

        //var greyMaterials = [greyPhongMaterial, greyGouraudMaterial, greyBasicMaterial];

        //this.materialInstances = greyMaterials;
        
        // Field

        this.field = new Field(0, 0, 0, 100, this.greyPhongMaterial);

        this.scenes[0].add(this.field);

        // Sun Directional Light 
        this.sun = new Sun(200, 200, 0, 0xffffff, this.baseIntensity);

        this.scenes[0].add(this.sun);
        
        
        // Create Spotlight
        var materialSpotlight = new THREE.MeshBasicMaterial({color: 0x666666});
        var materialLight = new THREE.MeshBasicMaterial({color: 0xffff33});
        materialSpotlight.side = THREE.DoubleSide;
        
        this.spotlight = new Spotlight(50, 50, 50, 5, [materialSpotlight, materialLight]);
        
        this.scenes[0].add(this.spotlight);

        //Pause scene and objects

        
        this.scenes[1] = new THREE.Scene();
        /*

        var loader = new THREE.FontLoader();

        loader.load( 'js/app/fonts/optimer_regular.typeface.json', function ( font ) {

            this.pause_text = new THREE.TextBufferGeometry( 'PAUSED', {
                font: font,
                size: 80,
                height: 5,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 10,
                bevelSize: 8,
                bevelSegments: 5
            } );
        } );
        
        this.pause_text.position.set(0,0,0);

        */

    }

    createCamera() {
        'use strict';

        this.cameraList = new Array(2);
        //cameraList[0]: Pespective
        //cameraList[1]: Ortographic
        
        this.cameraList[0] = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000); 

        this.cameraList[0].position.set(200, 200, 100);

        this.cameraList[0].lookAt(0, 0, 0);


        this.cameraList[1] = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 1, 1000);

        this.cameraList[1].position.set(0, 200, 0);

        this.cameraList[1].lookAt(0, 0, 0);


        this.resizeEvent();

    }

    render() {
        'use strict';
        this.renderer.render(this.scenes[this.mode], this.cameraList[this.mode]);
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

            if(this.defaultAspectRatio >= this.windowRatio){

                //Ortogonal camera 
                this.cameraList[1].top = (this.defaultWidth * (1 / this.windowRatio)) / 2;
                this.cameraList[1].bottom = -(this.defaultWidth * (1 / this.windowRatio)) / 2;

            }
            else {

                //Ortogonal camera
                this.cameraList[1].left = -(this.defaultHeight * this.windowRatio) / 2; 
                this.cameraList[1].right = (this.defaultHeight * this.windowRatio) / 2; 

            }


            this.cameraList[0].aspect = this.windowRatio;
            
            for (var i = 0; i < 2; i++){
                this.cameraList[i].updateProjectionMatrix();
            }
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
                //Pause
                this.mode = (this.mode == 0 ? 1 : 0);
                //this.mode = !this.mode;
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
