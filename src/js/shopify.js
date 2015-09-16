function openShopify(quantity) {
	window.location.href = 'http://one-education.myshopify.com/cart/4991191427:' + quantity;
}

$(document).ready(function() {
	
	// Show mailchimp form on mobile devices.
	$('.reserve-title').on('click', function() {
		if(window.innerWidth <= 992) {
			$(this).fadeOut();
			$(this).slideUp(function() {
				$('#cart-form-input').data('open', true);
				$('#cart-form-input').slideDown();
			});
		}
	});

	// Resize mail chimp for mobile devices.
	function resizeForm() {
		if(window.innerWidth <= 992) {
			if($('#cart-form-input').data('open')) {
				$('#cart-form-input').css('display', 'inline-flex');
			} else {
				$('#cart-form-input').css('display', 'none');	
				$('.reserve-title').css('display', 'block');
			}
		} else {
			$('#cart-form-input').data('open', false);
			$('#cart-form-input').css('display', 'none');	
			$('#cart-form-input').css('display', 'inline-flex');
			$('.reserve-title').css('display', 'block');
		}
	}
	
	// Resize form on resize event.
	$(window).on('resize', function() {
		resizeForm();
	});
	
	// Resize form on page load.
	resizeForm();
	
});