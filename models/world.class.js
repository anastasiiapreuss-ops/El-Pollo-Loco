class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    healthStatusBar = new HealthStatusBar();
    coinStatusBar = new CoinStatusBar();
    throwableObjects = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }



    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 200);
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.healthStatusBar.setPercentage(this.character.energy);
            }
        });
    }

    checkThrowObjects(){
        if(this.keyboard.L){
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);//die Welt wird erstmal gelöscht

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects); //alle BackgroundObjects zur Map einfügen

        this.ctx.translate(-this.camera_x, 0); // back
        this.addToMap(this.healthStatusBar);
        this.ctx.translate(this.camera_x, 0); // forwards

        this.ctx.translate(-this.camera_x, 0); // back
        this.addToMap(this.coinStatusBar);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character); // Charakter zur Map einfügen
        this.addObjectsToMap(this.level.enemies);// alle Enemies zur Map einfügen
        this.addObjectsToMap(this.level.clouds);// alle Clouds zur Map einfügen

        this.addObjectsToMap(this.throwableObjects)

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
        mo.draw(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
        mo.drawFrame(this.ctx);
    }
    // Image Spiegeln
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;

    }
    // gespiegeltes Image zurücksetzen
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
} 