'use strict';
var sliderControls = document.getElementsByClassName('slider-control');
for (var i = 0; i < sliderControls.length; i++) {
	sliderControls[i].onclick = function() {
		slider.changeSlideIndex(this);
	}
}

var sliderIndicators = document.getElementsByClassName('slider-indicator-item');
for (var i = 0; i < sliderIndicators.length; i++) {
	sliderIndicators[i].onclick = function() {
		var index = this.dataset.slideTo;	
		slider.goToSlideIndex(index);
	}
}
var timmer = null;
var slide = document.getElementById('JsSliderImage');
slide.onmouseover = function() {
	clearInterval(timmer);
}
slide.onmouseout = function() {
	
	timmer = setInterval(function() {
		slider.autoChangeSlide();
	}, 3000);
}