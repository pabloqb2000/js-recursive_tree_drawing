/**
 * Generic element to be inside the UI
 */
class UiElement{
    /**
     * Constructor of the generic UI Element
     * 
     * @param x X position of the element 
     * @param y Y position of the element
     * @param width Width of the element
     * @param height Height of the element
     * @param draggable True if the element should be updated on mouseDragged
     * @param clickable True if the element should be updated on mouseClicked
     */
    constructor(x=0, y=0, width=0, height=0, draggable=false, clickable=false){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.draggable = draggable;
        this.clickable = clickable;

        this.highlighted = false;
        this.visible = true;

        UI.addElement(this);
    }

    /**
     * @return The width of the element
     */
    getWidth() {
        return this.width;
    }

    /**
     * Draws nothing to create an empty element
     */
    draw() {

    }

    /**
     * @return The height of the element
     */
    getHeight() {
        return this.height;
    }

    /**
     * Checks if mouse is inside the slider
     * if so highlights the slider
     */
    update() {
        this.highlighted = this.mouseIsOver();    
    }

    /**
     * @return true if the mouse is over the element
     */
    mouseIsOver(){
        return mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height;
    }
}