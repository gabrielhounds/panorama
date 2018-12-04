$(document).ready(function(){
	init();
});

function init() {
	var log = console.log;
	log('init');

	var t = TweenMax;

	var main = $('<div>', { id : 'main' }).prependTo('body');
	var debugText = $('<div id="debugText">  </div>').appendTo(main);

	var panoHolder = $('<div>', { id : 'panoHolder' }).prependTo(main);
	var panoImage  = $('<div>', { id : 'panoImage'  }).appendTo(panoHolder);

	var _width  = window.innerWidth;
	var _height = window.innerHeight;
	var _density = window.devicePixelRatio;

	var imageHeight = 1624;
	var imageWidth  = 3225;

	var pImageHeight = _height;
	var pImageWidth  = Math.round(imageWidth * (_height / imageHeight));

	var panRate = pImageWidth / 360;

	$(panoImage).css( { height : _height, width : pImageWidth, top : 0, left : 0 } );
	$(panoImage).html( '<img src="bg_00.jpg">');

	var centerOffset = (_width / 2 ) - (pImageWidth / 2);

	t.set(panoImage, {x:centerOffset});



	var _alpha;
	var rotationRate;

	window.addEventListener('deviceorientation', function(e) {


		if(e.alpha < 180) {

			if (e.alpha > 90) {
				_alpha = 270;
			} else {
				_alpha = Math.abs(e.alpha) + 180;
			}
		} else if ( e.alpha > 180 ) {

			if(e.alpha < 270 ) {
				_alpha = 90;
			} else {
				_alpha = Math.abs(e.alpha) - 180;
			}

		}

		$(debugText).html('PXD: ' + _density + '<br>' + 'PIWIDTH: ' + pImageWidth + '<br>' + 'PHEIGHT: ' + pImageHeight + '<br>' + 'PANRATE: ' + panRate.toFixed(3) + '<br>' + 'WIDTH: ' + _width + '<br>' + 'HEIGHT: ' + _height + '<br>' + 'ALPH: ' + Math.round(e.alpha) + '<br>' + 'BETA: ' + Math.round(e.beta) + '<br>' + 'GAMM: ' + Math.round(e.gamma) + '<br>' + 'X POS: ' + Math.round($(panoImage).offset().left)  + '<br>' + 'X CHANGE: ' + Math.round(_alpha) );

		t.set(panoImage, { x: ( (_alpha - 180) * panRate) + centerOffset  });

	});



}





























//