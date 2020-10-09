"use strict";

$(document).ready(function () {
  svg4everybody({});
  /* Открытие поиска при клике, очистка поиска и закрытия поиска по боди */

  var openSearchForm = function openSearchForm() {
    $(document).on('click', '.header__btn', function () {
      $(this).parent().toggleClass('search--active');
    });
    $(document).on('click', '.search__input', function () {
      $(this).parent().addClass('search__form--active');
    });
    $(document).on('click', '.search__clear', function () {
      $('.search__input').val('');
    });
    $("body").click(function (e) {
      if ($(e.target).closest(".search--active").length === 0 && $('.search--active').length) {
        $(".search").removeClass('search--active');
        $(".search__form").removeClass('search__form--active');
        $('.search__input').val('');
      }
    });
  };
  /* Селект (выпадашка) */


  var customSelect = function customSelect() {
    $(document).on('click', '.select__header', function () {
      var sel = $(this).parent();

      if (sel.hasClass('select--active')) {
        sel.removeClass('select--active');
      } else {
        $('.select').removeClass('select--active');
        sel.addClass('select--active');
      }
    });
    $(document).on('click', '.select__item', function () {
      var val = $(this).find('.select__value').text(),
          sel = $(this).closest('.select');
      sel.removeClass('select--active');
      sel.find('.select__current').text(val);
    });
    $("body").click(function (e) {
      if ($(e.target).closest(".select--active").length === 0 && $('.select--active').length) {
        $(".select").removeClass('select--active');
      }
    });
  };
  /* Слайдер */


  var sliderRow = function sliderRow() {
    $('.js-slider').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      infinite: false,
      prevArrow: '.slider__nav--prev',
      nextArrow: '.slider__nav--next',
      responsive: [{
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }, {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }]
    }).on('setPosition', function (event, slick) {
      slick.$slides.css('height', slick.$slideTrack.height() + 'px');
    });
  };

  openSearchForm();
  customSelect();
  sliderRow();
}); // Полифилы
// forEach IE 11

if ('NodeList' in window && !NodeList.prototype.forEach) {
  console.info('polyfill for IE11');

  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;

    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
} // closest IE 11


(function () {
  if (!Element.prototype.closest) {
    Element.prototype.closest = function (css) {
      var node = this;

      while (node) {
        if (node.matches(css)) return node;else node = node.parentElement;
      }

      return null;
    };
  }
})(); // matches IE 11


(function () {
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector;
  }
})(); //Array.form IE 11


if (!Array.from) {
  Array.from = function (object) {
    'use strict';

    return [].slice.call(object);
  };
}