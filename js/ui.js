head.ready(function() {

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
    	







});