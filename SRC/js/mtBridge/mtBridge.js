var MTBridge = EventDispatcher.extend({
	
	
	init:function(endPoint,projectId){
		this._super();
		this.endPoint = endPoint;
		this.projectId = projectId;
		this.userId =null;
		this.password = null;
		this.severity = new Array();
		this.priorities = new Array();
		this.reproducibilities = new Array();
		this.customFields = new Object();
		this.categories = new Array();
		this.userData = null;
		this.loaded = false; 
		
	}, 
	_callWS:function(name,data,eventHandler){
		if (data == undefined){data = {}};
		var params = new Object();
		 params.username = this.userId;
	 	 params.password = this.password;
	 	 for (var p in data){
	 		 params[p] = data[p];
	 		 
	 	 }
	 	 console.log(params);
		var data = {method:name,params:params};
		var self = this;
		$.ajax({
	        url: this.endPoint,
	        data: data,
	        type: 'POST',
	        async: true,
	        dataType: 'json',
	        cache:false, 
	        success : function(data, textStatus, jqXHR){
	            console.log('AJAX COMPLETE');
	            console.log(data);
	            console.log(data);
	            
	            if (eventHandler){
	            	eventHandler(data);
	            	
	            }
	        },
	        error: function (xhr, ajaxOptions, thrownError) {
	        	if (eventHandler){
	            	eventHandler(xhr);
	            	
	            }
	          }
	      });
	      
		
	},
	addIssue:function(summary,description,category,customFields){
		     var self = this;
		 	var issue = new Object();
		 	issue.project = {id:this.projectId};
		 	issue.summary = summary;
		 	issue.description = description;
		 	issue.category = category;
		    issue.platform = platform.name + " " + platform.version;
		    issue.os = platform.os.family;
		    issue.os_build = platform.os.version;
		    issue.custom_fields = new Array();
		    var i;
		    for (i=0;i<customFields.length;i++){
		    	issue.custom_fields.push(customFields[i]);
		    }
		    
		    
		    
		   // issue.custom_fields.push({field:{id:1,name:"storyboardID"},value:"L01_005"});
		 	 this._callWS("mc_issue_add",{issue:issue},function(e){
		 		 console.log("issue added");
		 		 console.log(!isNaN(e));
		 		 self.dispatch("onIssueSubmit",{success:!isNaN(e),issueID:e});
		 	 });
		
	},
	_getEnumerations:function(){
		var self = this;
		if (this.loaded){return;}
		this.addListener("onLoadSeverities",function(){self._getReproducibilities();});
		this.addListener("onLoadedReproducibilities",function(){self._getPriorities();});
		this.addListener("onLoadedPriorities",function(){self._getCustomFields()});
		this.addListener("onLoadedCustomFields",function(){self._getCustomCategories()});
		this.addListener("onLoadedCategories",function(){self.loaded = true;self.dispatch("onEnumerationsLoaded");});
		
		
		
		this._getSeverities();
	},
	_getSeverities:function(){
		var self = this;
		this._callWS("mc_enum_severities",{},function(response){
			
			console.log("reponse in caller");
			console.log(response);
			var i;
			for (i=0;i<response.length;i++)
			{
				self.severity.push(response[i].name);
				
			}
			self.dispatch("onLoadSeverities");
			
		});
		
		
	},
	_getPriorities:function(){
		var self = this;
		this._callWS("mc_enum_priorities",{},function(response){
			
			console.log("reponse in caller");
			console.log(response);
			var i;
			for (i=0;i<response.length;i++)
			{
				self.priorities.push(response[i].name);
				
			}
			self.dispatch("onLoadedPriorities");
			
		});
		
		
	},
	_getReproducibilities:function(){
		var self = this;
		this._callWS("mc_enum_reproducibilities",{},function(response){
			
			console.log("reponse in caller");
			console.log(response);
			var i;
			for (i=0;i<response.length;i++)
			{
				self.reproducibilities.push(response[i].name);
				
			}
			self.dispatch("onLoadedReproducibilities");
			
		});
		
		
	},
	_getCustomFields:function(){
		var self = this;
		this._callWS("mc_project_get_custom_fields",{project_id:this.projectId},function(response){
			
			console.log("reponse in caller");
			console.log(response);
			var i;
			for (i=0;i<response.length;i++) 
			{
				self.customFields[response[i].field.name] = response[i].field;
				
			}
			self.dispatch("onLoadedCustomFields");
			
		});
		
		
	},
	_getCustomCategories:function(){
		var self = this;
		this._callWS("mc_project_get_categories",{project_id:this.projectId},function(response){
			
			console.log("reponse in caller");
			console.log(response);
			var i;
			for (i=0;i<response.length;i++) 
			{
				self.categories.push(response[i]);
				
			}
			self.dispatch("onLoadedCategories");
		
		});
	},
	_login:function(userName,password){
		var self = this;
		this.userId = userName;
		this.password = password;
		this._callWS("mc_login",{},function(response){
			self.userData = response;
			console.log(self.userData);
			self.dispatch("onLogin",{success:(response.account_data != undefined)});
			
		});
		
		
	}
	
	
	
	
});



	
	function handleMt_EnumLoaded(e)
	{
		console.log(mt);
		buildMt_Menus();
		$("#mt_login").css("visibility","hidden");
		$("#mt_issue_form").css("visibility","visible");
		 
	}
	
	function handleMt_Login(e)
	{   console.log("handle Login");
		console.log(e);
		if (e.success){
			$("#mt_failMsg").css("visibility","hidden");
			mt._getEnumerations();
		}else{
			$("#mt_failMsg").css("visibility","visible");
		}
	}
	
	
	function handleMt_IssueSubmit(e)
	{
		if (e.success){
			$("#mt_submitMsg").html("Issue was submitted");
			 $('textarea[name="mt_issue_notes"]').val("");
	 		$('input[name="mt_issue_summary"]').val("");
		}else{
			$("#mt_submitMsg").html("<font color:'#FF0000'>Error adding issue</font>");
		}
	}
	
	function buildMt_Menus()
	{
		var i;
		for (i=0;i<mt.categories.length;i++)
		{
			$("#mt_categories").append('<option value="' +mt.categories[i] +'">'+mt.categories[i]+'</option>');
		}// end for
		
		for (i=0;i<mt.severity.length;i++)
		{
			$("#mt_severities").append('<option value="' +mt.severity[i] +'">'+mt.severity[i]+'</option>');
		}// end for
		
		
		for (i=0;i<mt.priorities.length;i++)
		{
			$("#mt_priorities").append('<option value="' +mt.priorities[i] +'">'+mt.priorities[i]+'</option>');
		}// end for

		for (i=0;i<mt.reproducibilities.length;i++)
		{
			$("#mt_reproducibility").append('<option value="' +mt.reproducibilities[i] +'">'+mt.reproducibilities[i]+'</option>');
		}// end for
		
		setMt_Defaults();
		//$( "#mt_categories" ).selectmenu( "refresh" );
		//$( "#mt_severities" ).selectmenu( "refresh" );
		//$( "#mt_priorities" ).selectmenu( "refresh" );
		//$( "#mt_reproducibility" ).selectmenu( "refresh" );
	
	}
	
	
	function setMt_Defaults()
	{
		
		// set defaults:
		$('#mt_categories').val("General");
		$('#mt_severities').val("minor");
		$('#mt_priorities').val("normal");
		$('#mt_reproducibility').val("have not tried");
		
	}
	
	function buildMt_Dialog(mode)
	{
	    
	    if (mode==undefined){mode = "normal";}
	    var dialogDiv;
	    
	   switch(mode.toLowerCase()){
	       
	       case "normal": 
            	dialogDiv = '<div class="mt" id="mt_dialog" title="Report an issue"  >';
            	dialogDiv += '<div id="mt_login" >';
            	dialogDiv += '	<div style="text-align:center">Before submitting an issue you must log in.</br>You will only need to do this once per session.</div>';
            	dialogDiv += '		<div style="position: absolute; left: 120px; top: 110px;">';
            	dialogDiv += '			User Name</br>';
            	dialogDiv += '			<input type="text" name="mt_user" style="width:200px"></input>';
            	dialogDiv += '		 </div>';
            	dialogDiv += '<div style="position: absolute; left: 360px; top: 110px;">';
            	dialogDiv += '	Password</br>';
            	dialogDiv += '	<input type="password" name="mt_pass" style="width:200px"></input>';
            	dialogDiv += '</div>';
            	dialogDiv += '<div style="position: absolute; left: 475px; top: 170px;">';
            	dialogDiv += '<button name="mt_login">Login</button>';
            	dialogDiv += '</div>';
            	dialogDiv += '<div id="mt_failMsg" style="text-align:center; color:#FF0000; visibility:hidden">Unable to login.</br> Please check your user name and password and try again.</div>';
            	dialogDiv += '</div>';
            	dialogDiv += '<div id="mt_issue_form" style="visibility: hidden">';
            	dialogDiv += '	<div class="mt" style="position: absolute; left: 10px; top: 10px;">';
            	dialogDiv += '		Category</br>';
            	dialogDiv += '		<select name="mt_categories" id="mt_categories"></select>';
            	dialogDiv += '	</div>';
            	dialogDiv += '	<div style="position: absolute; left: 180px; top: 10px;">';
            	dialogDiv += '		Severity</br>';
            	dialogDiv += '		<select name="mt_severities" id="mt_severities"></select>';
            	dialogDiv += '	</div>';
            	dialogDiv += '	<div style="position: absolute; left: 350px; top: 10px;">';
            	dialogDiv += '		Priority</br>';
            	dialogDiv += '		<select name="mt_priorities" id="mt_priorities"></select>';
            	dialogDiv += '	</div>';
            	dialogDiv += '	<div style="position: absolute; left: 520px; top: 10px;">';
            	dialogDiv += '		Reproducibility</br>';
            	dialogDiv += '		<select name="mt_reproducibility" id="mt_reproducibility"></select>';
            	dialogDiv += '	</div>';
            	dialogDiv += '	<div style="position: absolute; left: 10px; top: 80px;">';
            	dialogDiv += '		Issue / Comment:</br>';
            	dialogDiv += '		<input type="text" name="mt_issue_summary" style="width:660px"></input>';
            	dialogDiv += '	</div>';
            	dialogDiv += '	<div style="position: absolute; left: 10px; top: 140px;">';
            	dialogDiv += '		Notes / Steps to reproduce:</br>';
            	dialogDiv += '		<textarea name="mt_issue_notes" style="width:660px;height:200px;"></textarea>';
            	dialogDiv += '	</div>';
            	dialogDiv += '	<div style="position: absolute; left: 595px; top: 370px;">';
            	dialogDiv += '		<button name="mt_submitIssue">Submit</button>';
            	dialogDiv += '	</div>';
            	dialogDiv += '	<div id="mt_submitMsg" style="position: absolute; left: 10px; top: 370px;">';
            	dialogDiv += '	</div>';
            	dialogDiv += '</div>';
            	dialogDiv += '</div>';
		break;
		case "simple":
		  dialogDiv = '<div class="mt" id="mt_dialog" title="Report an issue"  >';
               
                dialogDiv += '<div id="mt_issue_form" style="visibility: hidden">';
                dialogDiv += '  <div class="mt" style="position: absolute; left: 10px; top: 10px; visibility: hidden;">';
                dialogDiv += '      Category</br>';
                dialogDiv += '      <select name="mt_categories" id="mt_categories"></select>';
                dialogDiv += '  </div>';
                dialogDiv += '  <div style="position: absolute; left: 180px; top: 10px; visibility: hidden;">';
                dialogDiv += '      Severity</br>';
                dialogDiv += '      <select name="mt_severities" id="mt_severities"></select>';
                dialogDiv += '  </div>';
                dialogDiv += '  <div style="position: absolute; left: 350px; top: 10px; visibility: hidden;">';
                dialogDiv += '      Priority</br>';
                dialogDiv += '      <select name="mt_priorities" id="mt_priorities"></select>';
                dialogDiv += '  </div>';
                dialogDiv += '  <div style="position: absolute; left: 520px; top: 10px; visibility: hidden;">';
                dialogDiv += '      Reproducibility</br>';
                dialogDiv += '      <select name="mt_reproducibility" id="mt_reproducibility"></select>';
                dialogDiv += '  </div>';
                dialogDiv += '  <div style="position: absolute; left: 10px; top: 80px; visibility: hidden;">';
                dialogDiv += '      Issue / Comment:</br>';
                dialogDiv += '      <input type="text" name="mt_issue_summary" style="width:660px"></input>';
                dialogDiv += '  </div>';
                dialogDiv += '  <div style="position: absolute; left: 10px; top: 10px;">';
                dialogDiv += '      Comment:</br>';
                dialogDiv += '      <textarea name="mt_issue_notes" style="width:660px;height:330px;"></textarea>';
                dialogDiv += '  </div>';
                dialogDiv += '  <div style="position: absolute; left: 595px; top: 370px;">';
                dialogDiv += '      <button name="mt_submitIssue">Submit</button>';
                dialogDiv += '  </div>';
                dialogDiv += '  <div id="mt_submitMsg" style="position: absolute; left: 10px; top: 370px;">';
                dialogDiv += '  </div>';
                dialogDiv += '</div>';
                dialogDiv += '</div>';
		
	           break;
		}// end switch
	$(dialogDiv).appendTo("body");	
	
	var buttonDiv = '<div id="mt_btnDiv"  style="position:absolute; top:-3px; left:958px"><button name="mt_btn"></button></div>';
	$(buttonDiv).appendTo("#topBar");
	($('[name="mt_btn"]').button({width:"50px", icons: {
        primary: "ui-icon-wrench "
      }}).click(function(event){
          event.preventDefault();
          openMt_Dialog();
      }));
       
	 $( "#mt_dialog" ).dialog({ width:695,height:460,autoOpen: false,resizable: false,modal:false} );
	 $("#mt_dialog").dialog().parents(".ui-dialog:eq(0)").wrap('<div class="mt"></div>');
		// $( "#mt_categories" ).selectmenu({width:150});
		// $( "#mt_severities" ).selectmenu({width:150});
		// $( "#mt_priorities" ).selectmenu({width:150});
	 //  $("#mt_reproducibility").selectmenu({width:150});
	 $('[name="mt_submitIssue"]').button().click(function(event){
	 	event.preventDefault();
	 	var stbID =  course.page.id || "Unknown";
	 	var notes = $('textarea[name="mt_issue_notes"]').val();
	 	var summary = mtBridgeSettings.mode=='simple'?$('textarea[name="mt_issue_notes"]').val().substr(0,15) + "...":  $('input[name="mt_issue_summary"]').val();
	 	if (summary && summary.trim().length>0){
	 		mt.addIssue(summary,
	 				notes,
	 				$('#mt_categories').val(),
	 				[{field:mt.customFields.storyBoardID,value:stbID}]);
	 		}// end if	
	 		
	 		 setMt_Defaults();
	 		
	 		
	 });
	 
	 $('[name="mt_login"]').button().click(function(event){
	 	
	 	mt._login($('input[name="mt_user"]').val(),$('input[name="mt_pass"]').val());
	 	
	 });
	 
	mt = new MTBridge(mtBridgeSettings.endPoint,mtBridgeSettings.projectID);
	mt.addListener("onEnumerationsLoaded",handleMt_EnumLoaded);
	mt.addListener("onLogin",handleMt_Login);
	mt.addListener("onIssueSubmit",handleMt_IssueSubmit);
	
	 if (mtBridgeSettings.mode){
                mt._login(mtBridgeSettings.user,mtBridgeSettings.password);
            }
		
	}
	
	function openMt_Dialog()
	{
	    $("#mt_dialog").dialog("open");
	    $("#mt_submitMsg").html(" ");
	    
	}
	
	
            var mt;
          
         
(function(){
   
    if (!document.getElementById("mt_css"))
    {
        var head  = document.getElementsByTagName('head')[0];
        var link  = document.createElement('link');
        link.id   = "mt_css";
        link.rel  = 'stylesheet';
        link.type = 'text/css';
        link.href = mtBridgeSettings.cssPath ;
        link.media = 'all';
        head.appendChild(link);
    }
    
    
    
   course.addListener("onStartCourse",function(){
       console.log("Build mt dialog");
         buildMt_Dialog(mtBridgeSettings.mode);
         
        
   });
})();   

	




