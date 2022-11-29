$(document).ready(function () {

    let $btns = $('.button-group button');

    $btns.click(function (e) {

        $('.button-group button').removeClass('active');
        e.target.classList.add('active');

        let selector = $(e.target).attr('data-filter');
        $('.grid').isotope({
            filter: selector
        });

        return false;
    })

    $('.button-group #btn1').trigger('click');

    $('.grid .test-popup-link').magnificPopup({
        type: 'image',
        gallery: { enabled: true }
    });

});