$(document).ready(function(){

	$('[data-fancybox]').fancybox({
		touch: false,
		autoFocus: false,
		backFocus: false
	});

	$(".masked").inputmask({
		mask: '+7 (999) 999-99-99',
		showMaskOnHover: false
	});

	$('.js-validate').validate({
		rules: {
			name: {required: true},
			phone: {required: true}
		}
	});

	function scroll() {
		$(".js-scroll").on("click", function (event) {
			event.preventDefault();
			var id  = $(this).attr('href'),
			top = $(id).offset().top - 30;
			$('html, body').animate({
				scrollTop: top
			}, 1500);
		});
	}

	scroll();

	// отступ для шапки
	function topPromo(){
		var top = $('.header').height(),
				promo = $('.promo');

		promo.css('top', top);
	}
	topPromo();

	// добавление тени для шапки
	$(window).scroll(function () {
		if ($(this).scrollTop() > 0) {
			$('.header').addClass('shadow');
		} else {
			$('.header').removeClass('shadow');
		}
	});

});