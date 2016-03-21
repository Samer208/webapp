
function setiframelink(link)
{

	/*select the ifram by id */
	var iframe=document.querySelector(".iframe-window"),url;
	url="https://www.youtube.com/";	
	iframe.src = url.toString();
		
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
	}
}
function SetNotification () {
	var notifactions =	document.querySelector(".notifications");
	notifactions.innerHTML = "Testing - the  functions works";

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
		for(var i=1;i<=3;i++)
	{
		var name = document.getElementById("name"+i);
		var url  = document.getElementById("url"+i)
		
		if(name.value !="")
		{
			if(url.value == "")
			{
				url.style.border= "1px solid red";
			}
			else
			{ 	/* add the name and url to the apropriate ul (list) */
				var activeTab = document.querySelector(".active-tab .tab-link").hash; // gets the name of the active tab , by accesseing the hash of the first link in it 
				var list = document.queryselector(activeTab + " ul") ;
				var listItem = document.createElement("li");
				listItem.value= "name";
				
			}
		}
		else
		{
			if(url.value != "")
			{
				name.style.border= "1px solid red";
			}
		}
	}
}							
function initiailize ()
{
	SetNotification();
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
			settingsForm.style.display = "block"
			document.getElementById("settings-icon").style.backgroundColor ="white";
		}
	});
	
	document.getElementById("cancel-botton").addEventListener("click",function(e){ Cancelbutton(); });
	
	setiframelink("a");//_"https://www.youtube.com/");
}
window.onLoad = initiailize();