$.fn.scrollPane = function(config){
	var objPane = this;
	if(!objPane.length) {
		return false;
	}
//	var func = {};

	config = $.extend({
		'container-max-height': false,//максимальная высота всего объекта
		'container-max-width': false,//максимальная ширина всего объекта
		'track-y-min-height': 20,
		'track-x-min-width': 20,
		'track-y-height': false,
		'track-x-width': false,
		'scroll-bottom': false,
		'arrow': true,
		'type': 'auto',//тип скролбара (вертикальный/горизонтальны/авто) (vertical/horizontal/auto)
		'delta': 5,//Количес
		'scroll-to-x': 0,
		'scroll-to-y': 0,
		'animate-time': 300
	}, config || {});

	function onWheel(e) {
		e = e || window.event;
// wheelDelta не дает возможность узнать количество пикселей
		var delta = e.deltaY || e.detail || -1 * e.wheelDelta / 40;
		var scrollWindow = false;
//console.log(config['type']);
//console.log(this);
//console.log($(this));
//console.log(e);
		if(config['type'] == 'horizontal') {
			this.arData.areaMarginX -= config['delta'] * delta;
//console.log(this.arData.areaMarginX);
			scrollWindow = this.func.scrollAreaTo(this, this.arData.areaMarginX, 'X', false);
		}
		else if(config['type'] == 'vertical' || config['type'] == 'auto') {
//console.log(this.arData.areaMarginY);
			this.arData.areaMarginY -= config['delta'] * delta;
			scrollWindow = this.func.scrollAreaTo(this, this.arData.areaMarginY, 'Y', false);
		}

		if(!scrollWindow) {
			e.preventDefault ? e.preventDefault() : (e.returnValue = false);
		}
	}


	objPane.each(function(id){
		if(!$(this).hasClass('scrollpane-area')) {

			var objArea = this;
			objArea.arObj = {};
			objArea.arData = {};
			objArea.func = {};

			objArea.func.trackSize = function(obj) {
				obj.arObj.containerGlobal.removeClass('scroll-x');
				obj.arObj.containerGlobal.removeClass('scroll-y');

				objArea.arData.containerGlobalLeft = 1 * objArea.arObj.containerGlobal.offset().left;

				obj.arData.containerGlobalWidth = 1 * obj.arObj.containerGlobal.width();
				obj.arData.containerGlobalHeight = 1 * obj.arObj.containerGlobal.height();
				obj.arData.areaWidth = obj.arObj.area.outerWidth();

				var scrollX = false;
				if((config['type'] == 'horizontal' || config['type'] == 'auto') && obj.arData.areaWidth > obj.arData.containerGlobalWidth) {
					obj.arObj.containerGlobal.addClass('scroll-x');
					obj.arData.lineXLeft = 1 * objArea.arObj.lineX.css('left').replace('px', '');
					scrollX = true;
				}

				obj.arData.containerHeight = obj.arData.containerGlobalHeight - 1 * obj.arObj.container.css('margin-bottom').replace('px', '');
				obj.arData.areaHeight = obj.arObj.area.outerHeight();

				var scrollY = false;
				if((config['type'] == 'vertical' || config['type'] == 'auto') && obj.arData.areaHeight > obj.arData.containerGlobalHeight) {
					obj.arObj.containerGlobal.addClass('scroll-y');
					obj.arData.lineYTop = 1 * objArea.arObj.lineY.css('top').replace('px', '');
					scrollY = true;
				}

				obj.arData.containerWidth = obj.arData.containerGlobalWidth - 1 * obj.arObj.container.css('margin-right').replace('px', '');

				var containerStyle = '';
				if(scrollX) {
					obj.arData.lineXWidth = obj.arObj.lineX.outerWidth();
					obj.arData.trackXWidth = obj.arData.lineXWidth * obj.arData.containerWidth / obj.arData.areaWidth;
					if(config['track-x-width']) {
						obj.arData.trackXWidth = config['track-x-width'];
					}
					else if(obj.arData.trackXWidth < config['track-x-min-width']) {
						obj.arData.trackXWidth = config['track-x-min-width'];
					}
					obj.arObj.trackX.css({'width': obj.arData.trackXWidth + 'px'});
				}

				if(scrollY) {
					obj.arData.lineYHeight = obj.arObj.lineY.outerHeight();
					obj.arData.trackYHeight = obj.arData.lineYHeight * obj.arData.containerHeight / obj.arData.areaHeight;
					if(config['track-y-height']) {
						obj.arData.trackYHeight = config['track-y-height'];
					}
					else if(obj.arData.trackYHeight < config['track-y-min-height']) {
						obj.arData.trackYHeight = config['track-y-min-height'];
					}
					obj.arObj.trackY.css({'height': obj.arData.trackYHeight + 'px'});
				}

				if(config['container-max-width']) {
					obj.arObj.container.css({'max-width': (config['container-max-width'] - 1 * obj.arObj.container.css('margin-right').replace('px', '')) + 'px'});
				}
				else {
					obj.arObj.container.css({'max-width': 'none'});
				}
				if(config['container-max-height']) {
					obj.arObj.container.css({'max-height': (config['container-max-height'] - 1 * obj.arObj.container.css('margin-bottom').replace('px', '')) + 'px'});
				}
				else {
					obj.arObj.container.css({'max-height': 'none'});
				}
			}

			objArea.func.scrollAreaTo = function(obj, margin, direction, animate, animateTime) {
				var scrollWindow = false;
				if(direction == 'X') {
					obj.arData.areaMarginX = margin;
					if(margin > 0) {
						obj.arData.areaMarginX = 0;
						scrollWindow = true;
					}
					else if(margin < obj.arData.containerWidth - obj.arData.areaWidth) {
						obj.arData.areaMarginX = obj.arData.containerWidth - obj.arData.areaWidth;
						scrollWindow = true;
					}
					if(obj.arData.containerWidth < obj.arData.areaWidth) {
						obj.arData.trackXMarginX = objArea.arData.lineXLeft -1 * obj.arData.areaMarginX * (obj.arData.lineXWidth - obj.arData.trackXWidth) / (obj.arData.areaWidth - obj.arData.containerWidth); 

						if(animate) {
							obj.arObj.area.stop();
							obj.arObj.area.animate(
								{'margin-left': obj.arData.areaMarginX + 'px', 'margin-right': -1 * obj.arData.areaMarginX + 'px'},
								animateTime
							);
							obj.arObj.trackX.stop();
							obj.arObj.trackX.animate(
								{'margin-left': obj.arData.trackXMarginX + 'px'},
								animateTime
							);
						}
						else {
							obj.arObj.area.css({'margin-left': obj.arData.areaMarginX + 'px', 'margin-right': -1 * obj.arData.areaMarginX + 'px'});
							obj.arObj.trackX.css({'margin-left': obj.arData.trackXMarginX + 'px'});
						}
					}
					else {
						obj.arObj.area.css({'margin-left': 0, 'margin-right': 0});
						obj.arObj.trackX.css({'margin-left': 0});
					}
				}
				if(direction == 'Y') {
					obj.arData.areaMarginY = margin;
					if(margin > 0) {
						obj.arData.areaMarginY = 0;
						scrollWindow = true;
					}
					else if(margin < obj.arData.containerHeight - obj.arData.areaHeight) {
						obj.arData.areaMarginY = obj.arData.containerHeight - obj.arData.areaHeight;
						scrollWindow = true;
					}
					if(obj.arData.containerHeight < obj.arData.areaHeight) {
						obj.arData.trackYMarginY = objArea.arData.lineYTop -1 * obj.arData.areaMarginY * (obj.arData.lineYHeight - obj.arData.trackYHeight) / (obj.arData.areaHeight - obj.arData.containerHeight); 

						if(animate) {
							obj.arObj.area.stop();
							obj.arObj.area.animate(
								{'margin-top': obj.arData.areaMarginY + 'px', 'margin-bottom': -1 * obj.arData.areaMarginY + 'px'},
								300
							);
							obj.arObj.trackY.stop();
							obj.arObj.trackY.animate(
								{'margin-top': obj.arData.trackYMarginY + 'px'},
								300
							);
						}
						else {
							obj.arObj.area.css({'margin-top': obj.arData.areaMarginY + 'px', 'margin-bottom': -1 * obj.arData.areaMarginY + 'px'});
							obj.arObj.trackY.css({'margin-top': obj.arData.trackYMarginY + 'px'});
						}
					}
					else {
						obj.arObj.area.css({'margin-top': 0, 'margin-bottom': 0});
						obj.arObj.trackY.css({'margin-top': 0});
					}
				}
				return scrollWindow;
			}

			objArea.func.scrollTreckTo = function(obj, margin, direction, animate, animateTime) {
				if(direction == 'X') {
					obj.arData.areaMarginX = -1 * margin * (obj.arData.areaWidth - obj.arData.containerWidth) / (obj.arData.lineXWidth - obj.arData.trackXWidth);
					objArea.func.scrollAreaTo(obj, obj.arData.areaMarginX, direction, animate, animateTime);
				}
				if(direction == 'Y') {
					obj.arData.areaMarginY = -1 * margin * (obj.arData.areaHeight - obj.arData.containerHeight) / (obj.arData.lineYHeight - obj.arData.trackYHeight);
					objArea.func.scrollAreaTo(obj, obj.arData.areaMarginY, direction, animate, animateTime);
				}
			}

			objArea.func.scrollBottom = function() {
				objArea.arData.containerGlobalTop = 1 * objArea.arObj.containerGlobal.offset().top;
				if(1 * $(document).scrollTop() + 1 * $(window).height() < objArea.arData.containerGlobalHeight + objArea.arData.containerGlobalTop) {
					objArea.arObj.barX.addClass('scrollpane-bar-x-bottom');
					objArea.arObj.barX.css({'left': objArea.arData.containerGlobalLeft + 'px', 'width': objArea.arData.containerGlobalWidth + 'px', 'bottom': (objArea.trackXHeight / 2) + 'px'});
				}
				else {
					objArea.arObj.barX.removeClass('scrollpane-bar-x-bottom');
					objArea.arObj.barX.prop('style', false);
				}

			}



			objArea.arObj.area = $(objArea);

			if(objArea.arObj.area.data('scroll-bottom') && objArea.arObj.area.data('scroll-bottom') == "yes") {
				config['scroll-bottom'] = true;
			}
			var containerGlogalStyle = '';
			if(config['container-max-height']) {
				containerGlogalStyle += 'max-height: ' + config['container-max-height'] + 'px;';
			}
			if(config['container-max-width']) {
				containerGlogalStyle += 'max-width: ' + config['container-max-width'] + 'px;';
			}
			if(containerGlogalStyle.length > 0) {
				containerGlogalStyle = ' style="' + containerGlogalStyle + '"';
			}

			objArea.arObj.area.addClass('scrollpane-area');
			objArea.arObj.area.wrap('<div class="scrollpane-container" />')
			objArea.arObj.container = objArea.arObj.area.parent();
			objArea.arObj.container.wrap('<div class="scrollpane-container-global"' + containerGlogalStyle + ' />')
			objArea.arObj.containerGlobal = objArea.arObj.container.parent();

			objArea.arObj.containerGlobal.append('<div class="scrollpane-bar-x" unselectable="on"><div class="scrollpane-line-x"></div><div class="scrollpane-track-x" unselectable="on"></div></div>');
			objArea.arObj.barX = objArea.arObj.containerGlobal.find('> .scrollpane-bar-x');
			objArea.arObj.lineX = objArea.arObj.barX.find('> .scrollpane-line-x');
			objArea.arObj.trackX = objArea.arObj.barX.find('> .scrollpane-track-x');
			objArea.arData.trackXHeight = objArea.arObj.trackX.height();

			objArea.arObj.containerGlobal.append('<div class="scrollpane-bar-y" unselectable="on"><div class="scrollpane-line-y"></div><div class="scrollpane-track-y" unselectable="on"></div></div>');
			objArea.arObj.barY = objArea.arObj.containerGlobal.find('> .scrollpane-bar-y');
			objArea.arObj.lineY = objArea.arObj.barY.find('> .scrollpane-line-y');
			objArea.arObj.trackY = objArea.arObj.barY.find('> .scrollpane-track-y');

			if (objArea.arObj.area[0].addEventListener) {
				if ('onwheel' in document) {// IE9+, FF17+, Ch31+
					objArea.arObj.area[0].addEventListener("wheel", onWheel);
				}
				else if ('onmousewheel' in document) {// устаревший вариант события
					objArea.arObj.area[0].addEventListener("mousewheel", onWheel);
				}
				else {// Firefox < 17
					objArea.arObj.area[0].addEventListener("MozMousePixelScroll", onWheel);
				}
			}
			else {// IE8-
				objArea.arObj.area[0].attachEvent("onmousewheel", onWheel);
			}

			if(config['type'] == 'horizontal' || config['type'] == 'auto') {
				objArea.arObj.dragObjectX = false;
				objArea.arObj.trackX.mousedown(function(e){
					if (e.which != 1) { // если клик правой кнопкой мыши
						return; // то он не запускает перенос
					}
					objArea.arObj.dragObjectX = this;
					objArea.arObj.dragStartX = 1 * e.pageX;
					objArea.arObj.dragStartMarginX = 1 * $(this).css('margin-left').replace('px', '');
				});

				objArea.arObj.trackX.on('touchstart', function(event){
					objArea.arObj.dragStartX = 1 * event.originalEvent.touches[0].pageX;
					objArea.arObj.dragStartMarginX = 1 * $(this).css('margin-left').replace('px', '');
				});
				objArea.arObj.trackX.on('touchmove', function(event){
					var margin = objArea.arObj.dragStartMarginX - objArea.arObj.dragStartX + 1 * event.originalEvent.touches[0].pageX;
					objArea.func.scrollTreckTo(objArea, margin, 'X', false, 0);
					return false;
				});
			}
			if(config['type'] == 'vertical' || config['type'] == 'auto') {
				objArea.arObj.dragObjectY = false;
				objArea.arObj.trackY.mousedown(function(e){
					if (e.which != 1) { // если клик правой кнопкой мыши
						return; // то он не запускает перенос
					}
					objArea.arObj.dragObjectY = this;
					objArea.arObj.dragStartY = 1 * e.pageY;
					objArea.arObj.dragStartMarginY = 1 * $(this).css('margin-top').replace('px', '');
				});

				objArea.arObj.trackY.on('touchstart', function(event){
					objArea.arObj.dragStartY = 1 * event.originalEvent.touches[0].pageY;
					objArea.arObj.dragStartMarginY = 1 * $(this).css('margin-top').replace('px', '');
				});
				objArea.arObj.trackY.on('touchmove', function(event){
					var margin = objArea.arObj.dragStartMarginY - objArea.arObj.dragStartY + 1 * event.originalEvent.touches[0].pageY;
					objArea.func.scrollTreckTo(objArea, margin, 'Y', false, 0);
					return false;
				});
			}
			$(document).mousemove(function(e){
				if (objArea.arObj.dragObjectX) {
					var margin = objArea.arObj.dragStartMarginX - objArea.arObj.dragStartX + e.pageX;
					objArea.func.scrollTreckTo(objArea, margin, 'X', false, 0);
				}
				else if(objArea.arObj.dragObjectY) {
					var margin = objArea.arObj.dragStartMarginY - objArea.arObj.dragStartY + e.pageY;
					objArea.func.scrollTreckTo(objArea, margin, 'Y', false, 0);
				}
			});
			$(document).mouseup(function(){
				objArea.arObj.dragObjectX = false;
				objArea.arObj.dragObjectY = false;
			});

			objArea.arObj.area.on('touchstart', function(event){
				objArea.arObj.dragStartX = 1 * event.originalEvent.touches[0].pageX;
				objArea.arObj.dragStartMarginX = objArea.arData.areaMarginX;
				objArea.arObj.dragStartY = 1 * event.originalEvent.touches[0].pageY;
				objArea.arObj.dragStartMarginY = objArea.arData.areaMarginY;
//				objArea.arObj.touchStartTimestamp = Date.now() / 1000;
			});
			objArea.arObj.area.on('touchmove', function(event){
				var marginX = objArea.arObj.dragStartMarginX - objArea.arObj.dragStartX + 1 * event.originalEvent.touches[0].pageX;
				var marginY = objArea.arObj.dragStartMarginY - objArea.arObj.dragStartY + 1 * event.originalEvent.touches[0].pageY;
				objArea.func.scrollAreaTo(objArea, marginX, 'X', false, 0);
				objArea.func.scrollAreaTo(objArea, marginY, 'Y', false, 0);
				return false;
			});
/*
			objArea.arObj.area.on('touchend', function(event){
				var touchSpeedX = (event.originalEvent.changedTouches[0].pageX - objArea.arObj.dragStartX) / (Date.now() / 1000 - objArea.arObj.touchStartTimestamp);
				var touchSpeedY = (event.originalEvent.changedTouches[0].pageY - objArea.arObj.dragStartY) / (Date.now() / 1000 - objArea.arObj.touchStartTimestamp);
				var direction = 1;
				if(touchSpeedX < 0) {
					direction = -1;
				}
				objArea.func.scrollAreaTo(objArea, objArea.arData.areaMarginX + direction * touchSpeedX * touchSpeedX / 10000, 'X', true, Math.abs(touchSpeedX));
			});
*/


			objArea.arObj.lineX.click(function(e){
				if(objArea.arData.trackXMarginX > e.offsetX) {
					objArea.func.scrollTreckTo(objArea, 1 * e.offsetX, 'X', true, config['animate-time']);
				}
				else if(objArea.arData.trackXMarginX + objArea.arData.trackXWidth < e.offsetX) {
					objArea.func.scrollTreckTo(objArea, 1 * e.offsetX - objArea.arData.trackXWidth, 'X', true, config['animate-time']);
				}
			});
			objArea.arObj.lineY.click(function(e){
				if(objArea.arData.trackYMarginY > e.offsetY) {
					objArea.func.scrollTreckTo(objArea, 1 * e.offsetY, 'Y', true, config['animate-time']);
				}
				else if(objArea.arData.trackYMarginY + objArea.arData.trackYHeight < e.offsetY) {
					objArea.func.scrollTreckTo(objArea, 1 * e.offsetY - objArea.arData.trackYHeight, 'Y', true, config['animate-time']);
				}
			});
			if(config['arrow']) {
				objArea.arObj.containerGlobal.addClass('scrollpane-arrow');

				objArea.arObj.barX.append('<div class="scrollpane-arrow-left"></div><div class="scrollpane-arrow-right"></div>');
				objArea.arObj.arrowLeft = objArea.arObj.barX.find('> .scrollpane-arrow-left');
				objArea.arObj.arrowRight = objArea.arObj.barX.find('> .scrollpane-arrow-right');

				objArea.arObj.barY.append('<div class="scrollpane-arrow-up"></div><div class="scrollpane-arrow-down"></div>');
				objArea.arObj.arrowUp = objArea.arObj.barY.find('> .scrollpane-arrow-up');
				objArea.arObj.arrowDown = objArea.arObj.barY.find('> .scrollpane-arrow-down');
				objArea.arObj.arrowLeft.click(function(){
					var margin = objArea.arData.areaMarginX + objArea.arData.containerWidth / 4;
					objArea.func.scrollAreaTo(objArea, margin, 'X', true, config['animate-time'])
				});
				objArea.arObj.arrowRight.click(function(){
					var margin = objArea.arData.areaMarginX - objArea.arData.containerWidth / 4;
					objArea.func.scrollAreaTo(objArea, margin, 'X', true, config['animate-time'])
				});
				objArea.arObj.arrowUp.click(function(){
					var margin = objArea.arData.areaMarginY + objArea.arData.containerHeight / 4;
					objArea.func.scrollAreaTo(objArea, margin, 'Y', true, config['animate-time'])
				});
				objArea.arObj.arrowDown.click(function(){
					var margin = objArea.arData.areaMarginY - objArea.arData.containerHeight / 4;
					objArea.func.scrollAreaTo(objArea, margin, 'Y', true, config['animate-time'])
				});
			}
			objArea.func.trackSize(objArea);
			objArea.func.scrollAreaTo(objArea, config['scroll-to-x'], 'X', false, 0);
			objArea.func.scrollAreaTo(objArea, config['scroll-to-y'], 'Y', false, 0);

			if(config['scroll-bottom']) {
				objArea.func.scrollBottom();
				$(window).resize(function(){
					objArea.func.trackSize(objArea);
					objArea.func.scrollBottom();
				});
				$(window).scroll(function(){
					objArea.func.scrollBottom();
				});
			}
			else {
				$(window).resize(function(){
					objArea.func.trackSize(objArea);
				});
			}
		}
		else {
			this.func.trackSize(this);
			this.func.scrollAreaTo(this, config['scroll-to-x'], 'X', false, 0);
			this.func.scrollAreaTo(this, config['scroll-to-y'], 'Y', false, 0);
		}



	});

}
