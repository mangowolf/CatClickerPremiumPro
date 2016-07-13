/*Model that contains all the data for the cat object*/

var model = {
	currentCat: null,
	cats: [
		{
			clickCount: 0,
			name: 'Tabby',
			imgSrc: 'img/434164568_fea0ad4013_z.jpg',
			imgAttribution: 'https://www.flickr.com/photos/bigtallguy/434164568'
		},
		{
			clickCount: 0,
			name: 'Tiger',
			imgSrc: 'img/4154543904_6e2428c421_z.jpg',
			imgAttribution: 'https://www.flickr.com/photos/xshamx/4154543904'
		},
		{
			clickCount: 0,
			name: 'Scaredy',
			imgSrc: 'img/22252709_010df3379e_z.jpg',
			imgAttribution: 'https://www.flickr.com/photos/kpjas/22252709'
		},
		{
			clickCount: 0,
			name: 'Shadow',
			imgSrc: 'img/1413379559_412a540d29_z.jpg',
			imgAttribution: 'https://www.flickr.com/photos/malfet/1413379559'
		},
		{
			clickCount: 0,
			name: 'Sleepy',
			imgSrc: 'img/9648464288_2516b35537_z.jpg',
			imgAttribution: 'https://www.flickr.com/photos/onesharp/9648464288'
		},
	]
};

//controller object that retrieves info from the data model
var octopus = {

	init: function(){
		//set the cat to the first one in the list
		model.currentCat = model.cats[0];

		//retrieve list of cats
		catListView.init();

		//retrieve cat info
		catView.init();

		adminView.init();
	},

	getCurrentCat: function(){
		return model.currentCat;
	},

	getCats: function(){
		return model.cats;
	},

	setCurrentCat: function(cat){
		model.currentCat = cat;
	},

	incrementCounter: function(){
		model.currentCat.clickCount++;
		catView.render();
	}
};

//Object to display the cat info
var catView = {

	init: function(){
		this.catElem = document.getElementById('cat');
		this.catNameElem = document.getElementById('cat-name');
		this.catImageElem = document.getElementById('cat-img');
		this.countElem = document.getElementById('cat-count');

		this.catImageElem.addEventListener('click', function(){
			octopus.incrementCounter();
		});

		this.render();
	},

	render: function(){
		var currentCat = octopus.getCurrentCat();
		this.countElem.textContent = currentCat.clickCount;
		this.catNameElem.textContent = currentCat.name;
		this.catImageElem.src = currentCat.imgSrc;

	}
};

//Object that retrieves list of cats
var catListView = {

	init: function(){
		this.catListElem = document.getElementById('cat-list');

		this.render();

	},

	render: function(){
		var cat, elem, i;

		//get the cats we'll be rendering from the octopus
		var cats = octopus.getCats();

		//empty list of cats
		this.catListElem.innerHTML = '';

		for(i=0; i<cats.length; i++){
			cat = cats[i];

			elem = document.createElement('li');
			elem.textContent = cat.name;

			elem.addEventListener('click', (function(catCopy){
				return function(){
					octopus.setCurrentCat(catCopy);
					catView.render();
				};
			})(cat));

			this.catListElem.appendChild(elem);
		}
	}
};

var adminView = {

	init: function(){
		//this.newCatName = document.getElementById("new-cat-name");

		this.toggle();
		this.save();
	},

	toggle: function(){
		var adminButton = document.getElementById('cat-admin-button');
		var catFields = document.getElementById("cat-fields");
		adminButton.addEventListener('click', function(){
			return function(){
				if(catFields.style.visibility == "hidden"){
					catFields.style.visibility="visible";
				}
				else {
					catFields.style.visibility="hidden";
				}
			}();
		});
	},

	save: function(){
		var curCat;
		//var saveButton = document.getElementById("save-button");
		//console.log(this.newCatName.value);
		//this.newCatName = document.getElementById("new-cat-name");
		var saveButton = document.getElementById("save-button");
		var newCatName = document.getElementById("new-cat-name");
		var newCatURL = document.getElementById('new-cat-url');
		var newClickNum = document.getElementById('new-click-num');
		saveButton.addEventListener('click', function(){
				//console.log(this.newCatName);
				//curCat.name = this.newCatName;
				//this.newCatName = curCat.name;
			curCat = octopus.getCurrentCat();
			curCat.name = newCatName.value;

			//curCat.imgSrc = newCatURL.value;
			//curCat.clickCount = newClickNum.value;
			catListView.render();
			catView.render();
			//var listItem = document.createElement('li');
			//var itemValue = document.createTextNode(newCatName.value);
			//listItem.appendChild(itemValue);
		});
	}
};

octopus.init();