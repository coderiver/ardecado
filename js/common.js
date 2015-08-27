head.ready(function() {

	// $(document).on("click", function(){
	// 	$(".js-popup").hide();
	// });

	// function scrollFixedElements() {
	//     var scroll_left = $(this).scrollLeft();
	//     $(".fixed-element").css({
	//         left: -scroll_left
	//     });
	// }
	// scrollFixedElements();
	// $(window).scroll(function(){
	//     scrollFixedElements()
	// });

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
	// $(window).load(function(){
	//     $(".js-scroll").mCustomScrollbar({
	//         axis:"y"
	//     });
	// });
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
	// $('.js-range').slider({
	// 	range: true,
	// 	min: 9,
	// 	max: 19,
	// 	values: [ 9, 19 ],
	// 	slide: function(event, ui) {
	// 		for (var i = 0; i < ui.values.length; ++i) {
	// 			$(".js-range-value[data-index=" + i + "]").text(ui.values[i] + ':00');
	// 		}
	// 	}
	// });

	// $('.js-range').draggable();
	if ($('.js-range').length) {
		var slider = document.getElementById('js-range');

		noUiSlider.create(slider, {
			start: [9, 19],
			step: 1,
			// margin: 1,
			connect: true,
			range: {
				'min': 9,
				'max': 19
			}
		});

		var valueInput = document.getElementById('value-input'),
			valueSpan = document.getElementById('value-span');

		// When the slider value changes, update the input and span
		slider.noUiSlider.on('update', function( values, handle ) {
			if ( handle ) {
				valueInput.innerHTML = values[handle];
			} else {
				valueSpan.innerHTML = values[handle];
			}
		});
	};	

	// When the input changes, set the slider value
	// valueInput.addEventListener('change', function(){
	// 	slider.noUiSlider.set([null, this.value]);
	// });

	//slider-banner



	// $('.js-slider-for').slick({
	// 	slidesToShow: 1,
	// 	slidesToScroll: 1,
	// 	arrows: false,
	// 	fade: true,
	// 	asNavFor: '.js-slider-nav'
	// });
	// $('.js-slider-nav').slick({
	// 	slidesToShow: 5,
	// 	slidesToScroll: 1,
	// 	asNavFor: '.js-slider-for',
	// 	dots: false,
	// 	centerMode: false,
	// 	arrows: false,
	// 	focusOnSelect: true
	// });

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
		})

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

});