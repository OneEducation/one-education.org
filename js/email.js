$(document).ready( function () {

	// Show bar after scrolling down.
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

	function enableForm(enable) {
		var disabled = enable ? null : 'disabled';
		var button = enable ? 'Reserve' : 'Sending...';
		$('#email-modal-submit').val(button);
		$('#email-modal-form input, #email-modal-form select').each(function() {
			$(this).attr('disabled', disabled);
		});
	}

	function showAlert(message) {
		$('#email-modal-alert').html(message);
		$('#email-modal-alert').fadeIn();
	}

	function handleError(message) {
		var message = message.substr(4);
		if(message == "Please enter a value") {
			message = "Please fill in all fields."
		}
		showAlert(message);
	}


	// Submit form to mailchimp.
	var form = $('#email-modal-form').on('submit', function(event) {
		event.preventDefault();
		console.log(form.serialize());
		$.ajax({
			type: 'post',
			url: '//one-education.us9.list-manage.com/subscribe/post-json?u=bc0719d67f05914460985b3ba&amp;id=fb4014f15f&c=?',
			data: form.serialize(),
			cache: false,
			dataType: 'json',
			contentType: 'application/json; charset=utf-8',
			error: function(error) {
				alert('An error has occured while trying to connect to our server. Please refresh the page and try again.');
			},
			success: function(data) {
				console.log(data);
				if(data.result == 'error') {
					ga('send','event','earlybird','click', 'modal-reserve-fail');
					handleError(data.msg);
					enableForm(true);
				} else if(data.result == 'success') {
					ga('send','event','earlybird','click', 'modal-reserve');
					$('#emailbar .container').fadeOut('slow', function() {
						$('#email-modal-content').fadeOut(function() {
							$('#email-modal-content-success').fadeIn();
							$('.email-form-success').fadeIn('slow');
						});
						enableForm(true);
					});
				}
			}
		});
		enableForm(false);
	});

	// Show mailchimp form on mobile devices.
	$('#emailbar h3').on('click', function() {
		if(window.innerWidth <= 992) {
			$('#email-modal').modal().toggle();
			ga('send','event','earlybird','click', 'top-reserve');
		}
	});

	$('#btn-reserve1, .btn-reserve2').on('click', function() {
		$('#email-modal').modal().toggle();
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

});
