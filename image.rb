#i would love to be able to synch this between javascript and ruby over a socket connection. 
#chow about ruby has the read data ready, does it execute a callback to the js function to write?
#does the write function have a pre-hook saying check this flag to call read function's data?
#i could use node callbacks to coordinate the read-write flow, 
#but do i have to then do it all in javascript? 
#maybe it's a ruby service? exposing the read data?


require 'RMagick'
include Magick

class ImageReader

  attr_accessor :current_rgb, :intense_pixel

  def get_color_of_most_intense_pixel(image,x,y,height,width)
    current_rgb = 765
    intense_pixel = ""
    pixels = image.get_pixels(x,y,height,width)
  
    pixels.each do |p|
         #no. i want color of darkest pixel, which would be lowest values of rgb, each. but for now let's just 
         #add them and use lowest.
          rgb = p.red + p.green + p.blue
      if (rgb < current_rgb)
     #   current_intensity = p.intensity
    #    puts "current intensity = #{current_intensity}"
        intense_pixel = p
      end
    end
 #   puts "rgb(#{intense_pixel.red},#{intense_pixel.green},#{intense_pixel.blue})"
    # puts "r#{intense_pixel.red} g#{intense_pixel.green} b#{intense_pixel.blue}"
     #want to return a string with rgb 
     "rgb(#{intense_pixel.red},#{intense_pixel.green},#{intense_pixel.blue})"
  end
  
  def foo
    "foo"
  end
  
  #so a row is ten pixels high. so i want to call this get_most every ten pixels for 300. need to be able to pass
  #in the x value
  def read_row(image, y_value)
    colors_of_row = [] 
    row = 300
    marker = 0
    while marker < row
      if marker % 10 == 0
        #at this point, i'd want to call a method with the color value this method returns
        #to use it to write pixel color somewhere else 
    #    puts get_color_of_most_intense_pixel(image,200,100,10,10)
        #ah - you need to increment your y value, to move along the row.
       # puts "marker = #{marker}"
        colors_of_row << get_color_of_most_intense_pixel(image,marker,y_value,10,10)
        #think i want to store this in an array. and then pass the array.
        #jump ahead to next square 10 pixels to the right
        marker += 9
      end
      marker+=1
    end
#    puts "marker = #{marker}"
 #   puts "colors of row is: #{colors_of_row}"
    colors_of_row
  end

  def read_number_of_rows(number, image)
    #so lets say i want to read 20 rows, 10 pixels high
    counter = 0
    set_of_rows = []
    while counter < number 
      y_value = counter * 10
      puts "y_value is #{y_value}"
      set_of_rows << read_row(image,y_value)
      counter += 1
    end
    puts set_of_rows[0][7]
    set_of_rows
  end
end

image = ImageList.new('public/images/distance.jpg')
i = ImageReader.new
# 
i.read_row(image,0)
i.read_number_of_rows(20, image)
  

# i.read_number_of_rows(10,image)

#what i want to do first is get the rgb of a given pixel, then figure out
#the dominant/darkest pixel of a given 10*10 square, then expose that somehow
#so that i can use javascript to get it and color second image with.

