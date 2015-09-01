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

});