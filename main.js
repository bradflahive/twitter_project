$(function() {

	var User = {
    	handle: '@bradflahive',
    	image: 'images/brad.jpg'
	};

	$('main').on('click', 'textarea', function() {
		$(this).parents('.compose').addClass('expand');
	});

	// $('textArea').click(function() {
	// 		$(this).parent('.compose').toggleClass('expand');
	// });

	$('main').on('click', '.tweet', function() {
		$(this).parent().toggleClass('expand');
	});

	// $('.tweet').click(function() {
	// 	$(this).parent('.thread').toggleClass('expand');         
	// });

//------------------renderTweet-----------------

	var renderTweet = function(User, message){
		var source = $('#template-tweet').html();
		var template = Handlebars.compile(source);   //wants HTML string
		var output = template({'User': User.handle, 'img': User.image, 'message': message});  //JSON
		return output;
	};

//------------------renderCompose---------------

	var renderCompose = function() {
		var source = $('#template-compose').html();
		var template = Handlebars.compile(source);
		var output = template();
		return output;
	};

//------------------renderThread----------------

	var renderThread = function(User, message){
		var source = $('#template-thread').html();
		var template = Handlebars.compile(source);
		var output = template({'tweet': renderTweet(User, message), 'compose': renderCompose()});  //JSON
		return output;
	};

//------------------submit----------------------

	$('main').on('submit', 'form', function(x) {
		var message = $(this).find('textarea').val();
		x.preventDefault(); //x.stopPropagation();
		if($(this).parents('.tweets').length){
			$(this).parents('.replies').append(renderTweet(User, message));
		} else {
			$('main').find('.tweets').prepend(renderThread(User, message));
		}
		$(this).find('textarea').val('');  //message
		$(this).removeClass('expand');
	});

	// $('button').on('click', function() {
	// 		$('.thread').after('tweet').append(output);
	// 		//console.log('click');
	// });

});