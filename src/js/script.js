$(document).ready(function(){
    $('.carousel__inner ').slick({
        speed: 1200,
        // adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                dots: true,
                arrows: false
                }
            }
        ]
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });

    $('.catalog-item__link').each(function(i) {
        $(this).on('click', function(e) {
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        });
    });

    $('.catalog-item__back').each(function(i) {
        $(this).on('click', function(e) {
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        });
    });

    //modal

    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
    });
    // $('.button_mini').on('click', function() {
    //     $('.overlay, #order').fadeIn('slow');
    // });

    $('.button_mini').each(function(i){   //скрипт, позволяющий вытянуть название товара и вставить его в модальное окно
        $(this).on('click', function(){
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
    });


    // $('#consultation-form').validate();
    // $('#consultation form').validate({
    //     rules: {
    //         name: {
    //             required: true,
    //             minlength: 2
    //         },
    //         phone: "required",
    //         email: {
    //            required: true,
    //            email: true 
    //         }
    //     },
    //     messages: {
    //         name: {
    //             required: "Пожалуйста, введите свое имя",
    //             minlength: jQuery.validator.format("Введите {0} символа!")
    //           },
    //         phone: "Пожалуйста, введите свой номер телефона",
    //         email: {
    //           required: "Пожалуйста, введите свою почту",
    //           email: "Неправильно введен адрес почты"
    //         }
    //     }
    // });
    // $('#order form').validate();

    function validateForms(form){
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format("Введите {0} символа!")
                  },
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                  required: "Пожалуйста, введите свою почту",
                  email: "Неправильно введен адрес почты"
                }
            }
        });
    }

    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

    $('input[name=phone]').mask("+38(999)999-99-99");

	// ajax запрос для отправки данных с форм без перезагрузки + очистка полей
	$('form').submit(function(e) {
		e.preventDefault();

		if(!$(this).valid()) {    //условие, чтобы не отправлялась пустая форма
			return;
		} 
        $.ajax({
			type: "POST",
			url: "./mailer/smart.php",
			data: $(this).serialize()
		}).done(function() {
			$(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');


			$('form').trigger('reset');
		});
		return false;
	});
    
    //smooth scroll and pageup

    $(window).scroll(function(){
        if($(this).scrollTop()>1600) {  //если страница проскролена до значения 1600пикселей, то появляется кнопка
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    //скрипт именно для плавного скроллинга:
    $("a[href=#up]").click(function(){  //#up - конкретный идентификаторб если для всех ссылок с "#", то надо [href^='#']
        var _href = $(this).attr("href"); //в будущем поменять на лет или конст!
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });
});

 