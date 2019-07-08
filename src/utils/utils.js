import {format} from "d3-format";

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

export const formatNumber = format('.2%');

export const toProperCase = d => `${d.charAt(0).toUpperCase()}${d.substring(1).toLowerCase()}`;

export const statusDict = {
	selected: "Opportunity Zone",
	"not selected": "Eligible, but not selected"
};
