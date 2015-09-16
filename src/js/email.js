$(document).ready( function () {

	// Show emailbar after scrolling down.
	$(document).on('scroll', function() {
		var showSignUp = false;
		if($(document).scrollTop() >= 100 && !showSignUp) {
			$('#emailbar').fadeIn('slow');
			showSignUp = true;
		} else if ($(document).scrollTop() <= 100) {
			$('#emailbar').fadeOut('fast');
			showSignUp = false;
		}
	});

	// Enable/disable form input.
	function enableForm(enable, $target) {
		var $button = $('.reserve-modal input[type=submit]');
		var $inputs = $('.reserve-modal form input, .reserve-modal form select');
		var disabledVal = enable ? null : 'disabled';
		if(!enable) {
			$button.data('buttonTxt', $button.val());
			$button.val('Submitting...');
		} else {
			$button.val($button.data('buttonTxt'));
		}
		$button.attr('disabled', disabledVal);
		$inputs.each(function() {
			$(this).attr('disabled', disabledVal);
		});
	}

	// Display form error.
	function handleError(message, target) {
		$(target).html(message);
		$(target).fadeIn();
	}

	// Send form to mailchimp api.
	function sendForm(formData, onSuccess) {
		$.ajax({
			type: 'post',
			dataType: 'json',
			contentType: 'application/json; charset=utf-8',
			url: '//one-education.us9.list-manage.com/subscribe/post-json?u=bc0719d67f05914460985b3ba&amp;id=fb4014f15f&c=?',
			data: formData,
			cache: false,
			success: onSuccess,
			error: function(error) {
				alert('An error has occured while trying to connect to our server. Please refresh the page and try again.');
			}
		});
	}

	// Submit reservation form to mailchimp api.
	var reservationForm = $('.reserve-modal form').on('submit', function(event) {
		var formData = reservationForm.serialize();
		event.preventDefault();
		enableForm(false, reservationForm);
		sendForm(formData, function(data) {
			if(data.result == 'error') {
				ga('send','event','earlybird','click', 'modal-reserve-fail');
				handleError(data.msg, '.reserve-modal .alert');
				enableForm(true, reservationForm);
			} else {
				ga('send','event','earlybird','click', 'modal-reserve');
				$('.reserve-modal').modal('hide');
				$('.reserve-confirmation').addClass('visible');
				$('.vote-modal').modal('show');
				enableForm(true, reservationForm);
			}
		});
	});

	// Submit newsletter form to mailchimp api.
	var newsletterForm = $('.newsletter-modal form').on('submit', function(event) {
		var formData = newsletterForm.serialize();
		event.preventDefault();
		enableForm(false, newsletterForm);
		sendForm(formData, function(data) {
			if(data.result == 'error') {
				ga('send','event','signups','click', 'modal-reserve-fail');
				handleError(data.msg, '.newsletter-modal .alert');
				enableForm(true, newsletterForm);
			} else {
				ga('send','event','signups','click', 'modal-newsletter');
				$('.newsletter-modal').modal('hide');
				$('.reserve-confirmation').addClass('visible');
				$('.twitter-modal').modal();
				enableForm(true, newsletterForm);
			}
		});
	});

	// Show mailchimp form on mobile devices.
	$('#emailbar h3').on('click', function() {
		if(window.innerWidth <= 992) {
			$('#email-modal').modal().toggle();
			ga('send','event','earlybird','click', 'top-reserve');
		}
	});

	$('#btn-reserve1, .btn-reserve2').on('click', function() {
		$('.reserve-modal').modal().toggle();
	});

	$('#btn-specs1').on('click', function() {
		$('html, body').animate({
        scrollTop: $("#specs").offset().top - 100
    }, 2000);
	});

	// Resize mail chimp for mobile devices.
	function resizeForm() {
		if(window.innerWidth <= 992) {
			$('#emailbar h3').css('display', 'block');
		} else {
			$('#emailbar button').data('open', false);
			$('#emailbar button').css('display', 'none');
			$('#emailbar button').css('display', 'inline-block');
			$('#emailbar h3').css('display', 'inline-block');
		}
	}

	// Resize form on resize event.
	$(window).on('resize', function() {
		resizeForm();
	});

	// Resize form on page load.
	resizeForm();

	// Track clicks
	$('#btn-reserve1').on('click', function () {
		ga('send','event','earlybird','click', 'top-reserve');
	});

	$('.btn-reserve2').on('click', function () {
		ga('send','event','earlybird','click', 'bottom-reserve');
	});

	$('.btn-newsletter1').on('click', function () {
		ga('send','event','signups','click', 'top-newsletter');
		$('.newsletter-modal').modal();
	});

	$('.btn-newsletter2').on('click', function () {
		ga('send','event','signups','click', 'bottom-newsletter');
		$('.newsletter-modal').modal();
	});

	$('.btn-vote-twitter').on('click', function () {
		ga('send','event','social','click', 'twitter-vote');
	});

	$('.btn-vote-facebook').on('click', function () {
		ga('send','event','social','click', 'facebook-vote');
		$('.vote-modal').modal('hide');
		$('.vote-facebook-modal').modal('show');
	});

	// Get URL Prams
	$.urlParam = function(name) {
		var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	  if (results === null) {
		  return null;
	  } else {
	  	return results[1] || 0;
	  }
	};

	// Handle url parameters.
	if($.urlParam('email')) {
		$('.reserve-modal .val-email').val($.urlParam('email'));
		$('.reserve-modal').modal('show');
	} else if ($.urlParam('vote') == 'facebook') {
		$('.vote-facebook-modal').modal();
	} else if ($.urlParam('vote') == 'twitter') {
		window.location.href="https://twitter.com/intent/tweet?&text=Retweet%20and%20%23vote%20with%20me%20for%20%40One_Education%20to%20win%20%2450k%20from%20%23UpgradeYourWorldAU%20so%20they%20can%20keep%20upgrading%20kid%27s%20lives%20around%20the%20world.";
	} else if ($.urlParam('newsletter')) {
		$('.newsletter-modal').modal();
	} else {
		$('.vote-modal').modal();
	}

});
