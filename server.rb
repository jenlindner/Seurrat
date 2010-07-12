require 'rubygems'
require 'bundler'
Bundler.setup

require 'sinatra'
require 'haml'
require 'pusher'
require 'json'
require '../web_sockets_demo/image.rb'
 
Pusher.app_id = '1436'
Pusher.key = '279b70cc663845e74c75'
Pusher.secret = '4491a3468b2f7d0ece6e'



#this will need to be a variable to contain session ids
CHANNEL = 'sweet_new_channel'

#manage separate sessions for each person

set :haml, {:format => :html5 }


# def push(msg, data = {})
#   Pusher[CHANNEL].trigger(msg, data)
# end

def push(func, data = {})
  Pusher[CHANNEL].trigger(func, data)
end

get '/' do
  haml :chat
end

get '/pusher' do
  @image = ImageList.new('public/images/distance.jpg')
  @i = ImageReader.new
  @color = @i.get_color_of_most_intense_pixel(@image,0,0,10,10)
  puts @color
  #20 rows of colors returned, 2d array
  @colors = @i.read_number_of_rows(20,@image)
  #one row of colors returned
  puts @colors
  #@colors = @i.read_row(@image)
  #one color
  # @pusher_response = Pusher['sweet_new_channel'].trigger('write_color', {:color => @color})
  #row of colors
  @pusher_response = Pusher['sweet_new_channel'].trigger('write_color', {:colors => @colors})
  puts @pusher_response.inspect
end

post '/pusher' do
  @image = ImageList.new('public/images/distance.jpg')
  @i = ImageReader.new
  @color = @i.get_color_of_most_intense_pixel(@image,0,0,10,10)
  puts @color
  
  @pusher_response = Pusher['sweet_new_channel'].trigger('write_color', {:color => @color})
end

get '/canvas' do
  #for each user get session id and use that for channel name to create a separate channel for each user
  haml :canvas

end


post '/' do
  content_type :json
  push('message_posted', params[:message])
  #{:status => :ok}.to_json
end