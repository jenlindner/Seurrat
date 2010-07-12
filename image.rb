#would this be a model? this is a collection of methods to perform on a model, not an object unto itself. 
#if this is essentially an update, it gets called from an edit controller action 


#i would love to be able to synch this between javascript and ruby over a socket connection. 
#chow about ruby has the read data ready, does it execute a callback to the js function to write?
#does the write function have a pre-hook saying check this flag to call read function's data?
#i could use node callbacks to coordinate the read-write flow, 
#but do i have to then do it all in javascript? 
#maybe it's a ruby service? exposing the read data?


require 'RMagick'
include Magick

class ImageReader


  attr_accessor :current_intensity, :intense_pixel

  def get_color_of_most_intense_pixel(image,x,y,height,width)
    current_intensity = 0
    intense_pixel = ""
    pixels = image.get_pixels(x,y,height,width)
  
    pixels.each do |p|
    #may want to re-evaluate this to see if adding rgb values works better
      if (p.intensity > current_intensity)
     #   puts "current intensity = #{current_intensity} and this pixel's intensity = #{p.intensity}"
        current_intensity = p.intensity
    #    puts "current intensity = #{current_intensity}"
        intense_pixel = p
      end
    end
    puts "rgb(#{intense_pixel.red},#{intense_pixel.green},#{intense_pixel.blue})"
    # puts "r#{intense_pixel.red} g#{intense_pixel.green} b#{intense_pixel.blue}"
     #want to return a string with rgb 
     "rgb(#{intense_pixel.red},#{intense_pixel.green},#{intense_pixel.blue})"
  end
  
  def foo
    "foo"
  end
  
  #so a row is ten pixels high. so i want to call this get_most every ten pixels for 300.
  def read_row(image)
    row = 100
    marker = 0
    while marker < row
      if marker % 10 == 0
        #at this point, i'd want to call a method with the color value this method returns
        #to use it to write pixel color somewhere else 
        puts get_color_of_most_intense_pixel(image,200,100,10,10)
        #jump ahead to next square 10 pixels to the right
        marker += 9
      end
      marker+=1
    end
    puts "marker = #{marker}"
  end

  def read_number_of_rows(number, image)
    number.times do 
      read_row(image)
    end
  end
  

#okay, going to have to reinstall image & rmagick to use 8-bit depth
#in the meantime, use fake values where possible.

end

 image = ImageList.new('public/images/distance.jpg')
i = ImageReader.new
# 
i.read_row(image)
# i.read_number_of_rows(10,image)

#what i want to do first is get the rgb of a given pixel, then figure out
#the dominant/darkest pixel of a given 10*10 square, then expose that somehow
#so that i can use javascript to get it and color second image with.

