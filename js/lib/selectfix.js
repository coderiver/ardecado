$.fn.selectFix = function(config){
	var objSelects = this;
	if(!objSelects.length) {
		return false;
	}
	var func = {};
	var arObj = [];
	var arData = [];
	config = $.extend({
		'container-max-height': 200,//ћаксимальна€ высота выпада€щего раскрытого списка (false/integer)
		'container-max-width': false,//ћаксимальна€ ширина селекта (false/integer)
		'track-y-min-height': 20,//ћинимальна€ высота трека в скролбаре по оси Y, если задан track-y-height, то не учитываетс€ (false/integer)
		'track-x-min-width': false,//Ќе трогаем это значение (параметр на будущее)
		'track-y-height': false,//≈сли нам нужна фиксированна€ высота трека (false/integer)
		'track-x-width': false,//Ќе трогаем это значение (параметр на будущее)
		'arrow': true, //стрелки в скролбаре (true/false)
		'delta': 5,//чем больше эта цифра, тем чувствительнее скрол в скролбаре к событию mousewheel
		'search': false//поиск по значени€м селекта (true/false)
	}, config || {});

	func.isTouchable = function()
	{
		var result = (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
		this.isTouchable = function() {
			return result;
		};
		return result;
	};

	objSelects.each(function(id){
		if(!$(this).hasClass('selectfix')) {
			arObj[id] = {};
			arData[id] = {};

			arObj[id]['select'] = $(this);
			arObj[id]['options'] = $(this).find('option');
			arObj[id]['select'].addClass('selectfix');

			var containerStyle = '';
			if(config['container-max-width']) {
				containerStyle += 'max-width: ' + config['container-max-width'] + 'px;';
			}
			arObj[id]['select'].wrap('<div class="selectfix-container" style="' + containerStyle + '" />');
			arObj[id]['container'] = arObj[id]['select'].parent();
			if(func.isTouchable()) {
				arObj[id]['container'].addClass('touch');
			}
			arObj[id]['container'].append('<div class="selectfix-current-value" unselectable="on" />');
			arObj[id]['currentValue'] = arObj[id]['container'].find('.selectfix-current-value');
			arObj[id]['container'].append('<div class="selectfix-border" />');
			arObj[id]['border'] = arObj[id]['container'].find('.selectfix-border');
			arObj[id]['border'].append('<div class="selectfix-list" data-id="' + id + '" />');
			arObj[id]['list'] = arObj[id]['border'].find('.selectfix-list');

			var selected = '';
			arObj[id]['options'].each(function(index){
				selected = '';
				if($(this).filter(':selected').length) {
					selected = ' selected';
					arObj[id]['currentValue'].html($(this).html());
				}
				var option = $('<div class="selectfix-value' + selected + '" data-index="' + index + '" unselectable="on">' + $(this).html() + '</div>');
				option.data('text', $(this).html());
				arObj[id]['list'].append(option);
				$(this).data('index', index);
			});

			if($.fn.scrollPane) {
				arObj[id]['list'].scrollPane({'container-max-height': config['container-max-height'], 'container-max-width': config['container-max-width'], 'track-y-min-height': config['track-y-min-height'], 'track-x-min-width': config['track-x-min-width'], 'track-y-height': config['track-y-height'], 'track-x-width': config['track-x-width'], 'scroll-bottom': false, 'arrow': config['arrow'], 'type': 'vertical', 'delta': config['delta']});
			}

			arObj[id]['value'] = arObj[id]['list'].find('.selectfix-value');

			if(config['search']) {
				arObj[id]['border'].prepend('<div class="selectfix-search"><input type="text" value="" name="search" /></div>');
				arObj[id]['search'] = arObj[id]['border'].find('.selectfix-search');
				arObj[id]['search'].find('input').keyup(function(){
					var string = $(this).val();
					arObj[id]['value'].show();
					arObj[id]['value'].each(function(){
						if(string.length > 0 && $(this).data('text').toUpperCase().indexOf(string.toUpperCase()) < 0) {
							$(this).hide();
							$(this).html($(this).data('text'));
						}
						else {
							$(this).html($(this).data('text').replace(RegExp(string, "ig"), "<b>$&</b>"));
						}
					});
					var selectedValue = arObj[id]['value'].filter('.selected:visible');
					var margin = 0;
					if(selectedValue.length) {
						margin = 1 * arObj[id]['list'].css('margin-top').replace('px', '') - 1 * arObj[id]['value'].filter('.selected').position().top;
					}
					if($.fn.scrollPane) {
						arObj[id]['list'].scrollPane({'container-max-height': config['container-max-height'], 'container-max-width': config['container-max-width'], 'track-y-min-height': config['track-y-min-height'], 'track-x-min-width': config['track-x-min-width'], 'track-y-height': config['track-y-height'], 'track-x-width': config['track-x-width'], 'scroll-bottom': false, 'arrow': config['arrow'], 'type': 'vertical', 'delta': config['delta'], 'scroll-to-y': margin});
					}
				});
			}

			arObj[id]['currentValue'].click(function(){
				$('.selectfix-container').not(arObj[id]['container']).removeClass('opened');
				arObj[id]['container'].toggleClass('opened');
			});
			arObj[id]['value'].click(function(){
				arObj[id]['options'].eq($(this).data('index')).prop('selected', true);
				arObj[id]['select'].trigger('change');
			});
			arObj[id]['select'].change(function(){
				var currentOption = $(this).find('option:selected');
				arObj[id]['currentValue'].html(currentOption.html());
				arObj[id]['container'].removeClass('opened');
				arObj[id]['value'].removeClass('selected');
				arObj[id]['value'].eq(currentOption.data('index')).addClass('selected');
			});

			arObj[id]['container'].find('*').click(function(event){
				event.stopPropagation();
			});

		}
	});

	$('body, body *').click(function(event){
		if(!$(this).closest('.selectfix-container').length && !$(this).hasClass('selectfix-container')) {
			$('.selectfix-container').removeClass('opened');
		}
	});

}