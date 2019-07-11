var externalJSLibs = new Array();
externalJSLibs.push("js/ResonateDynamicPage.js");
externalJSLibs.push("js/jquery.imagemapster.js");
externalJSLibs.push("js/AnimationEx.js");  
externalJSLibs.push("js/SimpleVideoPlayer.js");
externalJSLibs.push("js/flipCard.js");
					
					/*****************Mantis bridge classes and settings*******************/
					    if ($(location).attr('host') == "52.70.115.197"){
					       var mtBridgeSettings = new Object(); 
					       mtBridgeSettings.endPoint = "http://52.70.115.197/mantis/mantisResonateBridge/MTBridge.php";
					       mtBridgeSettings.projectID = 0;
					       mtBridgeSettings.cssPath = 'js/mtBridge/mt_theme/jquery-ui.theme.css';
					      // mtBridgeSettings.mode="simple";
					      // mtBridgeSettings.user = "confReporter";
					      // mtBridgeSettings.password="abc123";
					        externalJSLibs.push("js/mtBridge/mtBridge.js");
					    }// end if
					/**************End Mantis bridge classes and settings******************/	
					
				