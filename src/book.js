const {slugify} = require('transliteration');
const tagRegex = /^[a-z0-9-]{1,256}$/;
const languageList = [
	'Chinese',
	'English',
	'Spanish',
	'Arabic',
	'Hindi',
	'French',
	'Portuguese',
	'Russian',
	'Malay',
	'German',
	'Bengali',
	'Urdu',
	'Punjabi',
	'Japanese',
	'Persian',
	'Swahili',
	'Telugu',
	'Italian',
	'Javanese',
	'Tamil',
	'Korean',
	'Shanghainese',
	'Marathi',
	'Turkish',
	'Vietnamese',
	'Cantonese'
];

class Book{
	constructor(data){
		this.id = data.id;
		this.name = data.name;
		this.slug = data.slug;
		this.tags = data.tags;
		this.language = data.language;
		this.author = data.author;

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

	static createBook(name, author, language, tags){
		//Sanitize name
		if(typeof name !== 'string' || name.length >= 128) name = "Untitled Book";

		//Sanitize author
		if(typeof author !== 'string' || author.length >= 128) author = "Unknown";

		//Sanitize language
		if(typeof language !== 'string') language = "English";
		if(languageList.indexOf(language) === -1) language = "English";

		//Sanitize tags
		if(typeof tags === 'string' && tags.length < 1024) tags = tags.split(' ');
		if(!Array.isArray(tags)) tags = [];
		if(tags.length >= 1024) tags = [];
		tags = tags.filter((v) => tagRegex.test(v));
		if(tags.join(' ') >= 1024) tags = [];

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
					author,
					slug: slugify(name),
					volumes: [],
					language,
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
				//console.error(err);
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
				//console.error(err);
				reject(new Error('server.dberror'));
			});
		});
	}

	static searchBooks(str, lang, tag, page, showAmount){
		return new Promise((resolve, reject) => {
			//Sanitize str
			if(typeof str !== 'string' || str.length >= 128) str = '';

			//Sanitize lang
			if(typeof lang !== 'string' || languageList.indexOf(lang) === -1) lang = '';

			//Sanitize tag
			if(typeof tag !== 'string' || tag.length >= 128) tag = '';
			tag = tag.split(' ').filter((v) => tagRegex.test(v));

			//Sanitize page
			if((typeof page !== 'string' || !/^\d{1,32}$/.test(page)) && typeof page !== 'number') page = 1;
			if(typeof page === 'string') page = parseInt(page);
			if(page <= 0) page = 1;
			if(!isFinite(page)) page = 1;

			//Sanitize showAmount
			if((typeof showAmount !== 'string' || !/^\d{1,4}$/.test(showAmount)) && typeof showAmount !== 'number') showAmount = 25;
			if(typeof showAmount === 'string') showAmount = parseInt(showAmount);
			if(showAmount <= 0) showAmount = 25;
			if(!isFinite(showAmount)) showAmount = 25;

			//Create small text query
			const strQuery = {
				$text: '"' + str + '"'
			};

			//Creat query and query db
			let findResult = db
				.collection('book')
				.find({
					$and: [
						{
							$or: [
								{slug: strQuery},
								{name: strQuery},
								{author: strQuery}
							]
						},
						{
							lang: {
								$text: '"' + lang + '"'
							}
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
				//Sanitize page2
				let skipAmount = showAmount * (page - 1);
				if(skipAmount > count){
					skipAmount = 0;
					page = 1;
				}

				maxPage = Math.ceil(count / showAmount);

				return findResult
					.skip(skipAmount)
					.limit(showAmount)
					.toArray();
			}).then((result) => {
				resolve({
					result,
					maxPage,
					page
				});
			}).catch((err) => {
				console.error(err);
				reject(new Error('server.dberror'));
			});
		});
	}
}

module.exports = Book;
