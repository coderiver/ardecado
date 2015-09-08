head.ready(function() {

	function tab() {
		$('.js-orders-group').each(function(){
			var tab_cont = $(this).find('.js-orders-cont'),
				tab_link = $(this).find('.js-orders-link');

			tab_link.first().addClass('is-active');
			tab_cont.hide();
			tab_cont.first().show();

			$('body').on('click', '.js-orders-link', function(){
				var link = $(this).attr('href');
				var activeTab = $(this).parents('.js-orders-group').find('.' + link);
				$(this).parents('.js-orders-group').find('.js-orders-link').removeClass('is-active');
				$(this).addClass('is-active');
				$(this).parents('.js-orders-group').find('.js-orders-cont').hide();
				activeTab.show();

				var customScroll = activeTab.find('.js-scroll-init');

				if (customScroll.length) {
					if (!customScroll.hasClass('is-loaded')) {
						customScroll.customScrollbar();
						customScroll.addClass('is-loaded');
					};
				};

				return false;
			});
		});
	}
	tab();

	// booking show more

	$('.js-booking-btn').on('click', function() {
		if ($(this).hasClass('is-open')) {
			$(this).parents('.js-booking').find('.js-booking-hidden').slideUp();
			$(this).text('Показать товары').removeClass('is-open');
		}
		else {
			$(this).parents('.js-booking').find('.js-booking-hidden').slideDown();
			$(this).text('Скрыть товары').addClass('is-open');
		}
	});












});