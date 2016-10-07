// Rotating banner vars
var nTransTime; 		//Rotating banners transition time
var strTransType;		//Rotating banners type of transition
var bannersPath;		//Rotating banners path to banners file

// Window size vars - small, medium, large
var windowState = 'small';				// default to large
var smWidth = 480;						// small screen  breakpoint
var medWidth = 768;						// medium scree breakpoint
var lrgWidth = 1024;					// large scree breakpoint

// Menu state indicator text vars
var menuOpenText = "open";				// menu open indicator text
var menuCloseText = "close";			// menu close indicator text


$(document).ready(function() {
	inputWatermark(); 					//initialize input watermarks
	getWindowSize();					//check initial window size
	initBanners();						//initialize banners - get path	
	
	$('.toggle-link').collapsible();	// collapse spotlight area
	
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

/* =================================================================== 
	ROTATING BANNER CODE
====================================================================== */
//load banners after page has loaded
$(window).load(function () {
	loadBanners();
	/* -- TWITTER DELAY - allows twitter to load in spotlight area --*/
	twitterDelay();
});


//initialize banner - get path to external banners
function initBanners() {
	
	bannersPath = $('#banners-link a').attr('href');	// get path to banners file
	$('#banners-link').remove(); 						// since js is on, remove banners link	
}

//Load external banner data into banner pool
function loadBanners(){
	//if (windowState != 'small') {
			
	// if secondary page, create slide pool
	if ($('body.secondary').length !=0) {	
		$('#ss').prepend('<ul id="slide-pool"></ul>');
	}else {
		//Set homepage slide pool file path
		if (windowState == 'small') bannersPath = 'banners-home-sml.php';
		if (windowState == 'medium') bannersPath = 'banners-home-med.php';
		if (windowState == 'large') bannersPath = 'banners-home-lrg.php';
	}
	
	$('#slide-pool').load(bannersPath +' #remote-pool > li', function(response, status, xhr) {
		
		if (status == "success") {
			//remove default slide
			$('.home #ss .default-slide').remove();
			//keep default image on secondary page since it's used to size ss area
			$('.secondary #ss .default-slide').addClass('invisible');
			
			startBanners();
			
			/* show slide pool */
			$('#slide-pool').fadeIn( 'fast', function() {
				$('.ss-nav').fadeIn('slow');
 			 }); 
  		}
	});
	//}
}

/* ---- Slide Show Pause, Play Controls -------*/
function startBanners() {
	
	//write controls within text area if this is the homepage
	if ($('body.home').length !=0){
		$('#ss .slide-text .spacer').append('<div class="ss-nav"><div class="spacer"><div class="ss-controls"><a href="javascript:void(0)" title="pause"><span>pause</span></a></div><div class="ss-pages"></div></div></div>');
	} else {
		
		$('#slide-pool > li').append('<div class="ss-nav"><div class="spacer"><div class="ss-controls"><a href="javascript:void(0)" title="pause"><span>pause</span></a></div><div class="ss-pages"></div></div></div>');
		
	}
	
	// set plause & play controls		
	$('.ss-controls a').click(function() {
		$('#ss').cycle('toggle');
		if (this.title == 'pause'){
			$(this).attr('title', 'play');
			this.innerHTML = 'play';
		}else{
			$(this).attr('title', 'pause');
			this.innerHTML = 'pause';
		}
	});
	
	//If only one slide, hide controls
	if ($('#slide-pool > li').length < 2){
		$('.ss-controls, .ss-pages').addClass('hidden');
	}
	
	//set default values for transition variables
	if (!strTransType) strTransType = 'fade';
	if (!nTransTime) nTransTime = 6000;
	
	// Call the Cycle funtion to begin animation - set default values
	$('#ss').cycle({
		fx: strTransType, 		//transition type, ex: fade, scrollUp, shuffle, etc...
		pager: '.ss-pages', 	// pages indicator boxes in navigation controls
		fit: 1,
		timeout: nTransTime,  	// milliseconds between slide transitions (0 to disable auto advance)
		slideExpr: 'li'			// element to use as individual slide container
	});
	
	// Remove focus state from selected page button
	$('.ss-nav a').click(function() {
		$('.ss-pages a').blur();
	});
	
}
/* --------------  End Rotating Banners --------------*/


/* ================================================================
	MENU FUNCTIONS
===================================================================*/
// close menu before leaving, prevent expanding menu when return to page
$(window).unload(function() {
  $('#top-nav a').blur();
  $('#bottom-nav a').blur();
});
	
	
//check initial width of the screen and respond with appropriate menu
function getWindowSize() {
    var sw = document.body.clientWidth;
	if (sw <= smWidth) {
		medMenu(); 
		windowState='small'; // we only have two menu configurations (medium & large)
	} else if (sw > smWidth && sw <= medWidth ) {
		medMenu();
	} else {
		lrgMenu();
	}
}

//check for screen resizing
$(window).resize(function() {
	
	var sw = document.body.clientWidth;
	
   	if (sw <= smWidth && windowState == 'large') {
		medMenu();
		//home banners - make sure slide text gets default positioning
		$('.slide-text').removeAttr('style');
		windowState='small';
		loadHomeBanners();
	} 
	if (sw > smWidth && sw <= medWidth && windowState == 'large') {
		medMenu();
		loadHomeBanners();
	} 
	if (sw > medWidth && windowState != 'large') {
		lrgMenu(); // we only have two menu configurations (small & medium)
		loadHomeBanners();
			
	}
});


// homepage banners - only reload banners on homepage
function loadHomeBanners() {
	if ($('body.home').length !=0) loadBanners();
}


//handle menu for small screen
function medMenu(){
	// reset menu items
	$('menu-toggle a').off('click');
	$('#top-nav, #bottom-nav').find('*').removeClass('expand open focus');
	$('.menu-toggle').remove();
	
	//create the menu toggle items
	$('#top-nav .menu').before('<div class="menu-toggle"><a href="#">menu <span class="indicator">'+ menuOpenText +'</span></a></div>');
	$('#bottom-nav .menu').before('<div class="menu-toggle"><a href="#">Quick Links<span class="indicator">'+ menuOpenText +'</span></a></div>');
	
	//add anchor tags to all bottom navigation headings
	$('#bottom-nav .menu h3').each(function(index, element){
		var tn = $(element).text();
		$(element).html('<a href="#">'+tn+'</a>');
	});
	
	//append the + indicator
	$('.menu h3 a').append('<span class="indicator">'+ menuOpenText +'</span>');
	
	//  --- end reset
	
	//Top - change top nav menu states
	$('#top-nav .menu-toggle a').click(function() {
		//expand the menu
		$(this).toggleClass('open');
		$('#top-nav .menu').toggleClass('expand');
		//figure out whether the indicator should be changed to + or -
		var newValue = $(this).find('span.indicator').text() == menuOpenText ? menuCloseText : menuOpenText;
		//set the new value of the indicator
		$(this).find('span.indicator').text(newValue);
		return false;
	});
	
	//Top - submenu items
	$('#top-nav .menu h3').click(function(){
		
		//find the current submenu
		var currentItem = $(this).siblings('.submenu');
		//close other submenus by removing the expand class
		$('#top-nav ul.submenu').not(currentItem).removeClass('expand');
		//change the indicator of any closed submenus
		$('#top-nav .menu h3').not(this).removeClass('open').find('span.indicator:contains(menuCloseText)').text(menuOpenText);
		//open the selected submenu
		$(this).toggleClass('open').siblings('.submenu').toggleClass('expand');
		//change the selected submenu indicator
		var newValue = $(this).find('span.indicator').text() == menuOpenText ? menuCloseText : menuOpenText;
		$(this).find('span.indicator').text(newValue);
		return false;		
	});
	
	//Bottom - change menu states
	$('#bottom-nav .menu-toggle a').click(function() {
		//expand the menu
		$(this).toggleClass('open');
		$('#bottom-nav .menu').toggleClass('expand');
		//figure out whether the indicator should be changed to + or -
		var newValue = $(this).find('span.indicator').text() == menuOpenText ? menuCloseText : menuOpenText;
		//set the new value of the indicator
		$(this).find('span.indicator').text(newValue);
		return false;
	});
	
	//Bottom - nav submenu items
	$('#bottom-nav .menu h3').click(function(){
		//find the current submenu
		var currentItem = $(this).siblings('.submenu');
		//close other submenus by removing the expand class
		$('#bottom-nav ul.submenu').not(currentItem).removeClass('expand');
		//change the indicator of any closed submenus
		$('#bottom-nav .menu h3').not(this).removeClass('open').find('span.indicator:contains(menuCloseText)').text(menuOpenText);
		//open the selected submenu
		$(this).toggleClass('open').siblings('.submenu').toggleClass('expand');
		//change the selected submenu indicator
		var newValue = $(this).find('span.indicator').text() == menuOpenText ? menuCloseText : menuOpenText;
		$(this).find('span.indicator').text(newValue);
		return false;		
	});
	
	//set current window state
	windowState='medium';
}

//Top menu for medium & large screeens
function lrgMenu() {
	
	// Reset all menu items 
	$('menu-toggle a').off('click');
	$('.menu h3').off('click');
	$('.menu > li').off('click');
	
	//remove any expanded menus
	$('#top-nav, #bottom-nav').find('*').removeClass('expand open focus');
	//remove the span tags inside
	$('.menu h3').find('span.indicator').remove();
	//remove menu toggle
	$('.menu-toggle').remove();
	//remove anchor tags from bottom navigation headings
	$('#bottom-nav h3 a').contents().unwrap();
	
	// --- end reset ---

	
	//MENUS - hide and show items when they get tab focus
	$('.menu > li').focusin(function () {
		$(this).addClass('focus');
    });

	$('.menu > li').focusout(function () {
		$(this).removeClass('focus');
	});
	
	//Toggle menu item open & closed
	$('#top-nav .menu > li').click(function() {
		//close other submenus by removing the expand class
		$('#top-nav .menu > li').removeClass('focus').not(this).removeClass('expand');
		//toggle this menu item
		$(this).toggleClass('expand');
	});
	
	// iPad workaround to get body element to recogize click event
	var ua = navigator.userAgent,
	event = (ua.match(/iPad/i)) ? "touchstart" : "click";
	
	//close submenus if users click outside the menu
	$('html').bind(event,function(e) {
		$('#top-nav .menu > li').removeClass('expand');
	});
	
	//stop clicks on the menu from bubbling up
	$('#top-nav').bind(event,function(e){
		e.stopPropagation();
	});
 
	//set current window state
	windowState='large';
}

	
/* --------------End Menu Functions --------------*/


/*---- TWITTER WIDGET DELAY ------*/
/* since the twitter widget was failing to load in the hidden spotlight area,
we add a class to make it visible (but very small). then load twitter and remove class,
thus hiding the area after loading */
var timeoutID;
function twitterDelay() {
  timeoutID = window.setTimeout(loadDelay, 2000);
}

function loadDelay() {
	$('.collapsible-content-collapsed').removeClass('twitter-load');
	window.clearTimeout(timeoutID);
}
/*---- END TWITTER WIDGET DELAY ------*/


/*----- Some Javascript to fix the iOS orientation zoom bug -------*/
if (/(iPhone|iPod|iPad)/i.test(navigator.userAgent)) {
	/* Since iOS 6 and up don't have this bug, apply fix to iOS versions 5 or less */
	if (/OS [1-5](.*) like Mac OS X/i.test(navigator.userAgent)) {
	  var viewportmeta = document.querySelector('meta[name="viewport"]');
		if (viewportmeta) {
			viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0';
			document.body.addEventListener('gesturestart', function () {
				viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=10.0';
			}, false);
		}
	}
}
/* ---------------- end iOS orientation bug -----------------*/



/*======================================================================	
 * jQuery collapsible plugin
 * Author: Scott Jehl, scott@filamentgroup.com
 * Copyright (c) 2009 Filament Group 
 * licensed under MIT (filamentgroup.com/examples/mit-license.txt)
 * ====================================================================*/
 
/* set var to prevent collapse animation on initial page load--  rk-uofu*/
var initCollapse = true; 

$.fn.collapsible = function(){
	return $(this).each(function(){
	
		//define
		var collapsibleHeading = $(this);
		var collapsibleContent = collapsibleHeading.next();
		
		//modify markup & attributes
		collapsibleHeading.addClass('collapsible-heading')
			.prepend('<span class="collapsible-heading-status"></span>')
			.wrapInner('<a href="#" class="collapsible-heading-toggle"></a>');
			
		collapsibleContent.addClass('collapsible-content');
		
		//events
		collapsibleHeading	
			.bind('collapse', function(){
				$(this)
					.addClass('collapsible-heading-collapsed')
					.find('.collapsible-heading-status').text('Show ');
				
				// is this the initial page load? if so, prevent initial animation -- rk-uofu
				if (initCollapse){						
					collapsibleContent.hide(0,function(){
						/* twitter-load class added to make the area small but not hidden on initial load */
						$(this).addClass('collapsible-content-collapsed twitter-load').removeAttr('style').attr('aria-hidden',true);
						
					});
					initCollapse = false;
				} else {
					collapsibleContent.slideUp(function(){
						$(this).addClass('collapsible-content-collapsed').removeAttr('style').attr('aria-hidden',true);
						
						// on homepage move banner content when area sized -- rk-uofu
						if (!initCollapse){
        					bannerDown();
    					}
					});
				}
				
			})
			.bind('expand', function(){
				$(this)
					.removeClass('collapsible-heading-collapsed')
					.find('.collapsible-heading-status').text('Hide ');
										
				collapsibleContent
					.slideDown(function(){
						
						$(this).removeClass('collapsible-content-collapsed').removeAttr('style').attr('aria-hidden',false);
						
						// on homepage, move banner content when area sized -- rk-uofu
						if (!initCollapse){
							bannerUp();
						}
						
					});	
			})
			.click(function(){ 
					
				if( $(this).is('.collapsible-heading-collapsed') ){
					$(this).trigger('expand'); 
				}	
				else {
					$(this).trigger('collapse'); 
				}
								
				return false;	
			})
				
			.trigger('collapse');
	});	
};	

/* --- Move slide text area when showing spotlight (not on medium & small screens) ---*/
function bannerUp() {
	if (windowState == 'large') {
		var yPos = $(".home #footer-container").height() + $(".home #main-container .spotlight").height();
		$(".home #main-container .slide-text").animate({"bottom": yPos}, "fast");
	}
}
function bannerDown() {
	if (windowState == 'large') {
		var yPos = $(".home #footer-container").height();
		$(".home #main-container .slide-text").animate({"bottom": yPos}, "fast");
	}
}

/* -------------------------------------------------------------------------------
	jQuery collapsible plugin  
----------------------------------------------------------------------------------*/

	
	




















