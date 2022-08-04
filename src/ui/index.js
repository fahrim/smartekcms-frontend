'use strict';

require('popper.js');

require('bootstrap');

require('@coreui/coreui');

$(function () {
	// spinner buttons
	$('.btn-spinner').on('click', function (e) {
		if (!(e.shiftKey || e.ctrlKey || e.metaKey)) {
			$(this).css({ 'pointer-events': 'none' });
			$(this).find('i').removeClass().addClass('fa fa-spinner');
		}
	});

	// dropdown Menu
	$('.dropdown-toggle').on('click', function () {
		$(this).parent().toggleClass('open');
	});
	$('.dropdown-item').on('click', function () {
		$(this).closest('.open').removeClass('open');
	});
	$('.dropdown-menu').on('mouseleave', function () {
		$(this).parent('.dropdown').removeClass('open');
	});

	// remove empty nav titles when no children there
	$('.nav-title').filter(function () {
		if (!($(this).next().hasClass('nav-item') || $(this).next().hasClass('nav-dropdown'))) {
			return true; //smarteknoloji fixed.06062021
		}
		//If there is only nav-item for version under nav-title, hide
		if ($(this).next().filter('.nav-item').length === 1 && $(this).next().filter('.cms-version').length === 1) {
			return true;
		}
	}).hide();
});

//coreui sidebar modify
require('./custom/reformat-sidebar');