head.ready(function() {

	$('.js-togglehint').click(function(event) {
		hint = $(this).data('hint');
		$('#'+hint).toggle();
		return false;
	});

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

		if ($(this).hasClass('js-carousel-big')) {
			index = 3;
		};
		slider.on('init', function(event, slick) {
			$(this).addClass('is-loaded');
		});

		slider.slick({
			dots: false,
			arrows: false,
			slidesToShow: index,
			slidesToScroll: index
		});

		var slide = slider.find('.slick-slide').length,
			cloneSlide = slider.find('.slick-cloned').length;

		total = slide -	cloneSlide;

		totalBox.text(total);
		counter.text(index);

		// slide change event
		slider.on('afterChange', function(event, slick, currentSlide) {
			indexChange = currentSlide;

			indexChange = indexChange + index;

			totalChange = slide - cloneSlide;

			if (indexChange > totalChange) {
				counter.text(totalChange);
			}
			else {
				counter.text(indexChange);
			};
		});

		// navigation
		prev.on('click', function() {
			slider.slick('slickPrev');
		});

		next.on('click', function() {
			slider.slick('slickNext');
		});

	});

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

	$('.js-view-slider').slick({
		dots: false,
		arrows: true,
		slidesToShow: 8,
		slidesToScroll: 1
	});

	// map

	if ($('.map').length) {
		ymaps.ready(function () {
		  var myMap = new ymaps.Map('YMapsID', {
			  center: [59.939095,30.315868],
			  zoom: 10,
			  controls: []
		  });
		  myMap.behaviors.disable('scrollZoom');
		 // Создаем метку с помощью вспомогательного класса.
			myPlacemark = new ymaps.Placemark([59.939095,30.315868], {}, {
				preset: 'twirl#redDotIcon'

			});

		 myMap.geoObjects.add(myPlacemark)

		});
	};

	// tabs

	function tab() {
		$('.js-tab-group').each(function(){
			var tab_cont = $(this).find('.js-tab-cont'),
				tab_link = $(this).find('.js-tab-link');

			tab_link.first().addClass('is-active');
			tab_cont.hide();
			tab_cont.first().show();

			$('body').on('click', '.js-tab-link', function(){
				var link = $(this).attr('href');
				var activeTab = $(this).parents('.js-tab-group').find('.' + link);
				$(this).parents('.js-tab-group').find('.js-tab-link').removeClass('is-active');
				$(this).addClass('is-active');
				$(this).parents('.js-tab-group').find('.js-tab-cont').hide();
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
			$('.js-calendar-btn').removeClass('is-active');
			$('.js-panel').removeClass('is-view is-calendar');
			$('.js-panel-box').removeClass('is-active');
			$('.js-panel-btn').removeClass('is-active');
			$('.js-panel-open').removeClass('is-close');
			$('.js-panel-block').removeClass('is-active');
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
		if ($('.js-menu').length) {
			menu = $('.js-menu').offset().top;
			scrollTop = $(window).scrollTop();
			if (scrollTop > menu + 15) {
				$('.js-menu-in').addClass('is-active');
			}
			else {
				$('.js-menu-in').removeClass('is-active');
			};
		};

	});
	$(window).load(function() {
		if ($('.js-menu').length) {
			menu = $('.js-menu').offset().top;
			scrollTop = $(window).scrollTop();
			if (scrollTop > menu + 15) {
				$('.js-menu-in').addClass('is-active');
			}
			else {
				$('.js-menu-in').removeClass('is-active');
			};
		};
	});

	$(".js-panel-btn").click(function () {

		var id = $(this).data("btn"),
			$item = $('.js-panel-box'),
			$currItem = $('.js-panel-box[data-block=' + id + ']');
		if ($(this).hasClass('is-active')) {
			$('.js-panel-box').removeClass('is-active');
			$('.js-panel-btn').removeClass('is-active');
			if ($(this).hasClass('js-panel-calendar')) {
				$('.js-panel').removeClass('is-calendar');
			};
			if ($(this).hasClass('js-panel-view')) {
				$('.js-panel').removeClass('is-view');
			};
		}
		else {
			$('.js-panel-btn').removeClass('is-active');
			$(this).addClass('is-active');
			$('.js-panel-box[data-block=' + id + ']').addClass('is-active');
			$item.not($currItem).removeClass('is-active');
			if ($(this).hasClass('js-panel-calendar')) {
				$('.js-panel').removeClass('is-view');
				$('.js-panel').addClass('is-calendar');
			};
			if ($(this).hasClass('js-panel-view')) {
				$('.js-panel').removeClass('is-calendar');
				$('.js-panel').addClass('is-view');
			};
		};
		return false;

	});
	$('.js-panel-open').on('click', function() {
		$(this).addClass('is-close');
		$(this).parents('.js-panel').find('.js-panel-block').addClass('is-active');
		return false;
	});
	$('.js-panel-close').on('click', function() {
		$('.js-panel').removeClass('is-view is-calendar');
		$('.js-panel-box').removeClass('is-active');
		$('.js-panel-btn').removeClass('is-active');
		$(this).parents('.js-panel').find('.js-panel-open').removeClass('is-close');
		$(this).parents('.js-panel').find('.js-panel-block').removeClass('is-active');
		return false;
	});

	$('.js-btn-up').on('click', function() {
		var body = $("html, body");
		body.stop().animate({scrollTop:0}, '2000', 'swing');
		$('.js-fixed').removeClass('is-active');
		$('.js-calendar-block').removeClass('is-active');
		$('.js-calendar-btn').removeClass('is-active');
		$('.js-panel').removeClass('is-view is-calendar');
		$('.js-panel-box').removeClass('is-active');
		$('.js-panel-btn').removeClass('is-active');
		$('.js-panel-open').removeClass('is-close');
		$('.js-panel-block').removeClass('is-active');
		return false;
	});

	//profile

	$('.js-profile-link').on('click', function() {
		if ($(this).hasClass('is-active')) {
			$('.js-profile-link').removeClass('is-active');
			$('.js-profile-drop').slideUp('fast');
		}
		else {
			$('.js-profile-link').removeClass('is-active');
			$('.js-profile-drop').slideUp('fast');
			$(this).addClass('is-active');
			$(this).parents('.js-profile').find('.js-profile-drop').slideDown('fast');
		}
		return false;
	});
	$('.js-profile-drop').each(function() {
		$('body').on('click', function() {
			$('.js-profile-drop').slideUp('fast');
		});
		$(this).on('click', function(event) {
			event.stopPropagation();
		});
	});

	$('.js-tooltip').tooltipster({
		contentAsHTML: true,
		hideOnClick: true
	});

	$('.js-search-input').keyup(function() {
		$('.js-search-block').addClass('is-active');
		$('body').addClass('is-search');
		$(this).val('');
	});
	$('.js-search-block').each(function() {
		$(this).click(function() {
			$(this).removeClass('is-active');
			$('body').removeClass('is-search');
		});
		$('.js-search-close').click(function() {
			$('.js-search-block').removeClass('is-active');
			$('body').removeClass('is-search');
		});
		$('.js-search-block .container').click(function(event) {
			event.stopPropagation();
		});
	});

	// fancy
	$('.fancybox').fancybox({
		helpers: {
			overlay: {
				locked: false
			}
		}
	});

	$('.js-month-carousel').slick({
		dots: false,
		infinite: true,
		centerMode: true,
		slidesToScroll: 1,
		focusOnSelect: true,
		slidesToShow: 5,
		initialSlide: 4,
		accessibility: true,
		speed: 300,
		swipe: false,
		centerPadding: '100px'
	});

	$('.js-accordion-link').click(function() {
		if ($(this).hasClass('is-active')) {
			$('.js-accordion-link').removeClass('is-active');
			$('.js-accordion-block').slideUp('fast');
		}
		else {
			$('.js-accordion-link').removeClass('is-active');
			$(this).addClass('is-active');
			$('.js-accordion-block').slideUp('fast');
			$(this).parents('.js-accordion').find('.js-accordion-block').slideDown('fast');
		};
		return false;
	});

	$('.js-comment-open').click(function() {
		$(this).parents('.js-comment').find('.js-comment-block').slideToggle(400);
		return false;
	});

	var mySwiper = new Swiper ('.swiper-container', {
		loop: true,
		nextButton: '.swiper-button-next',
		prevButton: '.swiper-button-prev',
		centeredSlides: true,
		initialSlide: 4,
		slidesPerView: 'auto',
		slideToClickedSlide: true
	});

	$('.modal').on('shown.bs.modal', function(e) {
		if ($('.js-popup-slider').length) {
			$(this).find('.js-popup-slider').slick({
				slidesToShow: 1,
				slidesToScroll: 1
			});
		};
		if ($('.js-scroll').length) {
			$('.js-scroll').customScrollbar();
		}
	});

	$('.js-zoom').elevateZoom({
		zoomWindowWidth:480, 
		zoomWindowHeight:480,
		zoomWindowPosition: 1,
		zoomWindowOffetx: 20
	});

	// ui scripts

	// select

	$('.select').each(function() {
		var select = $(this),
			placeholder = select.attr('placeholder');

		select.multipleSelect({
			maxHeight: 1000,
			single: true,
			placeholder: placeholder,
			onOpen: function(view) {
				var droplist = select.parent().find('.ms-drop');
				if (!droplist.hasClass('is-open')) {
					droplist.customScrollbar();
					droplist.addClass('is-open');
				};
				
			}
		});

	});

	// jquery autocomplete

	$('.autocomplete').each(function() {
		var availableTags = [
			{
				value: 'Стромынка',
				adress: 'ул. Стромынка',
				city: 'г. Москва'
			},
			{
				value: 'Стромынка',
				adress: 'ул. Стромынка',
				city: 'г. Химки'
			},
			{
				value: 'Стромынка',
				adress: 'ул. Стромынка',
				city: 'г. Казань'
			},
			{
				value: 'Стромынка',
				adress: 'ул. Стромынка',
				city: 'г. Ростов'
			},
			{
				value: 'Стромынка',
				adress: 'ул. Стромынка',
				city: 'г. Москва'
			},
			{
				value: 'Стромынка',
				adress: 'ул. Стромынка',
				city: 'г. Химки'
			},
			{
				value: 'Стромынка',
				adress: 'ул. Стромынка',
				city: 'г. Казань'
			},
			{
				value: 'Стромынка',
				adress: 'ул. Стромынка',
				city: 'г. Ростов'
			}
		];
		var list = $(this);	

		list.autocomplete({
			minLength: 0,
			source: availableTags,
			open: function(event, ui) {
				var droplist = $('.ui-autocomplete');
				droplist.customScrollbar();
			},
			focus: function( event, ui ) {
			    list.val( ui.item.value );
			    return false;
			}
		})
		.autocomplete( "instance" )._renderItem = function(ul, item) {

			return $('<div>')
			.append(
				'<a><p><strong>' + item.adress + '</strong></p>' + '<p>' + item.city + '</p>'
			).appendTo(ul);
		}
	});
    	
	// metro select

	$(document).click(function() {
        $(".js-metro").removeClass("is-active");
	      $(".js-metro-list").slideUp(100);
    });
    
  // select list
    $("body").on("click",".js-metro",function(event) {
        event.stopPropagation();
    });
    $("body").on("click",".js-metro-text",function(event) {
    	var select = $(this).parents(".js-metro");

        if (select.hasClass("is-active")) {
            $(".js-metro").removeClass("is-active");
            $(".js-metro-list").slideUp(100);
        }
        else {
            $(".js-metro").removeClass("is-active");
            $(".js-metro-list").slideUp(100);
            select.toggleClass("is-active").find(".js-metro-list").slideToggle(100);
        }
        setTimeout(function() {
        	if (!$('.js-metro-list').hasClass('is-loaded')) {
        		$('.js-metro-list').customScrollbar();
        		$('.js-metro-list').addClass('is-loaded');
        	};
        	
        }, 100);
    });

    $("body").on("click",".metro__item",function() {
        var val = $(this).attr("data-val");
        var text = $(this).html();
        var select = $(this).parents(".js-metro");
        var selectList = $(this).parents(".js-metro-list");
        select.find(".js-metro-text").html(text);
        select.find("option").removeAttr("selected");
        select.find('option[value="'+val+'"]').attr("selected", "selected");
        selectList.find(".metro__item").removeClass("is-active");
        $(this).addClass("is-active");
        select.removeClass("is-active");
        selectList.slideUp(100);
        return false;
        
    });

    // filters

    // filters dropdown
	(function () {

		$(document).on('click', function () {
			$('.js-filter').removeClass('is-open');
			$('.js-filter-dropdown').slideUp('fast');
		});

		$('.js-filter').on('click', function() {
			event.stopPropagation();
		});

		$('.js-filter-view').on('click', function() {

			var left = $(this).offset().left;

			left = left - $('.js-filter').offset().left;

			$(this).parent('.js-filter').find('.js-filter-dropdown')
			.css('left', -left);

			if ($(this).parent('.js-filter').hasClass('is-open')) {
				
				$(this).parent('.js-filter').removeClass('is-open');
				$(this).parent('.js-filter').find('.js-filter-dropdown').slideUp('fast');
			}
			else {
				$('.js-filter').removeClass('is-open');
				$('.js-filter-dropdown').slideUp('fast');
				$(this).parent('.js-filter').addClass('is-open');
				$(this).parent('.js-filter').find('.js-filter-dropdown').slideDown('fast');
			}
			
			
		});

		// filters tabs

		$('.js-filters-link').on('click', function(event) {
			event.stopPropagation();
			return false;
		});

		$('.js-filters-link').hover(
			function () {
				var link = $(this).attr('href');

				$(this).parents('.js-filter-dropdown').find('.js-filters-content').hide();
				$('.'+link).show();
			},
			function () {
				// body
			}
		);

		// show more btn

		$('.js-filters-more').on('click', function() {
			$(this).parents('.js-filters-content').find('.filter__preview')
			.addClass('is-open');
			$(this).hide();
		});


		// function returns index of array element
		if ([].indexOf) {

			var find = function(array, value) {
				return array.indexOf(value);
			}

		} else {
			var find = function(array, value) {
				for (var i = 0; i < array.length; i++) {
					if (array[i] === value) return i;
				}

			  return -1;
			}

		}

	
   		$('.js-filter').each(function() {
   			var checkbox = $(this).find('.checkbox input'),
   				valuesArray = [],
   				reset = $(this).find('.js-filter-reset');

			checkbox.on('click', function() {

				var valueContainer = $(this).parents('.js-filter').find('.js-filter-value'),
					value = $(this).parent().find('span').text();

				// check/uncheck events =======================================
				
				if ($(this).prop('checked')) {
					
					valuesArray[valuesArray.length] = value;
				}
				else {
					var arrIndex = find(valuesArray, value);

					valuesArray.splice(arrIndex, 1);
				}
				

				// push values to valueContainer =======================
				
				var addValues = (valuesArray.length - 1);

				if (valuesArray.length > 1) {
					if ($(this).parents('.js-filter').hasClass('js-filter-type')) {
						valueContainer.text('выбрано ' + addValues + ' типа');
					}
					else {
						valueContainer.text(valuesArray[0] + ' и еще ' + addValues);
					}
					
				}
				else {
					valueContainer.text(valuesArray[0]);
				}


					
				// remove placeholder =======================================
				if (valuesArray.length >= 1) {
					valueContainer.removeClass('placeholder');
					reset.show();
				}
				else {
					valueContainer.addClass('placeholder');
					valueContainer.text('не выбрано');
				}


				// reset current filter =================================
				reset.on('click', function(event) {

					// remove value from view
					valueContainer.addClass('placeholder');
					valueContainer.text('Не выбрано');

					// unckeck all checkboxes in current filter
					checkbox.removeAttr('checked');

					// hide reset button
					$(this).hide();

					event.stopPropagation();
				});
				
				
			});

   		});

		//range
		if ($('.js-filter-range').length) {

			var slider = document.getElementById('js-range-price');

				noUiSlider.create(slider, {
					start: [25000, 65000],
					step: 100,
					connect: true,
					range: {
						'min': 0,
						'max': 200000
					}
				});

				slider.noUiSlider.on('update', function( values, handle ) {

					var value = values[handle];

					if ( handle ) {
						$('span.js-filter-to').text(Math.round(values[handle]));
						$('input.js-filter-to').val(Math.round(values[handle]));
					}
					else {
						$('span.js-filter-from').text(Math.round(values[handle]));
						$('input.js-filter-from').val(Math.round(values[handle]));
					}
				});

				$('input.js-filter-from').on('change', function(){
					slider.noUiSlider.set([this.value, null]);
				});
				$('input.js-filter-to').on('change', function(){
					slider.noUiSlider.set([null, this.value]);
				});

				slider.noUiSlider.on('slide', function( values, handle ) {

					$('.js-filter-range .placeholder').hide();
					$('.js-filter-range-value').show();

				});

		};

	}());

	// profile

	function orderTab() {
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
	orderTab();

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

	// password input

	$('.js-pass-btn').on('click', function() {
		var input = $(this).parent().find('input');
		
		if ($(this).hasClass('is-active')) {
			$(this).removeClass('is-active');
			input.attr('type', 'password');
		}
		else {
			$(this).addClass('is-active');
			input.attr('type', 'text');
		}
	});

});

