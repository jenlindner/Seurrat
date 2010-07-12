$(document).ready(function(){
	var server = new Pusher('279b70cc663845e74c75', 'sweet_new_channel');
	var example = document.getElementById('example');
	var sophisticated = document.getElementById('sophisticated');

	var ctx = example.getContext('2d');
	var soph = sophisticated.getContext('2d');
	
	Seurrat.init();
	server.bind('write_color', function(data){
		console.log(data["color"]);
		Seurrat.setColor(data,soph);
		console.log(Seurrat.color);
	});
 	
	$('#foo').click(function() {
		$.get('/pusher', function(data) {
			console.log("success");
    });
  }); 
});

var Seurrat = {
	init: function(){		
	},
	color: "rgb",	
	fillSquare: function (el,x,y,color){
		console.log(el,x,y,color);
		el.fillStyle = color;
		el.fillRect(x,y,x+10,y+10);
		//trigger request for more color?
		},
	setColor: function(color,soph){
		this.color = color["color"];
		this.fillSquare(soph,0,0,this.color);
		this.colorRow(soph,10,this.color)
	},
	colorRow: function (soph, row, color){
		console.log("draw");
		for (i = 0; i < 91; i++){
			//console.log("hello");
			if (i % 10 == 0){
				soph.moveTo(i,row);
				fillTenByTenSquare(soph,i,row,color);
			}
		}
	},
	showColor: function(){
		alert(this.color);
	}
};

