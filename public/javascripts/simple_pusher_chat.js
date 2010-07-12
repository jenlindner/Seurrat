$(document).ready(function(){
	var server = new Pusher('279b70cc663845e74c75', 'sweet_new_channel');
	Seurrat.init();
	server.bind('write_color', function(data){
		$('#foo').prepend(data["color"]);
	});
	//server.bind('set_color', Seurrat.setColor);
  
});

var Seurrat = {
	init: function(){
		
	},
	color: "rgb",	
	acceptColor: function(color){
		//alert(color["color"]);
		server.trigger('set_color', color["color"])
		//this.color = color["color"];
		//Seurrat.showColor();
		
	},
	setColor: function(color){
		this.color = color["color"];
	},
	showColor: function(){
		alert(this.color);
	}
};


