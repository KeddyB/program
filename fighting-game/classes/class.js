class Sprite{
    constructor({position, imgSrc, scale = 1, frameMax = 1, offset = {x:0, y:0}}){
        this.position = position;
        this.width = 50
        this.height = 150
        this.img = new Image()
        this.img.src = imgSrc
        this.scale = scale
        this.frameMax = frameMax
        this.currentFrame = 0
        this.frameElapsed = 0
        this.frameHold = 6,
        this.offset = offset
    }

    draw(){
        ctx.drawImage(
            this.img, 
            this.currentFrame * (this.img.width / this.frameMax), 
            0, 
            this.img.width / this.frameMax, 
            this.img.height, 
            this.position.x - this.offset.x, 
            this.position.y - this.offset.y, 
            (this.img.width / this.frameMax) * this.scale, 
            this.img.height * this.scale
        )
    }

    update(){
        this.draw()
        this.frameElapsed++
        if(this.frameElapsed % this.frameHold === 0){
            if(this.currentFrame < this.frameMax - 1){
                this.currentFrame++
            }else{
                this.currentFrame = 0
            }
        }
        
    }
}

class Fighter extends Sprite{
    constructor({
        position,
        velocity, 
        color = "red", 
        imgSrc, scale = 1, 
        frameMax = 1, 
        offset = {x:0, y:0}, 
        sprites,
        attackBox = {offset: {}, width: undefined, height: undefined}
    }){
        super({
            position,
            imgSrc,
            scale,
            frameMax,
            offset
        })
        this.velocity = velocity;
        this.width = 50
        this.height = 150
        this.lastKey;
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset:attackBox.offset,
            width: attackBox.width,
            height: attackBox.height
        }
        this.color = color
        this.isAttacking
        this.health = 100
        this.currentFrame = 0
        this.frameElapsed = 0
        this.frameHold = 6
        this.sprites = sprites,
        this.dead = false
        
        
        for(const sprite in this.sprites){
            sprites[sprite].img = new Image()
            sprites[sprite].img.src = sprites[sprite].imgSrc
        }
    }


    animateFrames(){
        this.draw()
        this.frameElapsed++
        if(this.frameElapsed % this.frameHold === 0){
            if(this.currentFrame < this.frameMax - 1){
                this.currentFrame++
            }else{
                this.currentFrame = 0
            }
        }
    }

    update(){
        this.draw()
        if (!this.dead)
            this.animateFrames()

        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        //gravity
        if(this.position.y + this.height + this.velocity.y>= canvas.height - 96){
            this.velocity.y = 0
            this.position.y = 330
        }else this.velocity.y += gravity
    }

    attack(){
        this.switchSprite("attack1")
        this.isAttacking = true
    }

    takeHit(){
        this.health -= 5

        if(this.health <= 0){
            this.switchSprite("death")
        }else{
            this.switchSprite("takeHit")
        }
    }

    switchSprite(sprite){
        if(this.img === this.sprites.death.img){
            if (this.currentFrame === this.sprites.death.frameMax - 1){
                this.dead = true
            } 
            return 
        }
        if(
            this.img === this.sprites.attack1.img && 
            this.currentFrame < this.sprites.attack1.frameMax -1
        ){
            return
        }

        if(
            this.img === this.sprites.takeHit.img && 
            this.currentFrame < this.sprites.takeHit.frameMax -1
        ){
            return
        }

        switch(sprite){
            case "idle":
                if(this.img !== this.sprites.idle.img){
                    this.img = this.sprites.idle.img
                    this.frameMax = this.sprites.idle.frameMax
                    this.currentFrame = 0;
                }
                break;
            case "run":
                if(this.img !== this.sprites.run.img){
                    this.img = this.sprites.run.img
                    this.frameMax = this.sprites.run.frameMax
                    this.currentFrame = 0;
                }
                break;
            case "jump":
                if(this.img !== this.sprites.jump.img){
                    this.img = this.sprites.jump.img
                    this.frameMax = this.sprites.jump.frameMax
                    this.currentFrame = 0;
                }
                break;
            case "fall":
                if(this.img !== this.sprites.fall.img){
                    this.img = this.sprites.fall.img
                    this.frameMax = this.sprites.fall.frameMax
                    this.currentFrame = 0;
                }
                break;
            case "attack1":
                if(this.img !== this.sprites.attack1.img){
                    this.img = this.sprites.attack1.img
                    this.frameMax = this.sprites.attack1.frameMax
                    this.currentFrame = 0;
                }
                break;
            case "takeHit":
                if(this.img !== this.sprites.takeHit.img){
                    this.img = this.sprites.takeHit.img
                    this.frameMax = this.sprites.takeHit.frameMax
                    this.currentFrame = 0;
                }
                break;
            case "death":
                if(this.img !== this.sprites.death.img){
                    this.img = this.sprites.death.img
                    this.frameMax = this.sprites.death.frameMax
                    this.currentFrame = 0;
                }
                break;
        }
    }
}