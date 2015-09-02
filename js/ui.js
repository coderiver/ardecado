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






});