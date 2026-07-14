class MovableObject {
    x = 120;
    y = 250;
    img;
    height = 150;
    width = 100;
    imageChace = {};

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * 
     * @param {Array} arr 
     */
    
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageChace[path] = img;
        });
    }


    moveRight() {
        console.log('Moving right!');

    }

    moveLeft() {

    }
}