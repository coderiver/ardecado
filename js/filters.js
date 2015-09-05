head.ready(function() {

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

		$('.js-filters-link').on('click', function() {
			return false;
			event.stopPropagation();
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



});