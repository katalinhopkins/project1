document.observe('dom:loaded',function(){
	var fileName = "countdown";
	var debugFlag = false;
	var userName = "";
	var ows ="ows_";
	var listName = "Visitor Count";
	userName = getCurrentUserName();
	//writeDebugInfo(fileName,6,'currUser',userName);
	debugFlag = enableDebug(userName);
	
	var userId = _spPageContextInfo.userId;
	//writeDebugInfo(fileName, 10,'UserId',userId);
	var pageListId = _spPageContextInfo.pageListId;
	//writeDebugInfo(fileName, 12,'pageListId',pageListId);
	
	//writeDebugInfo(fileName, 13,'location',location.href);
	
var myuri = location.href.split("?")[0];
 var fullUri = myuri;
//$("#debugDiv").append("line 15: myuri " + myuri + "<br>");
myuri = myuri.split("/");
var shortUrl ="";
for(var i=3;i<myuri.length;i++){
	 //$("#debugDiv").append("myuri["+i+"] " + myuri[i] + "<br>");
	 shortUrl = shortUrl +"/"+ myuri[i];	  
 }  
	//writeDebugInfo(fileName, 27,'shortUrl',shortUrl);
	
var CAMLQuery = "<Query><Where>";
CAMLQuery += "<Eq><FieldRef Name='Title'/><Value Type='Text'>" + shortUrl +"</Value></Eq>";
CAMLQuery += "</Where></Query>";

  
  //writeDebugInfo(fileName, 22,'CAMLQuery',CAMLQuery);
  
  (function($){
  $().SPServices({
	  operation: "GetListItems",
	  listName: listName,
	  CAMLQuery: CAMLQuery,
	  completefunc: function (xData, Status) {
		resultCount = parseFloat($(xData.responseXML).SPFilterNode("rs:data").attr("ItemCount"));
		writeDebugInfo(fileName, 30,'resultCount',resultCount.toString());		
		printSPdebugData(xData, Status, "GetListItems");
		if(resultCount===0){
			//page has not been inserted to the list yet, add new item to VisitorCount list
			//Title, PageGuid, PageUrl, VisitCount
			$().SPServices({
				operation: "UpdateListItems",
				async: false,
				batchCmd: "New",
				listName: listName,
				valuepairs: [
				["Title", shortUrl], 
				["PageUrl", fullUri],
				["VisitCount", 1]
					],
				completefunc: function(xData, Status) {
				resultCount = parseFloat($(xData.responseXML).SPFilterNode("rs:data").attr("ItemCount"));
				$("#visitorCountSpan").html(parseFloat($(xData.responseXML).SPFilterNode("z:row").attr(ows + "VisitCount")));
				var visitedOn = ($(xData.responseXML).SPFilterNode("z:row").attr(ows + "Modified")).split(" ")[0];
				$("#lastVisitedDate").html(visitedOn);
				}
			});
		}
		else
		{
		//	printSPdebugData(xData, Status, "GetListItems");
	visitCount = parseFloat($(xData.responseXML).SPFilterNode("z:row").attr(ows + "VisitCount"));
	itemId = parseFloat($(xData.responseXML).SPFilterNode("z:row").attr(ows + "ID"));
	createdOn =$(xData.responseXML).SPFilterNode("z:row").attr(ows + "Created_x0020_Date");
	pageurl = $(xData.responseXML).SPFilterNode("z:row").attr(ows + "PageUrl");
	visitCount++;
   
	   
		$().SPServices({
			operation: "UpdateListItems",
			async: false,
			batchCmd: "Update",
			listName: listName,
			ID: itemId,
			valuepairs: [
			   ["VisitCount", visitCount]
			   ],
			completefunc: function(xData, Status) 
			{
			resultCount = parseFloat($(xData.responseXML).SPFilterNode("rs:data").attr("ItemCount"));
			 //print out the current count in the VisitCountDiv
			$("#visitorCountSpan").html(parseFloat($(xData.responseXML).SPFilterNode("z:row").attr(ows + "VisitCount")));
			 var visitedOn = ($(xData.responseXML).SPFilterNode("z:row").attr(ows + "Modified")).split(" ")[0];
			 $("#lastVisitedDate").html(visitedOn);
			}
		}); //sps updateList
		}//else
		
	  }//completefunc
	});//spservices
	
	
	
	$("#createdInfo").click(function(){
	   $("#debugDiv").append("line 91: createdOn " + createdOn + "<br>");
	});
	
  })(jQuery)

  
});//document.observe





//04/05/2016 from the dev server
document.observe('dom:loaded',function(){
	var fileName = "countdown";
	var debugFlag = false;
	var userName = "";
	var ows ="ows_";
	var listName = "Visitor Count";
	userName = getCurrentUserName();
	//writeDebugInfo(fileName,6,'currUser',userName);
	debugFlag = enableDebug(userName);
	
	var userId = _spPageContextInfo.userId;
	//writeDebugInfo(fileName, 10,'UserId',userId);
	var pageListId = _spPageContextInfo.pageListId;
	//writeDebugInfo(fileName, 12,'pageListId',pageListId);
	
	//writeDebugInfo(fileName, 13,'location',location.href);
	
var myuri = location.href.split("?")[0];
 var fullUri = myuri;
//$("#debugDiv").append("line 15: myuri " + myuri + "<br>");
myuri = myuri.split("/");
var shortUrl ="";
for(var i=3;i<myuri.length;i++){
	 //$("#debugDiv").append("myuri["+i+"] " + myuri[i] + "<br>");
	 shortUrl = shortUrl +"/"+ myuri[i];	  
 }  
	//writeDebugInfo(fileName, 27,'shortUrl',shortUrl);
	
var CAMLQuery = "<Query><Where>";
CAMLQuery += "<Eq><FieldRef Name='Title'/><Value Type='Text'>" + shortUrl +"</Value></Eq>";
CAMLQuery += "</Where></Query>";

  
  //writeDebugInfo(fileName, 22,'CAMLQuery',CAMLQuery);
  
  (function($){
  $().SPServices({
	  operation: "GetListItems",
	  listName: listName,
	  CAMLQuery: CAMLQuery,
	  completefunc: function (xData, Status) {
		resultCount = parseFloat($(xData.responseXML).SPFilterNode("rs:data").attr("ItemCount"));
		writeDebugInfo(fileName, 30,'resultCount',resultCount.toString());		
		printSPdebugData(xData, Status, "GetListItems");
		if(resultCount===0){
			//page has not been inserted to the list yet, add new item to VisitorCount list
			//Title, PageGuid, PageUrl, VisitCount
			$().SPServices({
				operation: "UpdateListItems",
				async: false,
				batchCmd: "New",
				listName: listName,
				valuepairs: [
				["Title", shortUrl], 
				["PageUrl", fullUri],
				["VisitCount", 1]
					],
				completefunc: function(xData, Status) {
				resultCount = parseFloat($(xData.responseXML).SPFilterNode("rs:data").attr("ItemCount"));
				$("#visitorCountSpan").html(parseFloat($(xData.responseXML).SPFilterNode("z:row").attr(ows + "VisitCount")));
				var visitedOn = ($(xData.responseXML).SPFilterNode("z:row").attr(ows + "Modified")).split(" ")[0];
				$("#lastVisitedDate").html(visitedOn);
				}
			});
		}
		else
		{
		//	printSPdebugData(xData, Status, "GetListItems");
	visitCount = parseFloat($(xData.responseXML).SPFilterNode("z:row").attr(ows + "VisitCount"));
	itemId = parseFloat($(xData.responseXML).SPFilterNode("z:row").attr(ows + "ID"));
	createdOn =$(xData.responseXML).SPFilterNode("z:row").attr(ows + "Created_x0020_Date");
	pageurl = $(xData.responseXML).SPFilterNode("z:row").attr(ows + "PageUrl");
	visitCount++;
   
	   
		$().SPServices({
			operation: "UpdateListItems",
			async: false,
			batchCmd: "Update",
			listName: listName,
			ID: itemId,
			valuepairs: [
			   ["VisitCount", visitCount]
			   ],
			completefunc: function(xData, Status) 
			{
			resultCount = parseFloat($(xData.responseXML).SPFilterNode("rs:data").attr("ItemCount"));
			 //print out the current count in the VisitCountDiv
			$("#visitorCountSpan").html(parseFloat($(xData.responseXML).SPFilterNode("z:row").attr(ows + "VisitCount")));
			 var visitedOn = ($(xData.responseXML).SPFilterNode("z:row").attr(ows + "Modified")).split(" ")[0];
			 $("#lastVisitedDate").html(visitedOn);
			}
		}); //sps updateList
		}//else
		
	  }//completefunc
	});//spservices
	
	
	
	$("#createdInfo").click(function(){
	   $("#debugDiv").append("line 91: createdOn " + createdOn + "<br>");
	});
	
  })(jQuery)

  
});//document.observe
document.observe('dom:loaded',function(){
	var fileName = "countdown";
	var debugFlag = false;
	var userName = "";
	var ows ="ows_";
	var listName = "Visitor Count";
	userName = getCurrentUserName();
	//writeDebugInfo(fileName,6,'currUser',userName);
	debugFlag = enableDebug(userName);
	
	var userId = _spPageContextInfo.userId;
	//writeDebugInfo(fileName, 10,'UserId',userId);
	var pageListId = _spPageContextInfo.pageListId;
	//writeDebugInfo(fileName, 12,'pageListId',pageListId);
	
	//writeDebugInfo(fileName, 13,'location',location.href);
	
var myuri = location.href.split("?")[0];
 var fullUri = myuri;
//$("#debugDiv").append("line 15: myuri " + myuri + "<br>");
myuri = myuri.split("/");
var shortUrl ="";
for(var i=3;i<myuri.length;i++){
	 //$("#debugDiv").append("myuri["+i+"] " + myuri[i] + "<br>");
	 shortUrl = shortUrl +"/"+ myuri[i];	  
 }  
	//writeDebugInfo(fileName, 27,'shortUrl',shortUrl);
	
var CAMLQuery = "<Query><Where>";
CAMLQuery += "<Eq><FieldRef Name='Title'/><Value Type='Text'>" + shortUrl +"</Value></Eq>";
CAMLQuery += "</Where></Query>";

  
  //writeDebugInfo(fileName, 22,'CAMLQuery',CAMLQuery);
  
  (function($){
  $().SPServices({
	  operation: "GetListItems",
	  listName: listName,
	  CAMLQuery: CAMLQuery,
	  completefunc: function (xData, Status) {
		resultCount = parseFloat($(xData.responseXML).SPFilterNode("rs:data").attr("ItemCount"));
		writeDebugInfo(fileName, 30,'resultCount',resultCount.toString());		
		printSPdebugData(xData, Status, "GetListItems");
		if(resultCount===0){
			//page has not been inserted to the list yet, add new item to VisitorCount list
			//Title, PageGuid, PageUrl, VisitCount
			$().SPServices({
				operation: "UpdateListItems",
				async: false,
				batchCmd: "New",
				listName: listName,
				valuepairs: [
				["Title", shortUrl], 
				["PageUrl", fullUri],
				["VisitCount", 1]
					],
				completefunc: function(xData, Status) {
				resultCount = parseFloat($(xData.responseXML).SPFilterNode("rs:data").attr("ItemCount"));
				$("#visitorCountSpan").html(parseFloat($(xData.responseXML).SPFilterNode("z:row").attr(ows + "VisitCount")));
				var visitedOn = ($(xData.responseXML).SPFilterNode("z:row").attr(ows + "Modified")).split(" ")[0];
				$("#lastVisitedDate").html(visitedOn);
				}
			});
		}
		else
		{
		//	printSPdebugData(xData, Status, "GetListItems");
	visitCount = parseFloat($(xData.responseXML).SPFilterNode("z:row").attr(ows + "VisitCount"));
	itemId = parseFloat($(xData.responseXML).SPFilterNode("z:row").attr(ows + "ID"));
	createdOn =$(xData.responseXML).SPFilterNode("z:row").attr(ows + "Created_x0020_Date");
	pageurl = $(xData.responseXML).SPFilterNode("z:row").attr(ows + "PageUrl");
	visitCount++;
   
	   
		$().SPServices({
			operation: "UpdateListItems",
			async: false,
			batchCmd: "Update",
			listName: listName,
			ID: itemId,
			valuepairs: [
			   ["VisitCount", visitCount]
			   ],
			completefunc: function(xData, Status) 
			{
			resultCount = parseFloat($(xData.responseXML).SPFilterNode("rs:data").attr("ItemCount"));
			 //print out the current count in the VisitCountDiv
			$("#visitorCountSpan").html(parseFloat($(xData.responseXML).SPFilterNode("z:row").attr(ows + "VisitCount")));
			 var visitedOn = ($(xData.responseXML).SPFilterNode("z:row").attr(ows + "Modified")).split(" ")[0];
			 $("#lastVisitedDate").html(visitedOn);
			}
		}); //sps updateList
		}//else
		
	  }//completefunc
	});//spservices
	
	
	
	$("#createdInfo").click(function(){
	   $("#debugDiv").append("line 91: createdOn " + createdOn + "<br>");
	});
	
  })(jQuery)

  
});//document.observe

