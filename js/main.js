//Mark A. Blaine
//VFW 1207
//JavaScript for Project 2

//Wait until DOM is ready
window.addEventListener("DOMContentLoaded", function(){

	//getElementsById Function
	function $(x){
		var theElement = document.getElementById(x);
		return theElement;
	}

	//Create select field element and populate with options
	function makeList(){
		var formTag = document.getElementsByTagName("form"),  // formTag is an array of all the form tags
			selectLi = $('select'),
			makeSelect = document.createElement('select');
			makeSelect.setAttribute("id", "groups");
		for (var i=0, j=locations.length; i<j; i++){
			var makeOption = document.createElement('option');
			var optText = locations[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}
		selectLi.appendChild(makeSelect);
	}
	
	//Find value of selected radio button
	function getSelectedRadio(){
		var radios = document.forms[0].priority;
		for (var i=0; i<radios.length; i++){
			if (radios[i].checked){
				priorityValue = radios[i].value;
			}
		}
	}
	
	//Make toggle controls when displaying the data
	function toggleControls(n){
		switch(n){
			case "on":
				$('honeyForm').style.display = "none";
				$('clear').style.display = "inline";
				$('displayLink').style.display = "none";
				$('addNew').style.display = "inline";
				$('listHeader').style.display = "inline";
				break;
			case "off":
				$('honeyForm').style.display = "block";
				$('clear').style.display = "inline";
				$('displayLink').style.display = "inline";
				$('addNew').style.display = "none";
				$('items').style.display = "none";
				$('listHeader').style.display = "none";
				break;
			default:
				return false;
		}
	}
	
	//Store the form data in local storage
	function storeData(){
		//Generate a random number for a key
		var id 				= Math.floor(Math.random()*1000000001);
		//Figure out which radio button is selected
		getSelectedRadio();
		//Gather up all of our form field values and store in an object
		//Object properties are going to contain an array with the form label and input value.
		var item			= {};
			item.taskName 	= ["Task name:", $('taskName').value];
			item.group		= ["Location:", $('groups').value];
			item.dueDate	= ["Due date:", $('dueDate').value];
			item.importance	= ["Importance:", $('importance').value];
			item.priority 	= ["Priority:", priorityValue];
			item.honey 		= ["List for:", $('forHoney').value];
			item.specialInstructions = ["How to not mess up:", $('specialInstructions').value];
		//Save data to local storage: Use Stringify to convert our object to a string.
		localStorage.setItem(id, JSON.stringify(item));
		alert("Honey Do Saved!");
	}
	
	function getData(){
		toggleControls("on");
		if (localStorage.length===0){
			alert("There is nothing for the Honey to do");
		}
		//Write data from local storage to the browser
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$('items').style.display = "block";
		for (var i=0, len=localStorage.length; i<len; i++){
			var makeli = document.createElement('li');
			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			//Convert string from local storage value back to an object by using JSON.parse
			var obj = JSON.parse(value);
			var makeSubList = document.createElement('ul');
			makeli.appendChild(makeSubList);
			for (var n in obj){
				var makeSubli = document.createElement('li');
				makeSubList.appendChild(makeSubli);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubli.innerHTML = optSubText;
				
			}
		}
	}
	
	//Function to clear the local storage
	function clearLocal(){
		if (localStorage.length===0){
			alert("There is no data to clear.");
		}else{
			localStorage.clear();
			alert("All Honey Do items are deleted!");
			window.location.reload();
			return false;
		}
	}
	
	
	//Variable defaults
	var locations = ["--Choose a Location--", "Home", "Car", "Errand"],
		priorityValue;

	//Run the makeList function to create the location dropdown
	makeList();
	
	//Set Link & Submit Click Events
	var displayLink = $('displayLink');
	displayLink.addEventListener("click", getData);
	var clearLink = $('clear');
	clearLink.addEventListener("click", clearLocal);
	var save = $('submit');
	save.addEventListener("click", storeData);

});