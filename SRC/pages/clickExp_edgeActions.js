/***********************
* Adobe Edge Animate Composition Actions
*
* Edit this file with caution, being careful to preserve 
* function signatures and comments starting with 'Edge' to maintain the 
* ability to interact with these actions from within Adobe Edge Animate
*
***********************/
(function($, Edge, compId){
var Composition = Edge.Composition, Symbol = Edge.Symbol; // aliases for commonly used Edge classes

   //Edge symbol: 'stage'
   (function(symbolName) {
      
     

      
      
      
      
       
      
      //Edge binding end

      

      Symbol.bindElementAction(compId, symbolName, "document", "compositionReady", function(sym, e) {
         // insert code to be run when the composition is fully loaded here
          
         /* var i;
          var items = new Array();       
                  for (i=0;i<10;i++){
                  	items.push("item " + (i+1));
                  }
                  
			buildClickList(items,sym);
			*/
			dispatchEdgeEvent("onLoaded",sym,e,{callBack:buildClickList});
      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         // insert code here
         sym.stop();
         

      });
      //Edge binding end

   })("stage");
   //Edge symbol end:'stage'

   //=========================================================
   
   //Edge symbol: 'rectButton'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         sym.stop();
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 270, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${_grp}", "mouseover", function(sym, e) {
         // insert code to be run when the mouse hovers over the object
         // play the timeline from the given position (ms or label)
         if (!sym.getVariable("selected")){
         sym.play("over");
         }
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${_grp}", "mouseout", function(sym, e) {
         // play the timeline from the given position (ms or label)
         
         if (!sym.getVariable("selected")){
         	if (sym.getVariable("checked")){
         		sym.stop("checked");
         	}else{
         		sym.stop("up");
         	}
         }
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 325, function(sym, e) {
         // insert code here
         sym.stop();

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${_grp}", "click", function(sym, e) {
         // insert code for mouse click here
         handleSelected(sym);
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 579, function(sym, e) {
         // insert code here
         sym.stop();

      });
      //Edge binding end

   })("rectButton");
   //Edge symbol end:'rectButton'

})(jQuery, AdobeEdge, "EDGE-4928403");

var buttons = new Array();

function buildClickList(items,sym)
      {
       
        console.log("build list");
         var btn;
        	var i;
         
         // Create an instance element of a symbol as a child of the
         // given parent element
         
         for (i=0;i<items.length;i++)
         {
         	btn = sym.createChildSymbol("rectButton", "Stage");
         	btn.$("caption").html(items[i]);
         	btn.getSymbolElement().css({
                   'position': 'absolute',
                   'left': -200,
                   'top': (50 + (i*30)),
                   'opacity':0,
                   'cursor':'pointer'
         });
         buttons.push(btn);
         	btn.setVariable("id","btn" + i);
         	btn.setVariable("index",i);
         	btn = btn.getSymbolElement();
         	btn.bind("click",function(e){
         	var sym = e.currentTarget.edgeSymbol;
         		 dispatchEdgeEvent("itemClick",sym,e,{id:sym.getVariable("id"),index:sym.getVariable("index")});
         		//console.log(sym.getVariable("id"))
         		});
         	btn.delay(100*i).animate({opacity:1,left:100},1000);
         	}
   
      }
      
 function handleSelected(btn)
 {
 	var i;
 	for (i=0;i<buttons.length;i++)
 	{
 
 		if (buttons[i] == btn)
 		{
 		console.log("match");
 		buttons[i].setVariable("selected",true);
 		buttons[i].setVariable("checked",true);
 			buttons[i].stop("selected");
 			buttons[i].getSymbolElement().animate({left:120},500);
 		}else{
 		console.log("no match");
 			buttons[i].setVariable("selected",false);
 			if (buttons[i].getVariable("checked")){
 			buttons[i].stop("checked");
 			}else{
 			buttons[i].stop("up");
 			}
 			buttons[i].getSymbolElement().animate({left:100},500);
 		}// end if
 	}// end for
 
 
 }// end function