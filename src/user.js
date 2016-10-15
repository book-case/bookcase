const Book = require('./book');
const mailer = require('./mailer');

class User{
	constructor(data){
		Object.keys(data).forEach((v) => {
			this[v] = data[v];
		});
	}

	verifyEmail(email){
		return new Promise((reject, resolve) => {
			const token = createToken(256);
			this.verification.email = {
				verified: false,
				token
			};
			mailer('user.verifyemail', email, 'email-verification', {
				new_email: email,
				verification_token: token
			}).then(() => {
				return save();
			}).then(() => {
				resolve();
			}).catch((err) => {
				reject(err);
			});
		});
	}

	favorite(id){
		if(this.favorite.indexOf(id) !== -1) this.favorite = this.favorite.filter((v) => v !== id);
		else this.favorite.push(id);
		return save();
	}

	subscribe(id){
		if(this.favorite.indexOf(id) !== -1) this.subscribe = this.subscribe.filter((v) => v !== id);
		else this.subscribe.push(id);
		return save();
	}

	createSaveData(){
		let data = {};
		Object.keys(this).forEach((v) => {
			data[v] = this[v];
		});
		return data;
	}

	save(){
		return db
			.collection('user')
			.findOneAndUpdate({
				id: this.id
			}, {
				$set: this.createSaveData()
			})
	}
}

module.exports = User;
