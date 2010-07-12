

$(function() {
  WebSocketDemo.init('jens_chat');
  DefaultMessage.init();
});

var WebSocketDemo = {
  init: function(channel) {
    // initialize Pusher
    WebSocket.__swfLocation = "/javascripts/support/WebSocketMain.swf";
    this.pusher = new Pusher('279b70cc663845e74c75', channel);
    this.pusher.bind('message_posted', this.on_message_posted);    
		this.pusher.bind('hello', this.hi_there);
//

//		this.pusher.bind('call_write_function', this.on_message_posted)
		
    this.message_list = $("#messages");
    this.message_form = $("#message_form");
    this.message_form.submit(this.on_form_submit);
    
    this.name_field = $('#message_name');
    this.body_field =   $('#message_body');
    this.submit_button = $('#submit_button');
  },

  hi_there: function(data) {
		alert(data);
  },
  
  // 'this' is NOT WebSocketDemo
  on_message_posted: function(data) {
	//here's something i don't understand. is data coming from the form names name & body?
	//will they get passed as just parameters, or do i need to use form?
	//maybe just use form first and change little by little.
    WebSocketDemo.display_message(data.name, data.body);
  },
 
  display_message: function(name, body) {
    $(this).trigger('displaying_message', [name, body]);
    this.message_list.prepend("<li><strong>" + sanitize(name) + 
                              ":</strong> " + sanitize(body) + "</li>");
  },
  
  // 'this' is the form element
  on_form_submit: function(event) {
    if(WebSocketDemo.name_field.val() == '') {
      alert('Please enter your name.');
    }
    else if(WebSocketDemo.body_field.val() == '') {
      alert('Please enter your message.');
    }
   	else {
      $.post('/', "test", function() {
	   	alert(data);
		}, "html");
	}
    event.preventDefault();
  }
};

var DefaultMessage = {
  init: function() {
    this.blank_notice = $("<li class='blank'>There are no messages...</li>");
    $("#messages").append(this.blank_notice);
    $(WebSocketDemo).bind('displaying_message', this.on_displaying_message);
  },
  
  on_displaying_message: function(event, name, body) {
    DefaultMessage.blank_notice.remove();
  }
};

function sanitize(str) {
  return str.replace(/</ig, '&lt;').replace(/>/ig, '&gt;');
}

function scoped(fn, scope) {
  return function () {
    return fn.apply(scope, arguments);
  }
}



var Seurrat = {
  init: function(channel) {
    // initialize Pusher
		console.log(channel);	
    this.pusher = new Pusher('279b70cc663845e74c75',channel);
		// seurrat.pusher.bind('write_color', this.accept_color)
    this.pusher.bind('write_color', function(data){
	alert(data["color"]);
});
	},
	
	acceptColor: function(data) {
		//this.accept_color calls Seurrat.setColor and passes it color data
		Seurrat.setColor(data["color"]);
    //WebSocketDemo.display_message(data.name, data.body);
  },

 	setColor: function(color) {
	//seurrat.trigger settingColor(data.color)
    $(this).trigger('settingColor', [color]);
  }
	// 
	// fillTenByTenSquare: function (el,x,y,color){
	// 	console.log(el,x,y,color);
	// 	el.fillStyle = color;
	// 	el.fillRect(x,y,x+10,y+10);
	// }
};



// server.trigger('Color.setColor', thing["color"]);

//server.bind('bar', fillTenByTenSquare(soph,0,0,color.color));
//so this would be from within color obj, referencing seurrat
//inside seurrat - 
//1. this.pusher.bind('message_posted', this.on_message_posted); 
// seurrat.pusher.bind('write_color', this.accept_color)

//2. message_posted calls display message on web socket and passes it data
//this.accept_color calls Seurrat.setColor and passes it color data

//3. WebSocketDemo.display_message(data.name, data.body);
//seurrat.setColor(data.color)


//4. display message calls web socket this.trigger displaying_message and passes it data
//seurrat.trigger settingColor(data.color)

//5. DefaultMessage binds one of its functions to displaying message on web socket too
//Color binds settingColor to Seurrat with it's setColor function
	//Seurrat																	//Color
// $(WebSocketDemo).bind('displaying_message', this.on_displaying_message);







