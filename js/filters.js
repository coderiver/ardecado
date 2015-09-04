head.ready(function() {

	// filters tabs

	$('.js-filters-link').hover(
		function () {
			var link = $(this).data('content');

			$('.'+link).addClass('erer');

		},
		function () {
			$(this).removeClass('asdsa');
		}
	);
	

});