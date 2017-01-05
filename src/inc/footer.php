<script>
	"use strict";

	glimpseBackground('#glimpse');


	function glimpseBackground(id){

		if (/^#/.test(id) === false) return console.error("An element id is required");

		var element = document.querySelector(id);
		var glimpseData = element ? element.getAttribute('data-glimpse') : false;

		if (glimpseData){

			// Retrieve and style the background-color
			element.style.backgroundColor = glimpse.meta(glimpseData, 'color');

			// Create and style the background-image
			glimpse.base64(glimpseData, function(base64Image){

				// Set the base64 image as the background-image for the :after pseudo-element.
				styleSelector(id + ":after", { 'background-image': "url(" + base64Image + ")" });

				// Set a class for the element when the glimpse is complete.
				element.classList.add("glimpsed");

				// Reveal the image if its present
				var source = element.getAttribute('data-source');
				if (source){
					var image = create('img');
					image.onload = function(){ element.classList.add("loaded") }
					image.src = source;
				}

			});

		}

	}

	function styleSelector(selector, style){

		var element = create('style');
		var content = [ selector + "{" ]; // selector and opening bracket

		for (var property in style) if (style.hasOwnProperty(property)){
			content.push(property + ":" + style[property] + ";");
		}

		element.setAttribute('rel', "stylesheet");
		element.setAttribute('type', "text/css");
		element.textContent = content.join("") + "}";

		document.head.appendChild(element);

	}

	function addClass(element, className){ element.classList.add(className) }

	function create(tag){ return document.createElement(tag) }
</script>

</body>
</html>