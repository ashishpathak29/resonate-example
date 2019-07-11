/**
 * @author Christopher Swenson
 */
	var edgeObject = getEdgeObject();
	function getParameterByName(name)
	{
		name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
		var regexS = "[\\?&]" + name + "=([^&#]*)";
		var regex = new RegExp(regexS);
		var results = regex.exec(window.location.search);
		if(results == null)
			return "";
		 else
		return decodeURIComponent(results[1].replace(/\+/g, " "));
	}
	
	function getEdgeObject()
	{
		
		return window.parent._currentPageContent.getChild(getParameterByName("objID"));
	}

	function dispatchEdgeEvent(name,symbol,edgeEvent,data)
	{
		if (data == undefined){data = new Object();}
		data.edgeSymbol = symbol;
		data.edgeEvent = edgeEvent;
		edgeObject.dispatch(name,data);
		
	}
