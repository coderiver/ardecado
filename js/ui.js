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
	$(function() {
    	var availableTags = [
    		"ActionScript",
    		"AppleScript",
    		"Asp",
    		"BASIC",
    		"C",
    		"C++",
    		"Clojure",
    		"COBOL",
    		"ColdFusion",
    		"Erlang",
    		"Fortran",
    		"Groovy",
    		"Haskell",
    		"Java",
    		"JavaScript",
    		"Lisp",
    		"Perl",
    		"PHP",
    		"Python",
    		"Ruby",
    		"Scala",
    		"Scheme"
    	];
    	$('#order-street').autocomplete({
    	  source: availableTags
    	});
	});


});