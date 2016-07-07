$(document).ready(function() {
	$('.nav-ls div').click(function(event) {
		var _index = $(this).index();
		$(this).addClass('active').siblings('div').removeClass('active');
		$('div.content').eq(_index).fadeIn().siblings('.content').fadeOut();		
	});
});