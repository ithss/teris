import { Point, Viewer } from "../types";

export class Square {
    private _viewer?: Viewer
    private _color: string = "red"
    private _point: Point = {x: 0, y: 0}

    public get viewer() {
        return this._viewer;
    }
    public set viewer(val) {
        this._viewer = val;
        if(val) {
            val.show();
        } 
    }

    public get color() {
        return this._color
    }
    public set color(val) {
        this._color = val;
    }
    public get point() {
        return this._point
    }
    public set point(val) {
        this._point = val;
        //更改坐标时显示
        if(this._viewer) {
            this._viewer.show();
        }
    }
}