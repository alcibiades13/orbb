/*=============================================
=            Main JS functionality            =
=============================================*/


$(document).ready(function () {

	// initializing...
	function init() {

		tabs();
		progressBar();
		slider();
		expandSlider();
		showModal();
		equalPriceWidth();
	}


	// tabs
	function tabs() {

		var $tabs = $('.tabs');
		 $tabs.find('a').on('click', function(e) {
		 	e.preventDefault();
			var tabId = $(this).parent().index();
			$(this).parent().addClass('active').siblings().removeClass('active');
			$tabsP = $tabs.find('p').eq(tabId);
			$tabsP.css('display', 'block');
			$tabsP.siblings().css('display', 'none');
		});

	}

	// getting progress value from HTML
	function progressBar() {

		var $progress = $('div.progress');
		var progressWidth = $progress.data( "progressValue" );
		$progress.css('width', progressWidth + '%');
	}

	function animProgress(e) {

		e.preventDefault();
		var $progress = $('.progress-anim');
		var progressWidth = $progress.data( "progressValue" );
		$progress.animate({
			'width': progressWidth+ '%'
		},1000);

	}

	// animate progress
	$('.anim-progress').on('click', animProgress);


	// slider
	function slider() {
		$('.slider-next').on('click', function (e) {
			e.preventDefault();

			// slide container
			$slider = $(this).parent();
			var numOfSlides = $slider.find('.slide').length;

			// index of active and next slide
			var curIndex = $slider.find('.active').index(),
				nextIndex;

			$slider.find('.active').removeClass('active');

			// set the next active slide
			if(curIndex >= numOfSlides - 1) {
				nextIndex = 0;
			}
			else {
				nextIndex = curIndex + 1;
			}

			$slider.find('.slide').eq(nextIndex).css(
				{
					'visibility': 'visible',
					'opacity': 1
				}).siblings().css(
				{
					'visibility': 'hidden',
					'opacity': 0
				}
			);
			$slider.find('.slide').eq(nextIndex).addClass('active');

		});

		$('.slider-prev').on('click', function (e) {
			e.preventDefault();

			// slide container
			$slider = $(this).parent();
			var numOfSlides = $slider.find('.slide').length;

			// index of active and prev slide
			var curIndex = $slider.find('.active').index(),
				prevIndex;

			$slider.find('.active').removeClass('active');

			// get image height to expand the slider height
			var imgHeight = $slider.find('.slide img').height();
			console.log(imgHeight);

			$slider.css({
				'min-height': imgHeight
			});

			// set the prev active slide
			if(curIndex === 0) {
				prevIndex = numOfSlides - 1;
			}
			else {
				prevIndex = curIndex - 1;
			}

			$slider.find('.slide').eq(prevIndex).css(
				{
					'visibility': 'visible',
					'opacity': 1
				}).siblings().css(
				{
					'visibility': 'hidden',
					'opacity': 0
				}
			);
			$slider.find('.slide').eq(prevIndex).addClass('active');

		});

		/* autoplay slider
		* clear interval on mouseenter
		* reset on mouseleave
		*/
		sliderInt = setInterval( sliderInterval, 5000);

		$('.slider-play').on({
		    mouseenter: function() {
		        clearInterval( sliderInt );
		    },
		    mouseleave: function() {
		        sliderInt = setInterval( sliderInterval, 5000 );
		    }
		});

		function sliderInterval(){
			$('.slider-play .slider-next').trigger('click');
		}

	} // slider


	// Modal window
	function showModal() {
		$('.modal-show').on('click', function () {
			$("body").addClass('modal-open');
		});

		$('.modal-hide').on('click', function () {
			$("body").removeClass('modal-open');
		});
		$(".modal-outside").on('click', function () {
			$("body").removeClass('modal-open');
		});
	}


	// expand slider
	function expandSlider() {

		// get image height to expand the slider height
		var imgHeight = $('.slider').find('.slide img').height();
		$('.slider').css({
			'min-height': imgHeight
		}).find('.slide').css('min-height', imgHeight);

	}

	function equalPriceWidth() {
		var $pricingTableSingle = $('.activity');
		var numOfPrices = $pricingTableSingle.length;
		priceWdith = (100 / numOfPrices) - 1;
		$pricingTableSingle.css('width', priceWdith + '%')
	}


	// expand slider minimum height on resize, otherwise it will be zero
	$(window).resize(expandSlider);


	init();
});
