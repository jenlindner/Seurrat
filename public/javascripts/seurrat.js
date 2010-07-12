$(document).ready(function(){
	var server = new Pusher('279b70cc663845e74c75', 'sweet_new_channel');
	var original = document.getElementById('original');
	var composed = document.getElementById('composed');

	var org = original.getContext('2d');
	var comp = composed.getContext('2d');
	
	Seurrat.init(org, comp, server);
	server.bind('write_color', function(data){
//		console.log(data["colors"][0]);
		Seurrat.setColor(data,comp);		
	});
 	
	$('#foo').click(function() {
		$.get('/pusher', function(data) {
			console.log("success");
    });
  }); 
});

var Seurrat = {
	init: function(canvas1, canvas2, server){	
		this.canvas_one = canvas1;
		this.canvas_two = canvas2;
		this.server = server
	},
	color: "rgb",	
	fillSquare: function (el,x,y,color){
	//	console.log(el,x,y,color);
		el.fillStyle = color;
		el.fillRect(x,y,x+10,y+10);
		//trigger request for more color?
	//	this.server.trigger()
		},
	setColor: function(color,el){
		this.colors = color["colors"];
		//write loop that fills square every ten pixels, getting new color
		//each ten pixels
			//this.colorRow(this.canvas_two,0)
			this.colorAllRows();
	},
	colorRow: function (el, row){
//		console.log(this.colors);
		for (i = 0, j = 0; i < 291; i++){
			if (i % 10 == 0){
				//get color -- i corresponds to blocks of ten: each element in
				//array is ten pixels worth of color
				el.moveTo(i,row * 10);
				//probably need to check value of i
				//console.log("i = " +i)
				j++
			}
		//	console.log("j = " +j)
			this.fillSquare(el,i,row * 10,this.colors[row][j]);
		}
	},
	colorAllRows: function(){
		//you will have traverse data structure differently
		//colors[i] is a row
		for (idx = 0; idx < 20; idx++){
			//console.log("idx is " +idx)
			//if (idx % 10 == 0){
		//		console.log("hey idx = " +idx)
				this.colorRow(this.canvas_two, idx);
		//	}
		}
	},
	showColor: function(){
		alert(this.color);
	}
};

