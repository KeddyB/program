class Controls {
    constructor() {
        this.forward = false,
        this.reverse = false,
        this.right = false;
        this.left = false

        this.#addEventListeners()
    }
    #addEventListeners() {
        document.onkeydown = (e) => {
            switch(e.key){
                case "ArrowUp":
                    this.forward = true
                    break
                case "ArrowDown":
                    this.reverse = true
                    break
                case "ArrowLeft":
                    this.left = true
                    break
                case "ArrowRight":
                    this.right = true
                    break
            }
            console.log(this)
        }
        document.onkeyup = (e) => {
            switch(e.key){
                case "ArrowUp":
                    this.forward = false
                    break
                case "ArrowDown":
                    this.reverse = false
                    break
                case "ArrowLeft":
                    this.left = false
                    break
                case "ArrowRight":
                    this.right = false
                    break
            }
            console.log(this)
        }
        console.log(this)
        //touch support for game look out
        /*document.touchstart = (e) => {
            switch(e.type) {
            }
        }*/
    }
}