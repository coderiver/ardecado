head.ready(function() {

	// timeline carousel

	$('.js-timeline').slick({
		infinite: false,
		slidesToShow: 7,
		slidesToScroll: 1
	});

	$('.timeline__item').on('click', function() {
		$('.timeline__item').removeClass('is-active');
		$(this).addClass('is-active');
	});

	// daytime form

	function radioTime() {

		$('.js-radiotime-radio').on('click', function() {
			var item = $(this).parents('.js-radiotime'),
				input = item.find('.js-radiotime-input');

			// remove prev selected item
			$('.js-radiotime').removeClass('is-selected');	
			$('.js-radiotime-input').attr('disabled', 'disabled');

			item.addClass('is-selected');
			input.removeAttr('disabled');

		});
	}
	if ($('.js-radiotime').length) {
		radioTime();
	};

});