const {slugify} = require('transliteration');
const tagRegex = /^[a-z0-9-]{1,1024}$/;
class Book{
	constructor(data){
		this.id = data.id;
		this.name = data.name;
		this.slug = data.slug;
		this.tags = data.tags;

		this.volumes = {};
		Object.keys(data.volumes).forEach((v) => {
			volumes[v] = new Volume(this, v, data.volumes[v]);
		});
	}

	getVolume(volumeId){
		return volumes[volumeId];
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

	static createBook(name, volumes, tags){
		return new Promise((resolve, reject) => {
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
					volumes,
					tags
				});

				book.save().then(() => {
					resolve(book);
				}).catch((err) => {
					console.error(err);
					reject(new Error('server.saveerror'));
				});
			}).catch((err) => {
				console.error(err);
				reject(new Error('server.dberror'));
			});
		});
	}

	static getById(id){
		return new Promise((resolve, reject) => {
			db
			.collection('book')
			.findOne({id}).then((data) =>{
				resolve(new Book(data));
			}).catch((err) => {
				console.error(err);
				reject(new Error('server.dberror'));
			});
		});
	}

	static getBySlug(slug){
		return new Promise((resolve, reject) => {
			db
			.collection('book')
			.findOne({slug}).then((data) => {
				resolve(new Book(data));
			}).catch((err) => {
				console.error(err);
				reject(new Error('server.dberror'));
			});
		});
	}

	static searchBooks(name, tag, page, showAmount){
		return new Promise((resolve, reject) => {
			if((typeof page !== 'string' || !/^\d{1,256}$/.test(page)) && typeof page !== 'number') page = 1;
			if(typeof page === 'string') page = parseInt(page);
			if(page <= 0) page = 1;

			tag = tag.split(' ').filter((v) => tagRegex.test(v));
			let nameQuery = {
				$text: '"' + name + '"'
			};

			let findResult = db
				.collection('book')
				.find({
					$and: [
						{
							$or: [
								{slug: nameQuery},
								{name: nameQuery}
							]
						},
						{
							tags: {
								$all: tag
							}
						}
					]
				});

			let maxPage;
			findResult.count().then((count) => {
				let skipAmount = showAmount * (page - 1);
				if(skipAmount > count) page = 1;
				maxPage = Math.ceil(count / showAmount);

				return findResult
					.skip(skipAmount)
					.limit(showAmount)
					.toArray();
			}).then((result) => {
				resolve({
					result,
					maxPage
				});
			}).catch((err) => {
				console.error(err);
				reject(new Error('server.dberror'));
			});
		});
	}
}

module.exports = Book;
