var slider = {
	currentSliderIndex: 0,

	getCurrentSlideIndex: function() {
		return slider.currentSliderIndex;
	},

	showSlide: function() {
		var sliderItems = document.getElementsByClassName('slider-item');
		var sliderIndicators = document.getElementsByClassName('slider-indicator-item');
		var numberOfSliderItem = sliderItems.length;
		for (var i = 0; i < numberOfSliderItem; i++) {
			sliderItems[i].classList.add('d-none');
			sliderItems[i].classList.remove('d-block');
			sliderIndicators[i].classList.remove('active');
		}
		if (slider.currentSliderIndex >= numberOfSliderItem)
			slider.currentSliderIndex = 0;
		if (slider.currentSliderIndex < 0)
			slider.currentSliderIndex = numberOfSliderItem -1;
		sliderItems[slider.currentSliderIndex].classList.add('d-block');
		sliderItems[slider.currentSliderIndex].classList.remove('d-none');
		sliderIndicators[slider.currentSliderIndex].classList.add('active');
	},

	changeSlideIndex: function(sliderControl) {
		var direction = sliderControl.dataset.slide;
		if (direction === "prev") {
			slider.currentSliderIndex--;
		} else if (direction === "next") {
			slider.currentSliderIndex++;
		}
		slider.showSlide();
		
	},

	goToSlideIndex: function(index) {
		slider.currentSliderIndex = index;
		slider.showSlide();
	},

	autoChangeSlide: function() {
		slider.currentSliderIndex++;
		slider.showSlide();
	}
};