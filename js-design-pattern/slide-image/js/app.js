// change slide when click next or previous button
var sliderControls = document.getElementsByClassName('slider-control');
for (var i = 0; i < sliderControls.length; i++) {
	sliderControls[i].onclick = function() {
		var direction = this.dataset.slide;
		Slider.changeSlideIndex(direction);
	}
}

// change slide when click the index button
var sliderIndicators = document.getElementsByClassName('slider-indicator-item');
for (var i = 0; i < sliderIndicators.length; i++) {
	sliderIndicators[i].onclick = function() {
		var index = this.dataset.slideTo;
		Slider.goToSlideIndex(index);
	}
}
var timmer = null;
var slide = document.getElementById('JsSliderImage');

// clear timmer when mouse over slide
slide.onmouseover = function() {
	clearInterval(timmer);
}

// auto change slide each 3s
slide.onmouseout = function() {
	timmer = setInterval(function() {
		Slider.autoChangeSlide();
	}, 3000);
}
