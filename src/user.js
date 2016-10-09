const Book = require('./book');

class User{
	constructor(data){
		Object.keys(data).forEach((v) => {
			this[v] = data[v];
		});
	}

	favorite(id){

		save();
	}

	subscribe(id){
		save();
	}
}

module.exports = User;
