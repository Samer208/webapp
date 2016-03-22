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
 * 		initiailize()
 * 
 */
function setNotification (note) {
	var notifactions =	document.querySelector(".notifications");
	notifactions.innerHTML = note;// "Testing - the  functions works";

}
function setiframelink(link)
{
	var iframe = document.querySelector(".iframe-window");
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
	
	var tabs = document.querySelectorAll(".tab-link");
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
		document.querySelector(".tab-selector").className="active-tab";
	}	
	else
	{
		/*select all thhe links (<a>) that are in the tabs */
		var tabLinks=document.querySelectorAll(".tab-link");
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
		setNotification(selectedTab);
		if(selectedTab == "#my-folders")
		{
					setNotification("www.paulirish.com");
					setiframelink("https://www.google.com/");	
		}
	}
}
function requestData()
{

	var data =localStorage.getItem("webappData");
	/** herer , yet to finish the if thing */
		setNotification("i am here with the data 1 ");
	if(data ==  null)
	{
		setNotification("i am here with the data 2 ");
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
					setNotification("i am here with the data 3 ");
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
			{
				setNotification("i am here with the data4 ");
				data = JSON.parse(xmlhttp.responseText);
				localStorage.setItem("webappData", JSON.stringify(data));
					setNotification("i am here with the data5 ");
				setNotification(data.notification);
				setNotification("i am here with the data 6");
			}
		};
		xmlhttp.open("GET","./data/config.json", true);
		xmlhttp.send();
	}
			setNotification("i am here with the data out ");
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
	var rows = document.querySelectorAll(".row-header");
	var names = [] , links = []; 
	for(var i=1;i<=rows.length;i++)
	{
		var name = document.getElementById("name"+i);
		var url  = document.getElementById("url"+i)
		if(name.value !="" && url.value !="")
		{
				names[i] = name.value;
				links[i] = url.value;
		}
		else
		{
			if(name.value =="")
			{
				if(url.value != "")
				{
					name.style.border= "1px solid red";
				}
			}
			else
			{
				if(url.value =="")
				{
					url.style.border= "1px solid red";
				}
			}
		}	
	}
	/* store the adata in the local storage and in the apropriate tab list  */
	if (links.length!= 0) 
{	
	
		var activeTab = document.querySelector(".active-tab .tab-link").hash;	
		var data = localStorage.getItem("webappData");
		data = JSON.parse(data);
				if(data == null)
				{
							setNotification("the data is null");
				}
		for (var i=0;i<data.tabsList.length;i++)
		{
			setNotification("i am here " + i);
			if(data.tabsList[i].options.rowLabel == activeTab)
			{
				for(var j=0; j<names.length;j++)
				{
					//add to the tab links list
					document.querySelector(activeTab +" .links-list").innerHTML += "<li> <a href=\"" +links[j]+ "\">"+names[j]+ "</a></li>"; 
					// add to local storage 
					data.tabsList[i].options.links.push(names[j],links[j]);
				}
			}
		}
		localStorage.setItem("webappData", JSON.stringify(data));
		setLinksList();  // update the link list 
		//close the form
		document.querySelector(".setting-form").style.display = "none";
	}

}
function setLinksList()
{
	var activeTab = document.querySelector(".active-tab .tab-link").hash;
	var linkslist = document.querySelector(activeTab + ".links-list"); //gets the hiddedn "ul" of the active tab
	document.querySelector(".active-list").innerHTML=linkslist.innerHTML; // set the active list to hold all the tab links
	document.querySelector(".current-link").innerHTML = linkslist.firstChild.innerHTML; //set current-link to be the active list first child
	/*set event listener for the active list links  */
	var links = document.querySelector(".active-list").childNodes;
	for (var i=0 ; i< links.length;i++)
	{
		links[i].addEventListener("click",function(e){
			document.querySelector(".current-link").innerHTML = this.innerHTML;
			// update the ifram link
			var link = document.querySelector(".current-link a").href;
			setiframelink(link);		
		});
	}
	if (activeTab == "#my-folders" || activeTab == "#public-folders") 
	{
		document.querySelector(".active-list").innerHTML = "";
	};
}							
function initiailize ()
{
	requestData();
	setTabs();
	/* activate the first tab */
	activateTab("");
	/* add event listener for setting icon */
	document.getElementById("settings-icon").addEventListener("click",function(e){
		var settingsForm = document.querySelector(".setting-form");
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
	document.getElementById("save-botton").addEventListener("click",function(e){ saveData();});
}
window.onLoad = initiailize();