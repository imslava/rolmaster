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

	function scroll() {
		$(".js-scroll").on("click", function (event) {
			event.preventDefault();
			var id  = $(this).attr('href'),
			top = $(id).offset().top - 150;
			$('html, body').animate({
				scrollTop: top
			}, 1500);
		});
	}

	scroll();

	// добавление тени для шапки
	$(window).scroll(function () {
		if ($(this).scrollTop() > 0) {
			$('.header').addClass('shadow');
		} else {
			$('.header').removeClass('shadow');
		}
	});

	// сертификаты
	// $(".certificates-tabs li").click(function (){
	//   var $this = $(this),
	//       id    = $this.data("tab");	

	//   $(".certificates-tabs li").removeClass("active");
	// 	$(".certificates-tabs li[data-tab=" + id + "]").addClass("active");

	// 	$('.certificates-tab').removeClass("active").hide();
	// 	$('.certificates-tab[data-tab=' + id + ']').addClass("active").fadeIn();

	// });

	// тех документация
	// $(".documentation-tabs li").click(function (){
	//   var $this = $(this),
	//       id    = $this.data("tab");	

	//   $(".documentation-tabs li").removeClass("active");
	// 	$(".documentation-tabs li[data-tab=" + id + "]").addClass("active");

	// 	$('.documentation-tab').removeClass("active").hide();
	// 	$('.documentation-tab[data-tab=' + id + ']').addClass("active").fadeIn();

	// });

	// всплывашки с вызовом инженера
	$("[data-src='#popup-engineer']").fancybox({
		touch: false,
		autoFocus: false,
	  beforeLoad: function(instance, slide) {
	    var title = slide.opts.$orig.data('title');
	    var btn = slide.opts.$orig.data('btn');
	    $('#popup-engineer h3 b').html(title);
	    $('#popup-engineer button').html(btn);
	  }
	});

	// выбор даты
	$('[data-toggle="datepicker"]').datepicker({
    autoHide: true,
		autoPick: true,
		inline: true,
		container: '.form-calendar',
		startDate: 'today',
    language: 'ru-RU'
	});
	
	$('[data-toggle="datepicker2"]').datepicker({
    autoHide: true,
		autoPick: true,
		inline: true,
		container: '.form-calendar2',
		startDate: 'today',
    language: 'ru-RU'
  });

	$('.form-date').hide();
	$('.form-date2').hide();

	$('.js-open-date').click(function(){
		$('.form-date').fadeIn();
	});
	$('.js-close-date').click(function(){
		$('.form-date').fadeOut();
	});

	$('.js-open-date2').click(function(){
		$('.form-date2').fadeIn();
	});
	$('.js-close-date2').click(function(){
		$('.form-date2').fadeOut();
	});

	// валидация форм
	$('.js-form').submit(function () {
		return false;
	});
	
	$('.js-form').each(function () {
		$(this).validate({
			rules: {
				name: {
					required: true
				},
				phone: {
					required: true
				},
				email: {
					required: true
				},
				city: {
					required: true
				}
			},
			submitHandler: function (form) {
				submitForm(form);
			}
		});
	});
	
	function submitForm(form) {
	
		// var pdf = $(form.pdf).serialize(); 
		var url = window.location.origin + '/php/send.php';
	
		$.ajax({
			type: "POST",
			url: url,
			data: $(form).serialize()
			// success: function (data) {
			//   console.log('ok');
			// }
		});
		$.fancybox.close();
		$('.js-form input[name="name"], .js-form input[name="phone"], .js-form input[name="email"], .js-form input[name="date"], .js-form input[name="city"]').val('');

		$.fancybox.open($("#thanks-popup"), { touch: false });
	
		// if(!pdf){
		// 	$.fancybox.open($("#thanks-popup"), { touch: false });
		// }else{
		// 	$.fancybox.open($("#pdf-popup"), { touch: false });
		// 	setTimeout('location="'+ decodeURIComponent(pdf.slice(4)) +'";', 3000);
		// }
	
		return false;
	}

	// загрузка файла
	$(function() {
		var btnTitle = $(".form-file p").html();
		var btnTitleHtml = $.parseHTML(btnTitle);
		$(".form-file input:file").change(function (){
			 console.log("im clicked" + this.files.length);
			 if( this.files && this.files.length >= 1 ) {
					var file = this.files[0];
						 var reader = new FileReader();
						 reader.onload = function (e) {
								$(".form-file p").text(file.name).addClass('upload');
						 }
						 reader.readAsDataURL(file);
			 }
			 else {
					$(".form-file p").html(btnTitle).removeClass('upload');
			 }
				 
		 });   
	});
	
	// меню мобильное
	$('.header-burger').click(function(){
		$('.header-menu').fadeToggle(300);
	});

	// соберем заказ
	$(".order-tabs li").click(function (){
	  var $this = $(this),
	      id    = $this.data("tab");	

	  $(".order-tabs li").removeClass("active");
		$(".order-tabs li[data-tab=" + id + "]").addClass("active");

		$('.order-tab').removeClass("active").hide();
		$('.order-tab[data-tab=' + id + ']').addClass("active").fadeIn();

	});

	// рольставни для дома
	$(".forhome-tabs li").click(function (){
	  var $this = $(this),
	      id    = $this.data("tab");	

	  $(".forhome-tabs li").removeClass("active");
		$(".forhome-tabs li[data-tab=" + id + "]").addClass("active");

		$('.forhome-tab').removeClass("active").hide();
		$('.forhome-tab[data-tab=' + id + ']').addClass("active").fadeIn();

	});

	// производство
	$(".production-tabs li").click(function (){
	  var $this = $(this),
	      id    = $this.data("tab");	

	  $(".production-tabs li").removeClass("active");
		$(".production-tabs li[data-tab=" + id + "]").addClass("active");

		$('.production-tab').removeClass("active").hide();
		$('.production-tab[data-tab=' + id + ']').addClass("active").fadeIn();

	});

});