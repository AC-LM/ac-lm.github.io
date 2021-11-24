/*
	Future Imperfect by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

    if(window.location.pathname === '/404.html'){
	   query = window.location.search.substr(1)
	   if(query){
	       searchKey = query.replace('query=', '')
	       // $('#404').text(decodeURI(searchKey));
	       $('#404').text('搜索结果')
	       $.get('/index.xml', function(data){
	           items = data.getElementsByTagName("item");
	           var i = 0;
	           var node = ''
	           while ( i < items.length) {
	               txt = items[i].getElementsByTagName("title")[0].innerHTML + items[i].getElementsByTagName("description")[0].innerHTML;
	               if((txt.indexOf(searchKey)) > -1){
	                  var title = items[i].getElementsByTagName("title")[0].innerHTML;
	                  console.log(items[i].getElementsByTagName("description")[0].innerHTML);
	                  var link = items[i].getElementsByTagName("link")[0].innerHTML;
	                  node = node + '<p><a href="' + link + '">' + title + '</a></p>'
	               };
	               i++;
	           }
	           div = document.createElement("div")
	           div.innerHTML = node;
	           $('#404content').append(div)
	       });
	   }
    }


	var	$window = $(window),
		$body = $('body'),
		$menu = $('#menu'),
		$sidebar = $('#sidebar'),
		$main = $('#main');

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

	// Menu.
		$menu
			.appendTo($body)
			.panel({
				delay: 500,
				hideOnClick: true,
				hideOnSwipe: true,
				resetScroll: true,
				resetForms: true,
				side: 'right',
				target: $body,
				visibleClass: 'is-menu-visible'
			});

	// Search (header).
		var $search = $('#search'),
			$search_input = $search.find('input');

		$body
			.on('click', '[href="#search"]', function(event) {

				event.preventDefault();

				// Not visible?
					if (!$search.hasClass('visible')) {

						// Reset form.
							$search[0].reset();

						// Show.
							$search.addClass('visible');

						// Focus input.
							$search_input.focus();

					}

			});

		$search_input
			.on('keydown', function(event) {

				if (event.keyCode == 27){
				    // 27 Esc
				    $search_input.blur();
				}

			})
			.on('blur', function() {
				window.setTimeout(function() {
					$search.removeClass('visible');
				}, 100);
			});

	// Intro.
		var $intro = $('#intro');

		// Move to main on <=large, back to sidebar on >large.
			breakpoints.on('<=large', function() {
				$intro.prependTo($main);
			});

			breakpoints.on('>large', function() {
				$intro.prependTo($sidebar);
			});

})(jQuery);