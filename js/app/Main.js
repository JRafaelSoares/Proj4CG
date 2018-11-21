class Main {

    constructor(){
        'use strict';
        
        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        });

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;

        document.body.appendChild(this.renderer.domElement);
        
        this.defaultWidth = 1152;
        this.defaultHeight = 648;

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
        this.pause = 0;

        // Intensity of the sun
        this.baseIntensity = 1;

        this.axisHelper = new THREE.AxesHelper(200);
        this.axisHelper.visible = false;
        this.scenes[0].add(this.axisHelper);
        

        // Materials 
        this.greyPhongMaterial = new THREE.MeshPhongMaterial({color: 0x999999});
        this.greyGouraudMaterial = new THREE.MeshLambertMaterial({color: 0x999999}); 
        this.greyBasicMaterial = new THREE.MeshBasicMaterial({color: 0x999999, wireframe: false});

        // Field

        var fieldTexture = new THREE.TextureLoader().load('textures/chess_table.jpg');
        this.fieldPhongMaterial = new THREE.MeshPhongMaterial({color: 0xffffff, shininess: 0.01, map: fieldTexture, wireframe: false});
        this.fieldBasicMaterial = new THREE.MeshBasicMaterial({map: fieldTexture, wireframe: false});

        this.field = new Field(0, 0, 0, 500, [this.fieldPhongMaterial, this.fieldBasicMaterial]);

        this.scenes[0].add(this.field);

        var geometry = new THREE.CubeGeometry(60, 60, 60);

        var faceFiles = ['GreenFace.png', 'BlueFace.png',
            'WhiteFace.png', 'YellowFace.png',
            'OrangeFace.png', 'RedFace.png'];

        var loader = new THREE.TextureLoader();
        loader.setPath('textures/');

        var cubeTextures = new Array(6);
        var cubeTexturesNoLight = new Array(6);

        var bMap = loader.load("BumpMap.png");

        for(var i = 0; i < 6; i++){
            cubeTextures[i] = new THREE.MeshPhongMaterial({color: 0xffffff, map: loader.load(faceFiles[i]), bumpMap: bMap, bumpScale: 200});
            cubeTexturesNoLight[i] = new THREE.MeshBasicMaterial({color: 0xffffff, map: loader.load(faceFiles[i])});
        }

        this.side = 60;
        
        this.cube = new Cube(0, 0, 0, this.side, [cubeTextures, cubeTexturesNoLight]);

        this.scenes[0].add(this.cube);

        //Ball

        var ballTexture = new THREE.TextureLoader().load('textures/ball.jpg');
        var ballPhongMaterial = new THREE.MeshPhongMaterial({specular:0xffffff , shininess: 4, map: ballTexture, wireframe: false});
        var ballBasicMaterial = new THREE.MeshBasicMaterial({map: ballTexture, wireframe: false});

        this.ballRadius = 20;
        this.ball = new Ball(0, this.ballRadius, -100, this.ballRadius, 100, [ballPhongMaterial, ballBasicMaterial]);

        this.scenes[0].add(this.ball);

        //this.controls.target = this.field;

        // Sun Directional Light 
        this.sun = new Sun(200, 200, 0, 0xffffff, this.baseIntensity);

        this.scenes[0].add(this.sun);
        
        
        // Create Pointlight
        
        this.pointlight = new Pointlight(0, 100, 0, [0,0,0]);
        
        this.scenes[0].add(this.pointlight);

        //Pause scene and objects

        this.scenes[1] = new THREE.Scene();
        
        var pauseTexture = new THREE.TextureLoader().load("textures/pause.jpg");
        
        pauseTexture.wrapS = THREE.ClampToEdgeWrapping;
        pauseTexture.wrapT = THREE.ClampToEdgeWrapping;

        var pauseMaterial = new THREE.MeshBasicMaterial({map: pauseTexture});

        this.pauseScreen = new Pause(0, 0, 0, 1152, 648, pauseMaterial);

        this.scenes[1].add(this.pauseScreen);
        
    }

    createCamera() {
        'use strict';

        this.cameraList = new Array(2);
        //cameraList[0]: Pespective
        //cameraList[1]: Ortographic
        
        this.cameraList[0] = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000); 

        this.cameraList[0].position.set(0, 200, 100);

        this.cameraList[0].lookAt(0, 0, 0);

        this.cameraList[1] = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 1, 1000);


        this.cameraList[1].position.set(0, 0, 200);

        this.cameraList[1].lookAt(0, 0, 0);

        //Camera Controls
        this.controls = new THREE.OrbitControls(this.cameraList[0]);

        this.controls.autoRotate = true;

        this.resizeEvent();

    }

    render() {
        'use strict';
        this.renderer.render(this.scenes[this.pause], this.cameraList[this.pause]);
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
                this.ball.toggleMovement();
                break;

            case 68: //D
                this.toggleNightMode();
                break;
            
            case 76: //L
                this.toggleLightCalculation();
                break;
            
            case 80: //P
                this.pointlight.toggleLight();
                break;
            
            case 82: //R
                if(this.pause){
                    this.createCamera();
                    this.createScene();
                }
                break;
            
            case 83: //S
                //Pause
                this.pause = (this.pause == 0 ? 1 : 0);
                this.controls.enabled = !this.controls.enabled;
                break;
            
            case 87: //W
                this.toggleWireframe();
                break;
        }

    }


    update(){

        var t = this.clock.getDelta();

        if(!this.pause){
            
            this.ball.update(t);
            //Makes camera AutoRotate
            this.controls.update();
        }
    }

    toggleNightMode(){
        this.sun.toggleNightMode();
    }

    toggleLightCalculation(){
        this.cube.toggleLightCalculation();
        this.field.toggleLightCalculation();
        this.ball.toggleLightCalculation();
    }
   

    toggleWireframe(){
        this.field.toggleWireframe();
        this.cube.toggleWireframe();
        this.ball.toggleWireframe();
    }
}
