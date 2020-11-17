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

		promo.css('margin-top', top);
	}

	// добавление тени для шапки
	$(window).scroll(function () {
		if ($(this).scrollTop() > 0) {
			$('.header').addClass('shadow fixed');
			topPromo();
		} else {
			$('.header').removeClass('shadow fixed');
			$('.promo').css('margin-top', '0px');
		}
	});

	// карусель работ
	$(".portfolio-carousel__content").slick({
		arrows: false,
		fade: true,
		infinite: true,
		dots: true,
		appendDots: $('.portfolio-carousel__list'),
		customPaging: function(slick,index) {
			var title = slick.$slides.eq(index).find('.portfolio-carousel__item').data('title');
			return title;
		}
	});

	// сертификаты
	$(".certificates-tabs li").click(function (){
	  var $this = $(this),
	      id    = $this.data("tab");	

	  $(".certificates-tabs li").removeClass("active");
		$(".certificates-tabs li[data-tab=" + id + "]").addClass("active");

		$('.certificates-tab').removeClass("active").hide();
		$('.certificates-tab[data-tab=' + id + ']').addClass("active").fadeIn();

	});

	// тех документация
	$(".documentation-tabs li").click(function (){
	  var $this = $(this),
	      id    = $this.data("tab");	

	  $(".documentation-tabs li").removeClass("active");
		$(".documentation-tabs li[data-tab=" + id + "]").addClass("active");

		$('.documentation-tab').removeClass("active").hide();
		$('.documentation-tab[data-tab=' + id + ']').addClass("active").fadeIn();

	});

});