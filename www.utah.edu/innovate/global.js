


$(document).ready(function() {
	inputWatermark(); 					//initialize input watermarks


	//add padding at bottom of equal height responsive columns

	$( ".column-padding" ).after( "<div class='column-bottom-padding'></div>" ); 
});


/* =====================================================================
HEADER INPUT WATERMARKS
======================================================================= */

function inputWatermark() {
	/* on page load, add watermark if no content in input */
	$( "#search" ).each(function( index ) {
		if ($(this).val().length == 0) {
			$(this).addClass("watermark");
		 }else{
			$(this).removeClass("watermark");
		 }
	});

	/* on input focus remove watermark */
	$("#search").on("focus", function(event){	
		$(this).removeClass("watermark");
	});
	
	/* on input blur, add or remove watermark based on content */
	$("#search").on("blur", function(event){
		  if ($(this).val().length == 0) {
			$(this).addClass("watermark");
		  }else{
			$(this).removeClass("watermark");
		 }
	});
}


/* =====================================================================
HEADER NAVIGATION
======================================================================= */

$(document).ready(function() {

	var sw = document.body.clientWidth;

	

	// add the bottom-sub-menu class to the bottom sub-menu UL's
	//$('#bottom-nav').find('.top-sub-menu').addClass('bottom-sub-menu').removeClass('top-sub-menu');

	$('#top-nav').find('.sub-menu').addClass('top-sub-menu');
	$('#bottom-nav').find('.sub-menu').addClass('bottom-sub-menu');

	$('.sub-menu').find('a').unwrap();

	// remove the anchor tags from top level navigation for full screen view
	$('.disable-href > h3 > a').contents().unwrap();
	$('.disable-href > a').contents().unwrap();	
	

	$('.site-content').css('background','#fff');

	/*=======================================*/
	//four column responsive features
	/*=======================================*/
	if (sw > 480 && sw < 766) {
		//group consecutive elements into pairs 1+2, 3+4 to add overflow hidden to containing div
		$('.feature:even').each(function () {
    	$(this).add($(this).next()).wrapAll("<div class='overflow-hide'>");
		});
		//$('.feature').wrap('<div class="inside-div">');
		$('.overflow-hide').after("<div class='column-bottom-padding'></div>");
	}

	//check for screen resizing
	$(window).resize(function() {
		
		sw = document.body.clientWidth;
		if (sw > 950) {

			// adjust menus based on screen size
			$('.top-menu').show();
			$('.bottom-menu').show();
			$('.bottom-sub-menu').show();
			$('ul.top-menu li h3').css('background','transparent');
			$('ul.bottom-menu li h3').css('background','transparent');
		}
		else {
			$('.top-menu').hide();
			$('.bottom-menu').hide();
			$('.bottom-sub-menu').hide();
			$('ul.top-menu li h3').css('background','url(images/arrow_left.png) right no-repeat');	
			$('ul.bottom-menu li h3').css('background','url(images/arrow_left.png) right no-repeat');		
		}


		

	
	});


	// toggle submenu items
	$('ul.menu-trigger li').click(function(){

		var menu = $(this).parent().attr('rel');  
		
		var sw = document.body.clientWidth;
		//console.log(sw);
		//console.log(menu);
		if ((sw > 950)&&(menu=='bottom')) {
			// disable sub-nav click on the footer for desktop view
		}
		
		else {	

			// remove active nav state if already active
			if ($(this).hasClass('selected')) {
				$(this).removeClass('selected');
				$(this).find('ul').fadeToggle('fast');
				if (sw < 950) {
					$(this).find('h3').css('background','url(images/arrow_left.png) right no-repeat');
				}
			}	

			// reset any active nav and activate selected nav	
			else {
				$('.' + menu + '-sub-menu').fadeOut('fast');
				$('ul.' + menu + '-menu li').removeClass('selected');
				$(this).find('ul').fadeToggle('slow');
				$(this).addClass('selected');
				if (sw < 950) {
					$('ul.' + menu + '-menu li h3').css('background','url(images/arrow_left.png) right no-repeat');
					$(this).find('h3').css('background','url(images/arrow_down.png) right no-repeat');
				}			
			}

		}
	});

	// toggle mobile navigation
	$('.mobile-menu-trigger').click(function() {

		var menu = $(this).attr('rel');

		$('.' + menu + '-sub-menu').fadeOut();
		$('.' + menu + '-menu li').removeClass('selected');
		$('#' + menu + '-nav ul.' + menu + '-menu').fadeToggle('fast');
		if (sw < 950) {
			$('ul.' + menu + '-menu li h3').css('background','url(images/arrow_left.png) right no-repeat');
			$(this).find('h3').css('background','url(images/arrow_down.png) right no-repeat');
		}		
	});


	// close drop down menu when clicked outside the menu area
	$('html').click(function() {
	  $('.top-sub-menu').hide();
	  $('.top-menu li').removeClass('selected');
	});

	$('.top-menu').click(function(event){
	    event.stopPropagation();
	});	

	$('#utah-logo').click(function() {
		window.location.href = 'http://www.utah.edu';
	});	
	
});

$(window).load(function() {
  $('.flexslider').flexslider({
    animation: "fade"
  });
});