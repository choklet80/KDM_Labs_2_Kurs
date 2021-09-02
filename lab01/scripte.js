$('.on').click(function () {
    if ($('.lol').hasClass('lol_on')) {
        return
    }
    $('.lol').removeClass('lol_off')
    $('.lol').addClass('lol_on')
})

$('.off').click(function () {
    if ($('.lol').hasClass('lol_off')) {
        return
    }
    $('.lol').removeClass('lol_on')
    $('.lol').addClass('lol_off')
})