class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);//die Welt wird erstmal gelöscht

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects); //alle BackgroundObjects zur Map einfügen
        this.addToMap(this.character); // Charakter zur Map einfügen
        this.addObjectsToMap(this.level.enemies);// alle Enemies zur Map einfügen
        this.addObjectsToMap(this.level.clouds);// alle Clouds zur Map einfügen

        this.ctx.translate(-this.camera_x, 0);


        // Draw wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        })
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }
    // Image Spiegeln
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1)
        mo.x = mo.x * -1;
    }
    // gespiegeltes Image zurücksetzen
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
} 