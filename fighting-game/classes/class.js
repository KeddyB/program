class Sprite{
    constructor({position, imgSrc}){
        this.position = position;
        this.width = 50
        this.height = 150
        this.img = new Image()
        this.img.src = imgSrc
    }

    draw(){
        ctx.drawImage(this.img, this.position.x, this.position.y)
    }

    update(){
        this.draw()

    }
}

class Fighter{
    constructor({position,velocity, color = "red", offset}){
        this.position = position;
        this.velocity = velocity;
        this.width = 50
        this.height = 150
        this.lastKey;
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width: 100,
            height: 50
        }
        this.color = color
        this.isAttacking
        this.health = 100
    }

    draw(){
        ctx.fillStyle = this.color
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)

        //attack box
        if(this.isAttacking){
            ctx.fillStyle = "green"
            ctx.fillRect(
                this.attackBox.position.x, 
                this.attackBox.position.y, 
                this.attackBox.width, 
                this.attackBox.height
            )
        }
    }

    update(){
        this.draw()
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if(this.position.y + this.height + this.velocity.y>= canvas.height){
            this.velocity.y = 0
        }else this.velocity.y += gravity

    }
    attack(){
        this.isAttacking = true
        setTimeout(()=>{
            this.isAttacking = false
        }, 100)
    }
}