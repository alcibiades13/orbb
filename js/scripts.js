/*=============================================
=            Main JS functionality            =
=============================================*/


$(document).ready(function () {

	// initializing...
	function init() {

		accordion();
		progressBar();
		prettyPrint();
		copyMarkup();
		slider();
		expandSlider();
		showModal();
		changeCodeTheme();
		equalPriceWidth();
	}


	// accordion tabbing
	function accordion() {

		var $accordion = $('.accordion');
		 $accordion.find('a').on('click', function(e) {
		 	e.preventDefault();
			var accId = $(this).parent().index();
			$(this).parent().addClass('active').siblings().removeClass('active');
			$accordionP = $accordion.find('p').eq(accId);
			$accordionP.css('display', 'block');
			$accordionP.siblings().css('display', 'none');
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
		if($('.slider-next').parent().hasClass('slider-play')) {

			var sliderInt;

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



	// theme functions

	// copy markup
	function copyMarkup() {
		$('.copy').on('click', function(e) {
			e.preventDefault();
			var markup = $(this).parent().parent().parent().parent().find('.demo').html();
			clipboard.copy({
				'text/plain': markup
			});
			console.log(markup);
		});
	}

	// change code theme
	function changeCodeTheme() {
		$('.theme-light').on('click', function (e){
			e.preventDefault();
   			$('link[href="css/themes/tomorrow-night.css"]').attr('href','css/themes/custom.css');
   			$('.change-theme-circle').animate({
   				'right': '54px',
   				'opacity': '1'
   			}, 400);
		});

		$('.theme-dark').click(function (e){
			e.preventDefault();
		   $('link[href="css/themes/custom.css"]').attr('href','css/themes/tomorrow-night.css');
   			$('.change-theme-circle').animate({
   				'right': '4px',
   				'opacity': '0.3'
   			}, 400);
		});
	}


	// expand slider minimum height on resize, otherwise it will be zero
	$(window).resize(expandSlider);
	init();
});
