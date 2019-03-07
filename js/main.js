$(document).ready(function(){
    $(".navigation-list li a, a.button").on("click", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1000);
        if ($(this).hasClass('menu-li-active')) {
            $('.menu-holder').toggleClass('menu-btn_active');
            $('.navigation-list__list-item a').removeClass('menu-li-active');
            $('.navigation-holder').toggle('visible');
        }
    });
});
$('.logo-title').click(function() {
    $('html, body').animate({scrollTop: 0},500);
    return false;
});
$('.menu-holder').on('click', function (e) {
    e.preventDefault();
    $(this).toggleClass('menu-btn_active');
    $('.navigation-list__list-item a').addClass('menu-li-active');
    $('.navigation-holder').toggle('visible');
});

$('#feedback').validate({
    submitHandler: function (){
        var data = $('#feedback').serialize();

        $.ajax({
            type: "POST",
            url: "send.php",
            data: data,
            dataType: 'json',
            success: function(data) {
                $('#message').html(data).fadeToggle("slow","linear", function () {
                    setTimeout(function () {
                        $('#message').fadeToggle("slow", "linear");
                    },3000);
                });
                $('#feedback')[0].reset();
                $('#name').removeClass('valid');
                $('#msg').removeClass('valid');
                $('#phone').removeClass('valid');
            },
            error: function () {
                $('#message').html("Произошла ошибка. Попробуйте ещё раз.").fadeToggle("fast","linear", function () {
                    setTimeout(function () {
                        $('#message').fadeToggle("slow", "linear");
                    },3000);
                });
            },
        })

    },

    rules: {
        name: {
            required: true,
            minlength: 2,
            maxlength: 50
        },
        phone: {
            required:true,
        },
        msg: {
            required: true,
        }
    },
    messages: {
        name: {
            required: "Введите имя!",
            minlength: "Поле \"Имя\" должно содержать больше 2 символов.",
            maxlength: "Поле \"Имя\" не может быть больше 50 символов.",
        },
        phone: {
            required: "Введите телефон!",
        },
        msg: {
            required: 'Введите сообщение!'
        }
    },

});