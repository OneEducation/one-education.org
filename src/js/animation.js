$(document).ready(function() {

	var paragraphs = 'p, .paragraph',
		titles = 'h1, h2, .avatar',
		images = '.icon',
		buttons = 'a.btn',
		avatars = '.person';

	var offset = 0.1 * $(window).height();

	var endAnimation = 'webkitAnimationStart mozAnimationStart MSAnimationStart oanimationstart animationstart';

	// Animate titles first.
	$(titles).each(function() {
		if($(this).parent().hasClass('stats') === false &&
		   $(this).parent().parent().parent().parent().hasClass('stats') === false) {
			$(this).addClass('invisible').viewportChecker({
				classToAdd: 'visible animated fadeInUp',
				offset: offset
			});
		}
	});

	// Hide the paragraphs.
	$(paragraphs).addClass('invisible');

	// Once titles are finished animating...
	$(titles).each(function() {
		$(this).one(endAnimation, function() {
			$(this).siblings().filter(paragraphs).each(function() {
				var sibling = this;
				// Animate body paragraphs,
				setTimeout(function(){
					$(sibling).viewportChecker({
						classToAdd: 'visible animated fadeIn',
						offset: offset
					});
				}, 200);
			});
		});
	});

	// Animate icons.
	$(images).addClass('invisible').viewportChecker({
		classToAdd: 'visible animated fadeInLeft',
		offset: offset
	});

	// Animate buttons.
	$(buttons).addClass('invisible').viewportChecker({
		classToAdd: 'visible animated bounceIn',
		offset: offset
	});

/*
	var controller = new ScrollMagic.Controller();
	var scenes = [];

	function isMobile() {
		return $(window).width() <= 992;
	}

	function createScrollAnimations() {
		var debug = true;

		var parallax = ['#be-happy-parallax', '#battery-framed', '#icon-bar', '#adapter-framed' , '#a-mission'];

		for(var i in parallax) {
			var div = parallax[i];
			var duration = $(div).height() * 1.5;
			var offset = ($(div).height() * .25) * -1;
			var tween = TweenMax.to(div, 1, {css: {backgroundPosition: '0 100%'}, ease: Linear.easeNone});
			var scene = new ScrollMagic.Scene({triggerElement: div, duration: duration, offset: offset})
			.setTween(tween)
			.addTo(controller);

			if(debug) {
				scene.addIndicators({name: div.substr(1)});
			}

			scenes[scenes.length] = scene;
		}

		var frontExplodedDuration = $('#front-exploded').height() * 1.6;
		var frontExplodedOffset = ($('#front-exploded').height() * .25) * -1;
		var frontExplodedTween = TweenMax.to('#front-exploded', 1, {css: {marginTop: '-80px'}, ease: Linear.easeNone});
		var frontExplodedScene = new ScrollMagic.Scene({triggerElement: '#front-exploded', duration: frontExplodedDuration, offset: frontExplodedOffset})
		.setTween(frontExplodedTween)
		.addTo(controller);

		var backExplodedDuration = $('#back-exploded').height() * 1.6;
		var backExplodedOffset = ($('#back-exploded').height() * .25) * -1;
		var backExplodedTween = TweenMax.to('#back-exploded', 1, {css: {marginBottom: '-80px'}, ease: Linear.easeNone});
		var backExplodedScene = new ScrollMagic.Scene({triggerElement: '#back-exploded', duration: backExplodedDuration, offset: backExplodedOffset})
		.setTween(frontExplodedTween)
		.addTo(controller);

		var sidePortsDuration = $('#side-ports').height() * 1.6;
		var sidePortsOffset = ($('#side-ports').height() * .25) * -1;
		var sidePortsTween = TweenMax.to('#side-ports', 1, {css: {marginLeft: '80px'}, ease: Linear.easeNone});
		var sidePortsScene = new ScrollMagic.Scene({triggerElement: '#side-ports', duration: sidePortsDuration, offset: sidePortsOffset})
		.setTween(sidePortsTween)
		.addTo(controller);

		if(debug) {
			frontExplodedScene.addIndicators({name: 'front-exploded'})
			backExplodedScene.addIndicators({name: 'back-exploded'})
			sidePortsScene.addIndicators({name: 'side-ports'})
		}

		scenes[scenes.length] = frontExplodedScene;
		scenes[scenes.length] = backExplodedScene;
		scenes[scenes.length] = sidePortsScene;

	}

	function destroyScrollAnimations() {
		for(scene in scenes) {
			controller.removeScene(scenes[scene]);
		}
	}

	$(window).on('load', function() {
		if(!isMobile()) {
			createScrollAnimations();
		}
	});

	$(window).on('resize', function() {
		if(!isMobile()) {
			destroyScrollAnimations();
			createScrollAnimations();
		} else {
			destroyScrollAnimations();
		}
	});

	*/
});
