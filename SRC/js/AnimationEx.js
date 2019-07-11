(function(){
   
   console.log("has Animation");
   console.log(Animation);
   if (Animation)
   {
       
       Animation.doKen = function (obj,style,params)
        {
        
            if (params == undefined){params = {};};
            switch(style.toLowerCase())
            {
                case "left":
                    params.margin = params.margin || {location:"margin-left",value:"-30px"};
                    params.origin = params.origin || "bottom left";
                    params.translate = params.translate || "30px";
                    params.scale = params.scale || 1.1;
                break;
                
                case "right":
                    params.margin = params.margin || {location:"margin-right",value:"-30px"};
                    params.origin = params.origin || "bottom right";
                    params.translate = params.translate || "30px";
                    params.scale = params.scale || 1.1;
                break;
                
                case "out":
                    
                    params.origin = params.origin || "center center";
                    params.translate = params.translate || "0px";
                    params.scale = params.scale || 1.0;
                    
                break;
                
                case "in":
                    params.origin = params.origin || "center center";
                    params.translate = params.translate || "0px";
                    params.scale = params.scale || 1.4;
                break;
                default:
                
                break;
            
            
            }
            
            params.timing = params.timing || "3s,8s";
        
        
            if (params.margin){
                obj.setCSS(params.margin.location ,params.margin.value);
            }
            obj.setCSS("transition-property", "opacity, transform");
            obj.setCSS("transition-duration",params.timing);
            obj.setCSS("transform-origin",params.origin);
            
            setTimeout(function(){
                obj.setCSS("opacity",1);
                obj.setCSS("transform", "scale(" + params.scale + ") translate("+ params.translate + ")");
            },10);
            
        };
       
       Animation.grow = function(object,width,height,duration,delay )
       {
           if (duration == undefined){duration = 1000;}
            if (delay == undefined){delay = 0;}
            var context =this;
           var current = new Object();
           var to = {width:width,height:height};
           
             if (this.isCanvasObject(object))
             {
                 current.width = object.getAttr("width");
                 current.height = object.getAttr("height");
                 
             }else if (this.isUiComponent(object)){
                 current.width = object.divObject.width();
                 current.height =object.divObject.height();
                 
             }else{
                 current.width = $(object).width();
                 current.height =$(object).height();
             }
           
           var tween = new TWEEN.Tween(current).to(to,duration).delay(delay).onUpdate(function(){
                
                   
                if (context.isCanvasObject(object)){
                    
                
                    object.setAttr("width",current.width);
                    object.setAttr("height",current.height);
                    object.parent.draw();
                }else if (context.isUiComponent(object))
                {
                    
                    object.setCSS("width",current.width + "px");
                    object.setCSS("height",current.height + "px");
                }else{
                    
                    object.css("width",current.width + "px");
                    object.css("height",current.height + "px");
                }
                //console.log(current);
            }).onComplete(function(){
                
                
            }).start();
           
           
       };
       Animation.moveAndGrow = function(object, x,y,width,height,duration,delay)
       {
           Animation.moveTo(object,x,y,duration,delay);
           Animation.grow(object,width,height,duration,delay);
           
           
       };
       
       Animation.moveAndRotate = function(object,x,y,deg,duration,delay)
       {
    	   Animation.moveTo(object,x,y,duration,delay);
    	   Animation.rotateTo(object,deg,duration,delay);
    	   
       };
       
       Animation.getRotation = function (object)
       {
    	   console.log("in get rotation");
    	   console.log(object);
    	   var angle = 0;
    	   var st = window.getComputedStyle(object.divObject[0], null);
    	   var tr = st.getPropertyValue("-webkit-transform") ||
    	            st.getPropertyValue("-moz-transform") ||
    	            st.getPropertyValue("-ms-transform") ||
    	            st.getPropertyValue("-o-transform") ||
    	            st.getPropertyValue("transform") ||
    	            "FAIL";

    	   // With rotate(30deg)...
    	   // matrix(0.866025, 0.5, -0.5, 0.866025, 0px, 0px)
    	  console.log('Matrix: ' + tr);
    	   if (tr.toLowerCase() != "none"){
	    	   // rotation matrix - http://en.wikipedia.org/wiki/Rotation_matrix
	
	    	   var values = tr.split('(')[1].split(')')[0].split(',');
	    	   var a = values[0];
	    	   var b = values[1];
	    	   var c = values[2];
	    	   var d = values[3];
	
	    	   var scale = Math.sqrt(a*a + b*b);
	
	    	   console.log('Scale: ' + scale);
	
	    	   // arc sin, convert from radians to degrees, round
	    	   var sin = b/scale;
	    	   // next line works for 30deg but not 130deg (returns 50);
	    	   // var angle = Math.round(Math.asin(sin) * (180/Math.PI));
	    	   var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
	
	    	  
    	   }
    	   return angle;
    	   
       };
       
       
       Animation.getScale = function (object)
       {
    	   console.log("in get rotation");
    	   console.log(object);
    	   var angle = 0;
    	   var st = window.getComputedStyle(object.divObject[0], null);
    	   var tr = st.getPropertyValue("-webkit-transform") ||
    	            st.getPropertyValue("-moz-transform") ||
    	            st.getPropertyValue("-ms-transform") ||
    	            st.getPropertyValue("-o-transform") ||
    	            st.getPropertyValue("transform") ||
    	            "FAIL";

    	   // With rotate(30deg)...
    	   // matrix(0.866025, 0.5, -0.5, 0.866025, 0px, 0px)
    	  console.log('Matrix: ' + tr);
    	   if (tr.toLowerCase() != "none"){
	    	   // rotation matrix - http://en.wikipedia.org/wiki/Rotation_matrix
	
	    	   var values = tr.split('(')[1].split(')')[0].split(',');
	    	   var a = values[0];
	    	   var b = values[1];
	    	   var c = values[2];
	    	   var d = values[3];
	
	    	   var scale = Math.sqrt(a*a + b*b);
	
	    	   console.log('Scale: ' + scale);
	
	    	   // arc sin, convert from radians to degrees, round
	    	   var sin = b/scale;
	    	   // next line works for 30deg but not 130deg (returns 50);
	    	   // var angle = Math.round(Math.asin(sin) * (180/Math.PI));
	    	   var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
	
	    	  
    	   }
    	   return scale;
    	   
       };
       
       
       Animation.rotateTo = function (object,deg,duration,delay)
       {
    	    if (duration == undefined){duration = 1000;}
            if (delay == undefined){delay = 0;}
    	   var angle = Animation.getRotation(object);
    	   var current ={rotate:angle};
    	   var to = {rotate:deg};
    	   var tween = new TWEEN.Tween(current).to(to,duration).delay(delay).onUpdate(function(){
    		   //console.log("current " + current.rotate);
    		   object.setCSS("transform","rotate(" + current.rotate+ "deg)");
    		   
    	   }).start();
    	   
    	   
       };// end function
      
      Animation.scaleTo = function(object,scale,duration,delay)
      {
    	  if (duration == undefined){duration = 1000;}
    	  if (delay == undefined){delay=0;}
    	  var current = {scale:Animation.getScale(object)};
    	  var to = {scale:scale};
    	  var tween = new TWEEN.Tween(current).to(to,duration).delay(delay).onUpdate(function(){
   		   object.setCSS("transform","scale(" + current.scale+ ")");
   		   
   	   }).start();
    	  return tween;
    	  
      },
       
      Animation.pulse = function(object,scaleUp,scaleDown,duration,delay)
      {
    	  if (duration == undefined){duration = 1000;}
    	  if (delay == undefined){delay=0;}
    	  var tween = Animation.scaleTo(object,scaleUp,duration/2,delay);
    	  tween.onComplete(function(){
    		  
    		  Animation.scaleTo(object,scaleDown,duration/2, 0);
    	  });
    	
    	  
      };
      
      Animation.moveAndScale = function (object,x,y,scale,duration,delay)
      {
            if (duration == undefined){duration = 1000;}
          if (delay == undefined){delay=0;}
          Animation.moveTo(object,x,y,duration,delay);
          Animation.scaleTo(object,scale,duration,delay);
          
      };
       
       
   }// end if animation
})();   