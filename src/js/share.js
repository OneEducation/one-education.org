$(document).ready(function(){
	$('a.share').on('click', function(event) {
		var link = $(this).attr('href');
        var px = Math.floor(((screen.availWidth || 1024) - 500) / 2),
            py = Math.floor(((screen.availHeight || 700) - 500) / 2);
		var popup = window.open(link, 'social',
					'width=500,height=500,left=' + px + 'top=' + py +
					',location=0, menubar=0,toolbar=0,status=0,scrollbars=1,resizable=1');
		if(popup) {
			popup.focus();
			event.preventDefault();
		}
	});
});
