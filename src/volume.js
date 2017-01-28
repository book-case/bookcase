class Volume{
	constructor(book, id, data){
		//id = name = volume number
		this.id = id;
		this.pages = data.pages;
		this.book = book;
		this.tags = data.tags;
		this.uploader = data.uploader;
	}

	createSaveData(){
		return {
			pages: this.pages,
			tags: this.tags,
			uploader: this.uploader
		};
	}

	save(){
		this.book.save();
	}
}

module.exports = Volume;
