

	/*
  	ctx.fillStyle = "rgb(200,0,0)";  
    ctx.fillRect(10, 10, 55, 50);  
  
    ctx.fillStyle = "rgba(0, 0, 200, 0.5)";  
    ctx.fillRect(30, 30, 55, 50);	
		
		soph.strokeStyle = "rgb(200,0,0)";
		soph.strokeRect( 100, 100, 500,300);
		soph.fillRect(102,102,496,296);
		soph.clearRect(106,106,486,286);
	
		soph.beginPath();
		soph.moveTo(75,50);
		soph.lineTo(200,75);
		soph.lineTo(200,25);
		soph.fill();

		
		ctx.beginPath();
		ctx.arc(75,75,50,0,Math.PI*2,true);
		ctx.moveTo(110,75);
		ctx.arc(75,75,35,0,Math.PI,false);
		ctx.moveTo(65,65);
		ctx.arc(60,65,5,0,Math.PI*2,true);
		ctx.moveTo(95,65);
		ctx.arc(90,65,5,0,Math.PI*2, true);
		ctx.stroke();
	*/	
		
		function fillTenByTenSquare(el,x,y,color){
			console.log(el,x,y,color);
			el.fillStyle = color;
			el.fillRect(x,y,x+10,y+10);
			}
			
		// soph.beginPath();
		//okay first: begin at the beginning and fill a ten by ten square. 
		//move over to the right ten pixels and do it again. now write a loop to increment
		//the x values up to a specific width. to 800.

		function drawRow(row, color){
			console.log("draw");
		//	var color = "rgb(255,165,0)";
			for (i = 0; i < 31; i++){
				//console.log("hello");
				if (i % 10 == 0){
					soph.moveTo(i,row);
					//pause here to slow function?
					
					//check for color here, to get correct rgb value.
					
			//		color = "rgb(205,205,0)";
					fillTenByTenSquare(soph,i,row,color);
				}
			}
		}
	
//	problem is this is too slow, need to draw one row then stop, over and over again.	
//besides, the idea is to see it moving slowly across the page.	
//		for(j = 10; j < 591; j++){
			// for(j = 10; j < 91; j++){
			// 	console.log("hi");
			// 	// if (j % 10 == 0){
			// 	// 			console.log(j)
			// 	// 			//soph.moveTo(0, j);
			// 	// 		 //	drawRow(j);
			// 	// 			}
			// }
	/*	
		soph.moveTo(10,10);
		fillTenByTenSquare(soph,10,10);
		soph.moveTo(20,10);
		fillTenByTenSquare(soph,20,10);
		soph.moveTo(30,10);
		fillTenByTenSquare(soph,30,10);
		*/
		
		
		
		