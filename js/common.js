head.ready(function() {

	// $(document).on("click", function(){
	// 	$(".js-popup").hide();
	// });

	function scrollFixedElements() {
	    var scroll_left = $(this).scrollLeft();
	    $(".js-fixed-func").css({
	        left: -scroll_left
	    });
	}
	scrollFixedElements();
	$(window).scroll(function(){
	    scrollFixedElements()
	});

	//menu link and submenu

	// $('.js-m-link').mouseenter(function() {
	// 	$(this).children('.js-m-drop').slideDown('fast');
	// });
	// $('.js-m-link').mouseleave(function() {
	// 	$(this).children('.js-m-drop').fadeOut('fast');
	// });

	//basket link and basket drop

	// $('.js-basket-link').mouseenter(function() {
	// 	$(this).parents('.js-basket').children('.js-basket-drop').slideDown('fast');

	// 	if ($('.js-basket-wrap').outerHeight() > $('.js-basket-items').outerHeight()) {
	// 		$('.js-basket-drop').addClass('is-not-scroll');
	// 	};

	// 	$(".js-scroll").customScrollbar();	
	// });
	// $('.js-basket').mouseleave(function() {
	// 	$(this).children('.js-basket-drop').fadeOut('fast');
	// });


	//nav link and subnav

	$('.js-nav-link').on('click', function() {
		$('.js-nav-drop').slideToggle('fast');
		return false;
	});
	$('.js-nav-drop').each(function() {
		$('body').on('click', function() {
			$('.js-nav-drop').slideUp('fast');
		});
		$(this).on('click', function(event) {
			event.stopPropagation();
		});
	});

	//number
	function number() { 
		var number = $(".js-number");
		number.each(function(){
			var max_number = +($(this).attr("data-max-number"));
			var input = $(this).find(".js-input");
			var plus = $(this).find(".js-plus-number");
			var minus = $(this).find(".js-minus-number");
			var amount = $(this).find(".js-amount");
			plus.on("click", function(){
				var val = +(input.val());
				if (val >= max_number) {
					return false
				}
				else {
					val += 1;
					input.val(val);
					amount.text(val);
				}
			});
			minus.on("click", function(){
				var val = +(input.val());
				if (val > 1) {
					val -= 1;
					input.val(val);
					amount.text(val);
				}
				return false;
			});
			input.on("change", function(){
				var val = +$(this).val();
				if (val > max_number) {
					val = max_number;
					$(this).val(val);
				}
				if (val == '') {
					val = 1;
					$(this).val(val);
				}
			});
			$(window).load(function() {
				amount.text(input.val());
			});
		});
	}
	number();

	//scroll

	$(window).load(function () {
		$(".js-scroll").customScrollbar();
	});

	//add field

	$('.js-field-link').on('click', function() {
		var field_link = $(this).data('link');
		var field_parent = $(this).parent('.js-field-parent');
		$('.js-field[data-field=' + field_link + ']').appendTo(field_parent).removeClass('is-hide');
		$(this).remove();
		return false;
	});

	//range
	if ($('.js-range').length) {

		var slider = $('.js-range');

		for ( var i = 0; i < slider.length; i++ ) {

			noUiSlider.create(slider[i], {
				start: [9, 19],
				step: 1,
				// margin: 1,
				connect: true,
				range: {
					'min': 9,
					'max': 19
				}
			});

			slider[i].noUiSlider.on('update', function( values, handle ) {
				if ( handle ) {
					$('.value-input').text(Math.round(values[handle]) + ":00");
				} 
				else {
					$('.value-span').text(Math.round(values[handle]) + ":00");
				}
			});
		};

	};

	//slider-banner

	$(window).load(function() {
		if ($('.js-sliders').length) {
			$('.js-sliders').each(function() {
				$('.js-slide-small').first().addClass('is-active');
				$('.js-slide-big').first().addClass('is-active');
				$('.js-slide-small').on('click', function() {
					var this_index = $(this).index();
					$(this).parents('.js-sliders').find('.js-slide-small').removeClass('is-active');
					$(this).parents('.js-sliders').find('.js-slide-big').removeClass('is-active');
					$(this).parents('.js-sliders').find('.js-slide-big').eq(this_index).addClass('is-active');
					$(this).addClass('is-active');
				});
			});
		};
		if ($('.js-m-sliders').length) {
			$('.js-m-sliders').each(function() {
				$('.js-m-small').first().addClass('is-active');
				$('.js-m-big').first().addClass('is-active');
				$('.js-m-small').on('click', function() {
					var this_index = $(this).index();
					$(this).parents('.js-m-sliders').find('.js-m-small').removeClass('is-active');
					$(this).parents('.js-m-sliders').find('.js-m-big').removeClass('is-active');
					$(this).parents('.js-m-sliders').find('.js-m-big').eq(this_index).addClass('is-active');
					$(this).addClass('is-active');
					return false;
				});
			});
			$('.js-m-slider').slick({
				fade: true,
				arrows: true,
				dots: true
			});
			$('.js-m-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
				$('.js-m-links')
					.removeClass('is-active')
					.filter('[data-index="' + nextSlide + '"]')
					.addClass('is-active');
			});
			$('.js-m-links').on('click', function(){
				var index = $(this).data('index');
				$('.js-m-slider').slick('goTo', index);
				return false;
			});
		};		
	});
	
	if ($('.js-remind').length) {
		$('.js-remind-link').click(function() {
			var this_top = $(this).offset().top,
				this_left = $(this).offset().left,
				this_width = $(this).outerWidth(),
				drop_height = $(this).parents('.js-remind').find('.js-remind-drop').outerHeight(),
				drop_width = $(this).parents('.js-remind').find('.js-remind-drop').outerWidth();
			$(this).parents('.js-remind').find('.js-remind-drop').toggleClass('is-active');
			$(this).parents('.js-remind').find('.js-remind-drop').offset({
				top: this_top - drop_height - 9,
				left: this_left + this_width/2 - drop_width/2
			});
			return false;
		});
		$('.js-remind-drop li').click(function() {
			$(this).parents('.js-remind').find('.js-remind-link').text($(this).text());
			$('.js-remind-drop').removeClass('is-active');
			return false;
		});
	};

	

	$('.js-carousel-parent').each(function() {
		var slider = $(this).find('.js-carousel'),
			index = 6,
			counter = $(this).find('.js-carousel-current'),
			totalBox = $(this).find('.js-carousel-total'),
			prev = $(this).find('.js-carousel-prev'),
			next = $(this).find('.js-carousel-next');

		slider.on('init', function(event, slick) {
			$(this).addClass('is-loaded');
		});

		slider.slick({
			dots: false,
			arrows: false,
			slidesToShow: 6,
			slidesToScroll: 6
		});	

		var slide = slider.find('.slick-slide').length,
			cloneSlide = slider.find('.slick-cloned').length;

		total = slide -	cloneSlide;

		totalBox.text(total);
		counter.text(index);
			
		// slide change event	
		slider.on('afterChange', function(event, slick, currentSlide) {
			index = currentSlide;

			index = index + 6;
			
			counter.text(index);
		});

		// navigation
		prev.on('click', function() {
			slider.slick('slickPrev');
		});

		next.on('click', function() {
			slider.slick('slickNext');
		});

	});

	$('.js-big-parent').each(function() {
		var slider = $(this).find('.js-big'),
			index = 3,
			counter = $(this).find('.js-big-current'),
			totalBox = $(this).find('.js-big-total'),
			prev = $(this).find('.js-big-prev'),
			next = $(this).find('.js-big-next');

		slider.on('init', function(event, slick) {
			$(this).addClass('is-loaded');
		});

		slider.slick({
			dots: false,
			arrows: false,
			slidesToShow: 3,
			slidesToScroll: 3
		});	

		var slide = slider.find('.slick-slide').length,
			cloneSlide = slider.find('.slick-cloned').length;

		total = slide -	cloneSlide;

		totalBox.text(total);
		counter.text(index);
			
		// slide change event	
		slider.on('afterChange', function(event, slick, currentSlide) {
			index = currentSlide;

			index = index + 3;
			
			counter.text(index);
		});

		// navigation
		prev.on('click', function() {
			slider.slick('slickPrev');
		});

		next.on('click', function() {
			slider.slick('slickNext');
		});

	});

	// select
	// $('.select').selectFix({
	// 	'container-max-height': 200,
	// 	'arrow': true
	// });

	$('.js-slider').slick({
		fade: true,
		dots: false
	});

	$('.js-calendar-parent').each(function() {
		var slider = $(this).find('.js-calendar-slider'),
			prev = $(this).find('.js-calendar-prev'),
			next = $(this).find('.js-calendar-next');

		$('.js-calendar-slider').slick({
			dots: false,
			slidesToShow: 5,
			slidesToScroll: 5,
			arrows: false
		});

		prev.on('click', function() {
			slider.slick('slickPrev');
		});

		next.on('click', function() {
			slider.slick('slickNext');
		});
	});

	$('.js-items-carousel').slick({
		dots: true,
		arrows: false,
		slidesToShow: 6,
		slidesToScroll: 6
	});

	$('.js-review-parent').each(function() {
		var slider = $(this).find('.js-review-slider'),
			prev = $(this).find('.js-review-prev'),
			next = $(this).find('.js-review-next');

		$('.js-review-slider').slick({
			dots: false,
			slidesToShow: 4,
			slidesToScroll: 4,
			arrows: false
		});

		prev.on('click', function() {
			slider.slick('slickPrev');
		});

		next.on('click', function() {
			slider.slick('slickNext');
		});
	});

	$('.js-panel-slider').slick({
		dots: false,
		arrows: true,
		slidesToShow: 5,
		slidesToScroll: 1
	});


	// tabs

	function tab() {
		$('.js-tab-group').each(function(){
			var tab_cont = $(this).find('.js-tab-cont'),
				tab_link = $(this).find('.js-tab-link');

			tab_link.first().addClass('is-active');	
			tab_cont.hide();
			tab_cont.first().show();

			$('body').on('click', '.btn-tab', function(){
	       		link = $(this).attr('href');
	       		$(this).parents('.js-tab-group').find('.btn-tab').removeClass('is-active');
	       		$(this).addClass('is-active');
	       		$(this).parents('.js-tab-group').find('.js-tab-cont').hide();
	       		$(this).parents('.js-tab-group').find('.' + link).fadeIn(300);
	       		return false;
	       	});
		});
  	}
  	tab();

	//spinner

	$(window).load(function() {
		$('.js-spinner').each(function() {
			if ($(this).val() >= 0) {
				$(this).removeClass('is-red');
				$(this).addClass('is-green');
			}
			else {
				$(this).removeClass('is-green');
				$(this).addClass('is-red');
			};
		});
	});

	$('.js-spinner').spinner({

		stop: function( event, ui ) {
			if ($(this).val() >= 0) {
				$(this).removeClass('is-red');
				$(this).addClass('is-green');
			}
			else {
				$(this).removeClass('is-green');
				$(this).addClass('is-red');
			};
		}

	});

	$('.js-steps-close').click(function() {
		$(this).parent('.js-steps').slideUp('fast');
	});


	//fixed elements

	$(window).scroll(function() {
		body = $('body').offset().top;
		scrollTop = $(window).scrollTop();
		if (scrollTop > body + 100) {
			$('.js-fixed').addClass('is-active');
		}
		else {
			$('.js-fixed').removeClass('is-active');
			$('.js-calendar-block').removeClass('is-active');
			$('.js-panel').removeClass('is-calendar');
			$('.js-calendar-btn').removeClass('is-active');
		};
	});
	$(window).load(function() {
		body = $('body').offset().top;
		scrollTop = $(window).scrollTop();
		if (scrollTop > body + 100) {
			$('.js-fixed').addClass('is-active');
		}
		else {
			$('.js-fixed').removeClass('is-active');
			$('.js-calendar-block').removeClass('is-active');
		};
	});
	//menu fixed
	$(window).scroll(function() {
		menu = $('.js-menu').offset().top;
		scrollTop = $(window).scrollTop();
		if (scrollTop > menu + 15) {
			$('.js-menu-in').addClass('is-active');
		}
		else {
			$('.js-menu-in').removeClass('is-active');
		};
	});
	$(window).load(function() {
		menu = $('.js-menu').offset().top;
		scrollTop = $(window).scrollTop();
		if (scrollTop > menu + 15) {
			$('.js-menu-in').addClass('is-active');
		}
		else {
			$('.js-menu-in').removeClass('is-active');
		};
	});

	$('.js-calendar-btn').click(function() {
		$(this).parent('.js-panel').toggleClass('is-calendar');
		$(this).toggleClass('is-active');
		$('.js-calendar-block').toggleClass('is-active');
		return false;
	});

});