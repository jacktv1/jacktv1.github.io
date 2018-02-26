var slider = {
	currentSliderIndex: 0,

	/**
	* This below method is show slide selected and hide other
	*/

	showSlide() {

		var $sliderItems = $('.slider-item');
		var $sliderIndicators = $('.slider-indicator-item');
		var numberOfSliderItem = $sliderItems.length;
	
		$sliderItems.fadeOut(400);
		$sliderIndicators.removeClass('active');
		
		if (slider.currentSliderIndex >= numberOfSliderItem) {
			slider.currentSliderIndex = 0;
		}

		if (slider.currentSliderIndex < 0) {
			slider.currentSliderIndex = numberOfSliderItem -1;
		}
		
		$sliderItems.eq(slider.currentSliderIndex).fadeIn(400);
		$sliderIndicators.eq(slider.currentSliderIndex).addClass('active');
	},

	/**
	* This below method is select and show next or previous silde
	* @param {string} direction
	*/

	changeSlideIndex(direction) {

		if (direction === "prev") {
			slider.currentSliderIndex--;
		} else if (direction === "next") {
			slider.currentSliderIndex++;
		}
		slider.showSlide();
		
	},

	/**
	* This below method is select slide by index
	* @param {int} index
	*/

	goToSlideIndex(index) {

		slider.currentSliderIndex = index;
		slider.showSlide();
	},

	/**
	* This below method is auto change to the next slide
	* @param {int} index
	*/
	
	autoChangeSlide() {
		slider.currentSliderIndex++;
		slider.showSlide();
	}
};