class Volume{
    constructor(book, id, data){
        this.id = id;
        this.file = data.file;
        this.book = book;
    }

    createSaveData(){
        return {
            file: this.file
        };
    }

    save(){
        this.book.save();
    }
}

module.exports = Volume;
