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


	init();
});
