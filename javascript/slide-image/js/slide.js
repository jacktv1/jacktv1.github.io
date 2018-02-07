var slider = {
	currentSliderIndex: 0,
	/**
	* This below method is show slide selected and hide other
	*/
	showSlide() {
		var sliderItems = document.getElementsByClassName('slider-item');
		var sliderIndicators = document.getElementsByClassName('slider-indicator-item');
		var numberOfSliderItem = sliderItems.length;

		for (var i = 0; i < numberOfSliderItem; i++) {
			sliderItems[i].classList.add('d-none');
			sliderItems[i].classList.remove('d-block');
			sliderIndicators[i].classList.remove('active');
		}

		if (slider.currentSliderIndex >= numberOfSliderItem) {
			slider.currentSliderIndex = 0;
		}

		if (slider.currentSliderIndex < 0) {
			slider.currentSliderIndex = numberOfSliderItem -1;
		}

		sliderItems[slider.currentSliderIndex].classList.add('d-block');
		sliderItems[slider.currentSliderIndex].classList.remove('d-none');
		sliderIndicators[slider.currentSliderIndex].classList.add('active');
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