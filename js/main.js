
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
function initiailize ()
{
	SetNotification();
	setTabs();
	/* activate the first tab */
	activateTab("");
	setiframelink("a");//_"https://www.youtube.com/");
}
window.onLoad = initiailize();