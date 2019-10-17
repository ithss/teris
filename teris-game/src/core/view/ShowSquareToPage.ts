import { Square } from "../Square";
import $ from "jquery";
import { Viewer } from "../../types";
import PageConfig from "./PageConfig"

export class ShowSquareToPage implements Viewer{
    private dom?: JQuery<HTMLElement>
    private isRemove: boolean = false
    
    show(): void {
        if(this.isRemove) {
            return;
        }
        if(!this.dom) {
            this.dom = $("<div>").css({
                height: PageConfig.SquareSize.width,
                width: PageConfig.SquareSize.height,
                position: "absolute",
                border: "1px solid",
                boxSizing: "border-box"
            }).appendTo(this.parentNode);
        }
            this.dom.css({
                left: this.sq.point.x*PageConfig.SquareSize.width,
                top: this.sq.point.y*PageConfig.SquareSize.height,
                backgroundColor: this.sq.color,
            })  
    }

    remove(): void {
        if(this.dom && !this.isRemove) {
            this.dom.remove();
            this.isRemove = true;
        }
    }
    constructor(
        private sq: Square,
        private parentNode: JQuery<HTMLElement>
    ) {
    }
}