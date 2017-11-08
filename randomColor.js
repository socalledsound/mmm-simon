//hex color generators:::


		//number 1:
		'#'+'0123456789abcdef'.split('').map(function(v,i,a){
		  return i>5 ? null : a[Math.floor(Math.random()*16)] }).join('');

		//awesome
		'#'+Math.floor(Math.random()*16777215).toString(16);