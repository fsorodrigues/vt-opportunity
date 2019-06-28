export const isMobile = () => {
	if (navigator.userAgent.match(/Android/i)
	|| navigator.userAgent.match(/webOS/i)
	|| navigator.userAgent.match(/iPhone/i)
	|| navigator.userAgent.match(/iPad/i)
	|| navigator.userAgent.match(/iPod/i)
	|| navigator.userAgent.match(/BlackBerry/i)
	|| navigator.userAgent.match(/Windows Phone/i) ){

		return true;

	} else {

		return false;

	}
};

export const legendDict = {
	'drinking water':"Contamination in drinking water",
	'on-site':"Contamination on-site",
	'no contamination': 'No contamination found'
};

export const onlyUnique = (value, index, self) => self.indexOf(value) === index;
