class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 250;
    height = 150;
    width = 100;


    rX;
    rY;
    rW;
    rH;

    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }


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
            this.imageCache[path] = img;
        });
    }

    draw(ctx) {
    ctx.drawImage(
        this.img,
        this.x,
        this.y,
        this.width,
        this.height
    );
}

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'red';
            ctx.rect(
                this.rX,
                this.rY,
                this.rW,
                this.rH
            );
            ctx.stroke();
        }
    }

    getRealFrame() {
        this.rX = this.x + this.offset.left;
        this.rY = this.y + this.offset.top;
        this.rW = this.width - this.offset.left - this.offset.right;
        this.rH = this.height - this.offset.top - this.offset.bottom;
    }

}