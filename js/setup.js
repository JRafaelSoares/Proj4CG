var main;

function setup(){
	main = new Main();

	window.addEventListener("keydown", 

			function (e){
				main.keyboardDownEvent(e.keyCode);
				/*
				if(e.keyCode == 82){
					main = new Main();
				}
				*/
			}
	);

    window.addEventListener("resize", 

			function (){
				main.resizeEvent();
			}
	);
}