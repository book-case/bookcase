const {slugify} = require('transliteration');
class Book{
	constructor(data){
		this.id = data.id;
		this.name = data.name;
		this.slug = data.slug;

		this.volumes = {};
		Object.keys(data.volumes).forEach((v) => {
			volumes[v] = new Volume(this, v, data.volumes[v]);
		});
	}

	createSaveData(){
		let data = {};
		Object.keys(this).forEach((v) => {
			data[v] = this[v];
		});
		data.volumes = {};
		Object.keys(this.volumes).forEach((v) => {
			data.volumes[v] = this.volumes[v].createSaveData();
		});

		return data;
	}

	save(){
		return db
		.collection('book')
		.findOneAndUpdate({
			id: this.id
		}, {
			$set: this.createSaveData()
		});
	}

	static createBook(name, volumes){
		return new Promise((reject, resolve) => {
			db
			.collection('settings')
			.findOne({name: 'last-item'})
			.then((result) => {
				return db
				.collection('settings')
				.findOneAndUpdate({
					name: 'last-item'
				}, {
					$set: {
						value: result.value + 1
					}
				});
			}).then(() => {
				let book = new Book({
					id: result.value,
					name,
					slug: slugify(name),
					volumes
				});

				book.save().then(() => {
					resolve(book);
				}),catch((err) => {
					reject(err);
				});
			}).catch((err) => {
				reject(err);
			});
		});
	}

	static getById(id){

	}

	static getBySlug(slug){

	}
}

module.exports = Book;
