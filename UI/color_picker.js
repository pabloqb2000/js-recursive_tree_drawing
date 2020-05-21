/**
 * Class that creates 3 sliders for:
 *  -hue
 *  -saturation
 *  -value
 * to define a color wich is shown next to the sliders
 */
class ColorPicker extends UiElement {
    /**
     * 
     * @param x X position of the first slider
     * @param y Y position of the secon slider
     * @param width Width of the sliders
     * @param height Height of the sliders
     * @param margins Margin between the sliders
     * @param action Action perfomed when color changes
     */
    constructor(x=20, y=20, width=100, height=10, margins=20, nempty=0, action=null) {
        super(x,y,width,height, false, false, false);
        this.margins = margins;

        let tmp;
        this.hueSld = new Slider(0, 1, 0.5, x, y, width, height, null, "H", false, 0, action);
        for(let i = 0; i < nempty; i++)
            tmp = new UiElement();

        this.satSld = new Slider(0, 1, 0.5, x, y + height + margins, width, height, null, "S", false, 0, action);
        for(let i = 0; i < nempty; i++)
            tmp = new UiElement();

        this.ligSld = new Slider(0, 1, 0.5, x, y + height*2 + margins*2, width, height, null, "L", false, 0, action);
        for(let i = 0; i < nempty; i++)
            tmp = new UiElement();
    }

    /**
     * Draws the rectangle representing the color
     */
    draw() {
        fill(230);
        rect(this.hueSld.x + this.satSld.getWidth() + this.margins, this.hueSld.y, this.width/2, this.height*3 + this.margins*2, this.width/10);

        colorMode(HSL, 1);
        let color = this.getColor();
        fill(color[0], color[1], color[2]);
        rect(this.hueSld.x + this.satSld.getWidth() + this.margins + 2, this.hueSld.y + 2, this.width/2 - 4, this.height*3 + this.margins*2 - 4, this.width/10)

        colorMode(RGB, 255);
    }

    /**
     * @return an array containing the hsl values of the color
     */
    getColor() {
        return [this.hueSld.value, this.satSld.value, this.ligSld.value];
    }
}