/**
 * Class to control all the ui elements
 */
class UI{
    static elements = [];

    /**
     * @param element New element to be added
     */
    static addElement(element){
        this.elements.push(element);
    }

    /**
     * Update all the elemets in the ui
     */
    static update() {
        for (let e of this.elements){
            if(e.visible)
                e.update();
        }
    }

    /**
     * Draw all the elements
     */
    static draw() {
        for (let e of this.elements){
            e.draw();
        }
    }

    /**
     * Update all draggable the elements
     */
    static mouseDragged() {
        for(let e of this.elements) {
            if(e.draggable)
                e.dragged();
        }
    }

    /**
     * Update all the clickable elements
     */
    static mouseClicked() {
        for(let e of this.elements) {
            if(e.clickable)
                e.clicked();
        }
    }
}