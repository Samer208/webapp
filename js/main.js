/*
 *	functions list :
 *		setNotification (note)		done
 * 		setiframelink(link)
 * 		setTabs() not done
 * 		activateTab(selectedTab)()
 * 		requestData()
 * 		Cancelbutton()
 * 		saveData()
 * 		setLinksList()
 * 		setQuickActions(quickaction)
 * 		initiailize()
 * 
 */
function $(selector) {
    return document.querySelector(selector);
}
function all(selector) {
    return document.querySelectorAll(selector);
}

function setNotification (note) {
	var notifactions =	$(".notifications");
	notifactions.innerHTML += note +" <br> ";// "Testing - the  functions works";

}
function setiframelink(link)
{
	var iframe = $(".iframe-window");
	iframe.src=link;
	setExpandLink(iframe.src);
}
function setExpandLink(link)
{
	
	document.getElementById("expand-icon").href=link;
}

function setTabs()
{
	/**sets an event listening for each tab */
	
	var tabs = all(".tab-link");
	/*	add event listening for each tab  */
	for(var i=0; i<tabs.length; i++)
	{
		tabs[i].addEventListener("click",function(e) {
			activateTab(this.hash);
		})
	}  
}
function activateTab(selectedTab)
{
	if(selectedTab == "")
	{
		/* incase no tab has yet been chosen - activate the first tab */
		$(".tab-selector").className="active-tab";
	}	
	else
	{
		/*select all thhe links (<a>) that are in the tabs */
		var tabLinks=all(".tab-link");
		for(var i=0;i<tabLinks.length;i++)
		{
			/*activate the tab that the Hash in its link equals to selectedTab */
			if(tabLinks[i].hash ==  selectedTab)
			{
				tabLinks[i].parentNode.className = "active-tab";
			}
			else /* deactivate all other tabs */
			{
				tabLinks[i].parentNode.className = "tab-selector";//tab-selector";
			}
		}
		tabLinks[i-1].parentNode.className += " no-right-margin";
	}
	// update the active link list
	setLinksList();
	var url =$(selectedTab + " .links-list > li > a");
	// check if the list is empty
	if (url != null)
	{
		setiframelink($(selectedTab + " .links-list > li > a").href);
	}
	/* hide or show the setting icon and active links*/
	if(selectedTab == "#my-folders" || selectedTab == "#public-folders")
	{
		$(".current-link").style.display="none";
		document.getElementById("settings-icon").style.display="none";
	}
	else
	{
		$(".current-link").style.display="block";
		document.getElementById("settings-icon").style.display="block";
		// hide and display the folder,report labels
		var reportLabels = all(".report-label");
		var folderLabels = all(".folder-label");
		if(selectedTab == "#quick-reports")
		{		
			for(var k=0;k<reportLabels.length;k++)
			{
				reportLabels[k].style.display = "inline";
				folderLabels[k].style.display= "none";
			}
		}
		else
		{
			for(var k=0;k<reportLabels.length;k++)
			{
				reportLabels[k].style.display = "none";
				folderLabels[k].style.display = "inline";
			}
		}
	}
}
function requestData()
{

	var data =localStorage.getItem("webappData");
	
	if(data == null)
		{
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
				{
					data = JSON.parse(xmlhttp.responseText);
					localStorage.setItem("webappData", JSON.stringify(data));
					setNotification(data.notification);
					setQuickActions(data.quickActions);
					initializeLinks();
				}
			};
			xmlhttp.open("GET","./data/config.json", true);
			xmlhttp.send();
		}
		else
		 {
			data = JSON.parse(data);
			//set notification
			setNotification(data.notification);
			setQuickActions(data.quickActions);
			initializeLinks();	
		}
}
function Cancelbutton()
{
	for(var i=1;i<=3;i++)
	{
		document.getElementById("name"+i).value="";
		document.getElementById("url"+i).value="";
	}
}
function saveData()
{
	var rows = all(".row-header");
	var links = []; 
	var count=0;
	var bool = 0;// if there is a missing data , bool=1
	for(var i=1;i<=rows.length;i++)
	{
		var name = document.getElementById("name"+i);
		var url  = document.getElementById("url"+i)
		if(name.value !="" && url.value !="")
		{
			links[count] = {
				name: name.value,
				url: url.value
			};
			count++;
		}
		else
		{
			if(name.value =="")
			{
				if(url.value != "")
				{
					bool=1;
				}
			}
			else
			{
				if(url.value =="")
				{
					bool=1;
				}
			}
		}	
	}
	/* store the adata in the local storage and in the apropriate tab list  */
	if(links.length>0 || bool!=1)
	{
		var activeTab = $(".active-tab .tab-link").hash;	
		var data = localStorage.getItem("webappData");
		data = JSON.parse(data);
		for (var i=0;i<data.tabsList.length;i++)
		{
			if(data.tabsList[i].options.rowLabel == activeTab)
			{ 
				for(var j=0; j < links.length;j++)
				{
					//add to the tab links list
					$(activeTab +" .links-list").innerHTML += "<li><a href=\"" +links[j].url+ "\">"+links[j].name+ "</a></li>"; 
					// add to local storage 
					data.tabsList[i].options.links.push(links[j]);
				}
			}
		}
		localStorage.setItem("webappData", JSON.stringify(data));
		setLinksList();  // update the link list 
		//clear the form 
		Cancelbutton();
		//close the form
		$(".setting-form").style.display = "none";
	}
}
function initializeLinks()
{	//add the existing links in the local storage into each tab liks list
	var data = localStorage.getItem("webappData");
	data = JSON.parse(data);
	var tabsList=data.tabsList;
	var tab;
	var links=[];
	for(var i=0 ; i < tabsList.length;i++)
	{	// get the name of the tab (with the hash)
		tab=tabsList[i].options.rowLabel; 
		links=tabsList[i].options.links;
		for(var j=0; j < links.length; j++)
		{	
			$(tab +" .links-list").innerHTML += "<li><a   onclick='return false;' href=\"" +links[j].url+ "\">"+links[j].name+ "</a></li>"; 
		}
	}
}
function setLinksList()
{
	var activeTab = $(".active-tab .tab-link").hash;
	var linkslist = $(activeTab + " .links-list"); //gets the hiddedn "ul" of the active tab
	$(".active-list").innerHTML=linkslist.innerHTML; // set the active list to hold all the tab links
	/*set event listener for the active list links  */
	var links = all(".active-list > li");
		for (var i=0 ; i< links.length;i++)
		{
			links[i].addEventListener("click",function(e){
				$(".current-link").innerHTML = this.firstChild.innerHTML;
				// update the ifram link
				setiframelink(this.firstChild.href);	
				$(".active-list").style.display="none";
			});
		}
	if(links.length > 0)
	{
		$(".current-link").innerHTML = $(".active-list > li > a").innerHTML ;//linkslist.firstChild.value; //set current-link to be the active list first child
	}

}
function setQuickActions(quickActions)
{
	var navsections = all(".nav-section");
	for(var i=0;i<quickActions.length;i++)
	{
		//setting the label 
		navsections[i].innerHTML = "<p>"+ quickActions[i].label +"</p>" +navsections[i].innerHTML ;
		//setting the background 
		navsections[i].style.background="url(./img/icons/" + quickActions[i].icon + ".png) center 80px no-repeat black";
	}
	var menucaptions = all(".menu-caption");	
	for(var i=0;i<menucaptions.length;i++)
	{
		menucaptions[i].innerHTML = "<p> "+ quickActions[i].actionsLabel +"</p>";	
	}
	
	var actionsList = all(".action-list");
	for(var i=0;i<actionsList.length;i++)
	{
		var actions = quickActions[i].actions;	
		for(var j=0;j<actions.length;j++)
		{	
			actionsList[i].innerHTML += "<li class=\"action-list-item\"><a href=\"" + actions[j].url + "\">" + actions[j].label + "</a></li>";
		}
	}
	/* note : somehow they dont like to be in 1 for , somehow they only work if they yare seperated . why??!!! why!!!!! */
}							
function initiailize ()
{
	requestData();
	setTabs();
	/* activate the first tab */
	activateTab("");
	/* add event listener for setting icon */
	document.getElementById("settings-icon").addEventListener("click",function(e){
		var settingsForm = $(".setting-form");
		if(settingsForm.style.display == "block")
		{
			settingsForm.style.display = "none";
			document.getElementById("settings-icon").style.backgroundColor ="transparent";
		}
		else
		{
			settingsForm.style.display = "block";
			document.getElementById("settings-icon").style.backgroundColor ="white";
		}
	});
	
	document.getElementById("cancel-botton").addEventListener("click",function(e){ Cancelbutton(); });
	document.getElementById("save-botton").addEventListener("click",function(e){
		 saveData();
		 $(".setting-form").action = $(".active-tab .tab-link").hash;
	});
	$(".current-link").addEventListener("click",function(e)
	{
		//show the other links
		var list =$(".active-list");
		if(list.style.display == "block")
		{
			list.style.display="none";
		}
		else
		{
			list.style.display="block";
		}
	});
}
window.onLoad = initiailize();