/*
	Landed by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch mode.
		if (browser.mobile)
			$body.addClass('is-touch');

	// Smooth in-page links.
		function scrollToHash(hash, speed) {

			var $target, offset, scrollTop;

			if (!hash || hash.charAt(0) !== '#' || hash.length < 2 || hash === '#navPanel')
				return false;

			$target = $(hash);

			if (!$target.length)
				return false;

			offset = $('#titleBar:visible').outerHeight() || $('#header:visible').outerHeight() || 0;
			scrollTop = hash === '#banner' ? 0 : Math.max($target.offset().top - offset, 0);

			$('html, body')
				.stop()
				.animate({ scrollTop: scrollTop }, speed || 1000, 'swing');

			if (history.pushState)
				history.pushState(null, '', hash);

			return true;

		}

		$body.on('click', '#nav a[href^="#"], #navPanel a[href^="#"], a.scrolly[href^="#"]', function(event) {

			var hash = $(this).attr('href'),
				$panel = $('#navPanel');

			if (scrollToHash(hash, 1000)) {
				event.preventDefault();

				if ($panel.length && $panel._hide)
					$panel._hide();
			}

		});

	// Nav.

		// Title Bar.
			$(
				'<div id="titleBar">' +
					'<a href="#navPanel" class="toggle"></a>' +
					'<span class="title">' + $('#logo').html() + '</span>' +
				'</div>'
			)
				.appendTo($body);

		// Panel.
			$(
				'<div id="navPanel">' +
					'<nav>' +
						$('#nav').navList() +
					'</nav>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: false,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left',
					target: $body,
					visibleClass: 'navPanel-visible'
				});

	// Parallax.
	// Disabled on IE (choppy scrolling) and mobile platforms (poor performance).
		if (browser.name == 'ie'
		||	browser.mobile) {

			$.fn._parallax = function() {

				return $(this);

			};

		}
		else {

			$.fn._parallax = function() {

				$(this).each(function() {

					var $this = $(this),
						on, off;

					on = function() {

						$this
							.css('background-position', 'center 0px');

						$window
							.on('scroll._parallax', function() {

								var pos = parseInt($window.scrollTop()) - parseInt($this.position().top);

								$this.css('background-position', 'center ' + (pos * -0.15) + 'px');

							});

					};

					off = function() {

						$this
							.css('background-position', '');

						$window
							.off('scroll._parallax');

					};

					breakpoints.on('<=medium', off);
					breakpoints.on('>medium', on);

				});

				return $(this);

			};

			$window
				.on('load resize', function() {
					$window.trigger('scroll');
				});

		}

	// Spotlights.
		var $spotlights = $('.spotlight');

		$spotlights
			._parallax()
			.each(function() {

					var $this = $(this),
						on, off, setBackground;

					on = function() {

						var top, bottom, mode;

					// Use the browser-selected image source as this spotlight's background on demand.
						setBackground = function() {

							var image, source;

							if ($this.data('background-loaded'))
								return;

							image = $this.find('.image.main picture img, .image.main > img').get(0);
							source = image ? (image.currentSrc || image.getAttribute('src')) : null;

							if (!source)
								return;

							$this
								.css('background-image', 'url("' + source + '")')
								.data('background-loaded', true);

						};

					// Side-specific scrollex tweaks.
						if ($this.hasClass('top')) {

							mode = 'top';
							top = '-20%';
							bottom = 0;

						}
						else if ($this.hasClass('bottom')) {

							mode = 'bottom-only';
							top = 0;
							bottom = '20%';

						}
						else {

							mode = 'middle';
							top = 0;
							bottom = 0;

						}

						setBackground();

					// Add scrollex.
						$this.scrollex({
							mode:		mode,
							top:		top,
							bottom:		bottom,
							initialize:	function(t) { $this.addClass('inactive'); },
							terminate:	function(t) { $this.removeClass('inactive'); },
							enter:		function(t) {
								setBackground();
								$this.removeClass('inactive');
							},

							// Uncomment the line below to "rewind" when this spotlight scrolls out of view.

							//leave:	function(t) { $this.addClass('inactive'); },

						});

				};

				off = function() {

					// Clear spotlight's background.
						$this
							.css('background-image', '')
							.data('background-loaded', false);

					// Remove scrollex.
						$this.unscrollex();

				};

				breakpoints.on('<=medium', off);
				breakpoints.on('>medium', on);

			});

	// Wrappers.
		var $wrappers = $('.wrapper');

		$wrappers
			.each(function() {

				var $this = $(this),
					on, off;

				on = function() {

					$this.scrollex({
						top:		250,
						bottom:		0,
						initialize:	function(t) { $this.addClass('inactive'); },
						terminate:	function(t) { $this.removeClass('inactive'); },
						enter:		function(t) { $this.removeClass('inactive'); },

						// Uncomment the line below to "rewind" when this wrapper scrolls out of view.

						//leave:	function(t) { $this.addClass('inactive'); },

					});

				};

				off = function() {
					$this.unscrollex();
				};

				breakpoints.on('<=medium', off);
				breakpoints.on('>medium', on);

			});

	// Banner.
		var $banner = $('#banner');

		$banner
			._parallax();

	// Testimonials carousel.
		Array.prototype.forEach.call(document.querySelectorAll('[data-carousel]'), function(carousel) {

			var frame = carousel.querySelector('[data-carousel-frame]'),
				slides = carousel.querySelectorAll('.mySlides'),
				dots = carousel.parentNode.querySelectorAll('[data-slide-to]'),
				index = 0,
				touchStartX = 0,
				touchStartY = 0,
				ignoreClick = false;

			if (!slides.length)
				return;

			carousel.setAttribute('tabindex', '0');

			function showSlide(nextIndex) {

				index = (nextIndex + slides.length) % slides.length;

				Array.prototype.forEach.call(slides, function(slide, slideIndex) {
					var active = slideIndex === index;

					slide.classList.toggle('active', active);
					slide.setAttribute('aria-hidden', active ? 'false' : 'true');
				});

				Array.prototype.forEach.call(dots, function(dot, dotIndex) {
					dot.classList.toggle('active', dotIndex === index);
					dot.setAttribute('aria-pressed', dotIndex === index ? 'true' : 'false');
				});

			}

			function moveSlide(direction) {
				showSlide(index + direction);
			}

			Array.prototype.forEach.call(carousel.querySelectorAll('[data-slide-direction]'), function(button) {
				button.addEventListener('click', function(event) {
					event.stopPropagation();
					moveSlide(parseInt(button.getAttribute('data-slide-direction'), 10));
				});
			});

			Array.prototype.forEach.call(dots, function(dot) {
				dot.addEventListener('click', function() {
					showSlide(parseInt(dot.getAttribute('data-slide-to'), 10));
				});
			});

			if (frame) {

				frame.addEventListener('click', function(event) {
					var bounds;

					if (ignoreClick || event.target.closest('button, a'))
						return;

					bounds = frame.getBoundingClientRect();
					moveSlide(event.clientX < bounds.left + (bounds.width / 2) ? -1 : 1);
				});

				frame.addEventListener('touchstart', function(event) {
					touchStartX = event.changedTouches[0].screenX;
					touchStartY = event.changedTouches[0].screenY;
				}, { passive: true });

				frame.addEventListener('touchend', function(event) {
					var dx = event.changedTouches[0].screenX - touchStartX,
						dy = event.changedTouches[0].screenY - touchStartY;

					if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
						moveSlide(dx < 0 ? 1 : -1);
						ignoreClick = true;
						window.setTimeout(function() {
							ignoreClick = false;
						}, 300);
					}
				}, { passive: true });

			}

			carousel.addEventListener('keydown', function(event) {
				if (event.key === 'ArrowLeft') {
					event.preventDefault();
					moveSlide(-1);
				}
				else if (event.key === 'ArrowRight') {
					event.preventDefault();
					moveSlide(1);
				}
			});

			showSlide(0);

		});

})(jQuery);
