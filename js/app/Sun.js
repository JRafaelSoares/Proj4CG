class Sun extends THREE.DirectionalLight {

	constructor(x, y, z, color, intensity, target = null){
		super(color, intensity);

		this.position.set(x, y, z);

		if (target != null){
			this.target = target;
		}

		this.baseIntensity = intensity;
	}

	toggleNightMode(){

		this.intensity = (this.intensity == 0 ? this.baseIntensity : 0);
	}

	changeTarget(object){
		this.target = object;
	}

	get getTarget(){
		return this.target;
	}


}