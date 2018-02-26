var Slider = (function() {
	var _beforeSliderIndex = 0;
	var _currentSliderIndex = 0;

	/**
	* This below method is show slide selected and hide other
	*/

	var _showSlide = function() {
		var sliderItems = document.getElementsByClassName('slider-item');
		var sliderIndicators = document.getElementsByClassName('slider-indicator-item');
		var sliderThumbnail = document.getElementsByClassName('slide-thumbnail-item');
		var numberOfSliderItem = sliderItems.length;

		for (var i = 0; i < numberOfSliderItem; i++) {
			sliderItems[i].classList.remove('slide-in');
			sliderItems[i].classList.remove('slide-out');
			sliderItems[i].style.zIndex = -1;

			sliderThumbnail[i].classList.remove('active');
			sliderIndicators[i].classList.remove('active');
		}

		if (_currentSliderIndex >= numberOfSliderItem) {
			_currentSliderIndex = 0;
		}

		if (_currentSliderIndex < 0) {
			_currentSliderIndex = numberOfSliderItem -1;
		}

		sliderItems[_beforeSliderIndex].classList.add('slide-out');
		sliderItems[_beforeSliderIndex].style.zIndex = 1;

		sliderItems[_currentSliderIndex].style.zIndex = 2;
		sliderItems[_currentSliderIndex].classList.add('slide-in');
		sliderIndicators[_currentSliderIndex].classList.add('active');
		sliderThumbnail[_currentSliderIndex].classList.add('active');
	};

	/**
	* This below method is select and show next or previous silde
	* @param {string} direction
	*/

	return {
		changeSlideIndex: function(direction) {
			_beforeSliderIndex = _currentSliderIndex;
			if (direction === "prev") {
				_currentSliderIndex--;
			} else if (direction === "next") {
				_currentSliderIndex++;
			}
			_showSlide();

		},

		/**
		* This below method is select slide by index
		* @param {int} index
		*/

		goToSlideIndex: function(index) {
			_beforeSliderIndex = _currentSliderIndex;
			_currentSliderIndex = index;
			_showSlide();
		},

		/**
		* This below method is auto change to the next slide
		* @param {int} index
		*/

		autoChangeSlide: function() {
			_beforeSliderIndex = _currentSliderIndex;
			_currentSliderIndex++;
			_showSlide();
		}
	}
})();
