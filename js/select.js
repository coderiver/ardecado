head.ready(function() {

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


});