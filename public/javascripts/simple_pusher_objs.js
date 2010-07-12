$(function() {
  Seurrat.init('sweet_new_channel');
  Color.init();
});
//okay. i'm making an object the will init with a channel and some methods
//bound to it. what i need to do is simply store as a property the color
//sent from the write_color method.

var sophisticated = document.getElementById('sophisticated');
var soph = sophisticated.getContext('2d');

var Seurrat = {
	init: function(channel){
		this.pusher = new Pusher('279b70cc663845e74c75', channel);
		this.pusher.bind('write_color', this.acceptColor);
		},
	acceptColor: function(data) {
		//this.accept_color calls Seurrat.setColor and passes it color data
		console.log('hi');
		Seurrat.setColor(data["color"]);
    //WebSocketDemo.display_message(data.name, data.body);
  },	
 	setColor: function(color) {
	//seurrat.trigger settingColor(data.color)
    Seurrat.pusher.trigger('settingColor', [color]);
  }

};

var Color = {
	init: function(){
		Seurrat.pusher.bind('settingColor', this.setColor);
	},
	color: "rgb",
	setColor: function(color){
		this.color = color;
	}
}
