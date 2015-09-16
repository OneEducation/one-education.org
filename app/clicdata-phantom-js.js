var page = require('webpage').create(),
	fs = require('fs');

page.open('https://xo.clicdata.com/v/ezaGSsfLXHoP', function() {
	setTimeout(function() {
		var values = page.evaluate(function() {
			return JSON.stringify({
                        documents: document.querySelector('body').innerHTML
/*				xos_online: document.getElementsByClassName('mainText')[0].innerHTML,
				hours_used: document.getElementsByClassName('mainText')[1].innerHTML,
				xos_shipped: document.getElementsByClassName('mainText')[2].innerHTML,
				schools: document.getElementsByClassName('mainText')[3].innerHTML,
*/			});
		});
		fs.write('data.json', values, 'w');
                console.log(values);
		phantom.exit();
	}, 35000);
});
