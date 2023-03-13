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
        }
        document.touchstart = (e) => {
            switch(e.type) {
            }
        }
    }
}