const translations = require('../translations');

class Translator{
	constructor(request){
		if(typeof request === 'string') this.language = request;
		else this.language = request.language;
	}

	translate(string, args = []){
		let translateString = (translations[this.language] || {})[string] || string;

		Object.keys(args).forEach((v) => {
			translateString.split("%" + v + "%").join(args[v]);
		});

		return translateString;
	}
}

module.exports = (req, res, next) => {
	res.locals.translator = new Translator(req).translate;

	next();
};
