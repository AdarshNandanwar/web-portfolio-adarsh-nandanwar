particlesJS.load('particles-js', 'particlesjs-config.json', function () {
    console.log('particles.json loaded...do your thing!');
});

$(window).scroll(function() {
    if ($(document).scrollTop() > $("#landing").outerHeight()-$("nav").outerHeight()) {
        $('#nav-name').css('display', 'inline-block');
        $('#nav-name').css('color', 'rgba(0,0,0,0.9)');
        $('nav').css('background', 'rgba(255,255,255,0.8)');
        $('.nav-item.nav-link').css('color', 'rgba(0,0,0,0.9)');
    } else {
        $('#nav-name').css('color', 'rgba(0,0,0,0)');
        $('nav').css('background', 'rgba(255,255,255,0.8)');
        $('.nav-item.nav-link').css('color', 'rgba(0,0,0,0.9)');
    }

    if ($(document).scrollTop() > 100) {
        $('nav').removeClass('expand');
    } else {
        $('#nav-name').css('display', 'none');
        $('nav').addClass('expand');
    }

    if (($(document).scrollTop()+$(window).height()) > $("#landing").outerHeight()){
        $("#aboutContent").fadeTo(1800, 1);
    }
    if (($(document).scrollTop()+$(window).height()) > ($("#landing").outerHeight()+$("#about").outerHeight())){
        $("#skillsContent").fadeTo(1800, 1);
    }
    if (($(document).scrollTop()+$(window).height()) > ($("#landing").outerHeight()+$("#about").outerHeight()+$("#skills").outerHeight())){
        $("#projectsContent").fadeTo(1800, 1);
    }
    if (($(document).scrollTop()+$(window).height()) > ($("#landing").outerHeight()+$("#about").outerHeight()+$("#skills").outerHeight()+$("#projects").outerHeight())){
        $("#contactContent").fadeTo(1800, 1);
    }
});
$('.navbar-nav>a').on('click', function(){
    $('.navbar-collapse').collapse('hide');
});

$( document ).ready(function() {
    $("#home").fadeTo(1800, 1);
});