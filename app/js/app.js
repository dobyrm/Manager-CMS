$(document).ready(function() {

	$('input#pass, input#p_pass').liTranslit();

	$('input#new_pass, input#new_p_pass').liTranslit();

	$('input#title').unbind().blur( function(){
		var val = $(this).val();
		$('input#alias').val(val);
		$('input#alias').liTranslit();
	}); // end blur

	$(window).scroll(function(){
		if ( $(this).scrollTop() > 20 ){
			$(".hidden_bottom_form_event").css('display', 'block');
			$(".right_site_seting").css('display', 'none');
		}	else if($(this).scrollTop() <= 20 ) {
			$(".hidden_bottom_form_event").css('display', 'none');
		}
	});//scroll

	$(".various").fancybox({
		maxWidth	: 800,
		maxHeight	: 600,
		fitToView	: false,
		width		: '70%',
		height		: '70%',
		autoSize	: false,
		closeClick	: false,
		openEffect	: 'none',
		closeEffect	: 'none'
	});
	
	function handleFileSelect(evt) {
	var files = evt.target.files; // FileList object

		// Loop through the FileList and render image files as thumbnails.
		for (var i = 0, f; f = files[i]; i++) {

			// Only process image files.
			if (!f.type.match('image.*')) {
				continue;
			}

		var reader = new FileReader();

			// Closure to capture the file information.
			reader.onload = (function(theFile) {
				$('.btn_popap_upload').show();
				return function(e) {
					// Render thumbnail.
					var span = document.createElement('div');
					span.innerHTML = ['<div class="col-md-2"><img class="thumb" src="', e.target.result,
					'" title="', escape(theFile.name), "', onclick=", test_thumb(e.target.result) ,'" /></div>'].join('');
					document.getElementById('list').insertBefore(span, null);
					//$('.img_data').html("<div class='col-md-2'><img class='thumb galery' src=" + e.target.result + " title=" + escape(theFile.name)+ "/></div>");
				};
			})(f);

		// Read in the image file as a data URL.
		reader.readAsDataURL(f);
		}
	}

  document.getElementById('files').addEventListener('change', handleFileSelect, false);

 	function test_thumb(src){
		$('#thumbphoto').attr({
			src: src
		});
	}

	$('.ava').click(function(){

		$(".header_site_menu>.dropdown-menu").slideToggle();

	});

	$('.setings_site').click(function(){

		$(".right_site_seting").slideToggle();

	});

 	$('.galery img').click( function(){
	 		$('.thumbs_all').show();
			var src = this.src = this.getAttribute('src');
			var alt = this.alt = this.getAttribute('alt');
			
			$('#thumbphoto').attr({
				src: src,
				alt: alt
			});
			$('#name').text(alt);
			var img = new Image();
			img.src = src;
			$('#img_width_height').text(this.width + 'x' + this.height);
		});

		$( function() {
			$( "#sortable" ).sortable();
			$( "#sortable" ).disableSelection();
		} );

		(function() {
	  
	  "use strict";

	  //////////////////////////////////////////////////////////////////////////////
	  //////////////////////////////////////////////////////////////////////////////
	  //
	  // H E L P E R    F U N C T I O N S
	  //
	  //////////////////////////////////////////////////////////////////////////////
	  //////////////////////////////////////////////////////////////////////////////

	  /**
	   * Function to check if we clicked inside an element with a particular class
	   * name.
	   * 
	   * @param {Object} e The event
	   * @param {String} className The class name to check against
	   * @return {Boolean}
	   */
	  function clickInsideElement( e, className ) {
	    var el = e.srcElement || e.target;
	    
	    if ( el.classList.contains(className) ) {
	      return el;
	    } else {
	      while ( el = el.parentNode ) {
	        if ( el.classList && el.classList.contains(className) ) {
	          return el;
	        }
	      }
	    }

	    return false;
	  }

	  /**
	   * Get's exact position of event.
	   * 
	   * @param {Object} e The event passed in
	   * @return {Object} Returns the x and y position
	   */
	  function getPosition(e) {
	    var posx = 0;
	    var posy = 0;

	    if (!e) var e = window.event;
	    
	    if (e.pageX || e.pageY) {
	      posx = e.pageX;
	      posy = e.pageY;
	    } else if (e.clientX || e.clientY) {
	      posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
	      posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	    }

	    return {
	      x: posx,
	      y: posy
	    }
	  }

	  //////////////////////////////////////////////////////////////////////////////
	  //////////////////////////////////////////////////////////////////////////////
	  //
	  // C O R E    F U N C T I O N S
	  //
	  //////////////////////////////////////////////////////////////////////////////
	  //////////////////////////////////////////////////////////////////////////////
	  
	  /**
	   * Variables.
	   */
	  var contextMenuClassName = "context-menu";
	  var contextMenuItemClassName = "context-menu__item";
	  var contextMenuLinkClassName = "context-menu__link";
	  var contextMenuActive = "context-menu--active";

	  var taskItemClassName = "task";
	  var taskItemInContext;

	  var clickCoords;
	  var clickCoordsX;
	  var clickCoordsY;

	  var menu = document.querySelector("#context-menu");
	  var menuItems = menu.querySelectorAll(".context-menu__item");
	  var menuState = 0;
	  var menuWidth;
	  var menuHeight;
	  var menuPosition;
	  var menuPositionX;
	  var menuPositionY;

	  var windowWidth;
	  var windowHeight;

	  /**
	   * Initialise our application's code.
	   */
	  function init() {
	    contextListener();
	    clickListener();
	    keyupListener();
	    resizeListener();
	  }

	  /**
	   * Listens for contextmenu events.
	   */
	  function contextListener() {
	    document.addEventListener( "contextmenu", function(e) {
	      taskItemInContext = clickInsideElement( e, taskItemClassName );

	      if ( taskItemInContext ) {
	        e.preventDefault();
	        toggleMenuOn();
	        positionMenu(e);
	      } else {
	        taskItemInContext = null;
	        toggleMenuOff();
	      }
	    });
	  }

	  /**
	   * Listens for click events.
	   */
	  function clickListener() {
	    document.addEventListener( "click", function(e) {
	      var clickeElIsLink = clickInsideElement( e, contextMenuLinkClassName );

	      if ( clickeElIsLink ) {
	        //e.preventDefault();
	        menuItemListener( clickeElIsLink );
	      } else {
	        var button = e.which || e.button;
	        if ( button === 1 ) {
	          toggleMenuOff();
	        }
	      }
	    });
	  }

	  /**
	   * Listens for keyup events.
	   */
	  function keyupListener() {
	    window.onkeyup = function(e) {
	      if ( e.keyCode === 27 ) {
	        toggleMenuOff();
	      }
	    }
	  }

	  /**
	   * Window resize event listener
	   */
	  function resizeListener() {
	    window.onresize = function(e) {
	      toggleMenuOff();
	    };
	  }

	  /**
	   * Turns the custom context menu on.
	   */
	  function toggleMenuOn() {
	    if ( menuState !== 1 ) {
	      menuState = 1;
	      menu.classList.add( contextMenuActive );
	    }
	  }

	  /**
	   * Turns the custom context menu off.
	   */
	  function toggleMenuOff() {
	    if ( menuState !== 0 ) {
	      menuState = 0;
	      menu.classList.remove( contextMenuActive );
	    }
	  }

	  /**
	   * Positions the menu properly.
	   * 
	   * @param {Object} e The event
	   */
	  function positionMenu(e) {
	    clickCoords = getPosition(e);
	    clickCoordsX = clickCoords.x;
	    clickCoordsY = clickCoords.y;

	    menuWidth = menu.offsetWidth + 4;
	    menuHeight = menu.offsetHeight + 4;

	    windowWidth = window.innerWidth;
	    windowHeight = window.innerHeight;

	    if ( (windowWidth - clickCoordsX) < menuWidth ) {
	      menu.style.left = windowWidth - menuWidth + "px";
	    } else {
	      menu.style.left = clickCoordsX + "px";
	    }

	    if ( (windowHeight - clickCoordsY) < menuHeight ) {
	      menu.style.top = windowHeight - menuHeight + "px";
	    } else {
	      menu.style.top = clickCoordsY + "px";
	    }
	  }

	  /**
	   * Dummy action function that logs an action when a menu item link is clicked
	   * 
	   * @param {HTMLElement} link The link that was clicked
	   */
	  function menuItemListener( link ) {
	  	var new_link = link + '?id=' + taskItemInContext.getAttribute("data-id");
	  	$(link).attr("href", new_link)
	    //console.log( "Task ID - " + taskItemInContext.getAttribute("data-id") + ", Task action - " + link.getAttribute("data-action"));
	    //toggleMenuOff();
	  }

	  /**
	   * Run the app.
	   */
	  init();

	})();

});