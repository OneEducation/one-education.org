function openShopify(n){window.location.href="http://one-education.myshopify.com/cart/4991191427:"+n}$(document).ready(function(){function n(){window.innerWidth<=992?$("#cart-form-input").data("open")?$("#cart-form-input").css("display","inline-flex"):($("#cart-form-input").css("display","none"),$(".reserve-title").css("display","block")):($("#cart-form-input").data("open",!1),$("#cart-form-input").css("display","none"),$("#cart-form-input").css("display","inline-flex"),$(".reserve-title").css("display","block"))}$(".reserve-title").on("click",function(){window.innerWidth<=992&&($(this).fadeOut(),$(this).slideUp(function(){$("#cart-form-input").data("open",!0),$("#cart-form-input").slideDown()}))}),$(window).on("resize",function(){n()}),n()});