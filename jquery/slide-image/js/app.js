$(document).ready(function() {

	// change slide when click next or previous button
	var $sliderControls = $('.slider-control');
	$sliderControls.on('click', function(event) {
		event.preventDefault();
		var direction = $(this).data("slide");
		slider.changeSlideIndex(direction);
	});

	// change slide when click the index button
	var $sliderIndicators = $('.slider-indicator-item');
	$sliderIndicators.on('click', function(event) {
		var index = $(this).data("slideTo");	
		slider.goToSlideIndex(index);
	});

	
	var timmer = null;
	var $slide = $('#JsSliderImage');

	// clear timmer when mouse over slide
	$slide.on('mouseover', function() {
		clearInterval(timmer);
	});

	// auto change slide each 3s
	$slide.on('mouseout', function() {
		timmer = setInterval(function() {
			slider.autoChangeSlide();
		}, 3000);
	});
});
