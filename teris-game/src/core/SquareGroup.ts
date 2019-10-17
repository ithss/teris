import { Square } from "./Square";
import { Shape, Point } from "../types";

export class SquareGroup {

    private _squares: readonly Square[] = [];
    public get squares() {
        return this._squares
    }

    public get shape() {
        return this._shape;
    }
    public set shape(val) {
        this._shape = val;
    }

    public get center() {
        return this._center;
    }
    public set center(val) {
        this._center = val;
        this.setSquarePoints();
    }

    //设置俄罗斯方块各个点的坐标
    private setSquarePoints(){
        this._shape.forEach((p, i) => {
            this._squares[i].point = {
                x: this._center.x + p.x,
                y: this._center.y + p.y
            }
        })
    }

    //  旋转方向是否为顺时针
    protected isClock = true;

    afterRotateShape(): Shape {
        if (this.isClock) {
            return this._shape.map(p => {
                const newP: Point = {
                    x: -p.y,
                    y: p.x
                }
                return newP;
            })
        }
        else {
            return this._shape.map(p => {
                const newP: Point = {
                    x: p.y,
                    y: -p.x
                }
                return newP;
            })
        }
    }

    rotate() {
        const newShape = this.afterRotateShape();
        this._shape = newShape;
        this.setSquarePoints();
    }

    constructor(
        private _shape: Shape,
        private _center: Point,
        private _color: string
        ) {
            //形状确定每个小方块相对中心的位置
            //中心点确定方块的位置
            let arr: Square[] = [];
            this._shape.forEach(point => {
                const sq = new Square();
                sq.color = this._color;
                sq.point = {
                    x: point.x + this._center.x,
                    y: point.y + this._center.y
                }
                arr.push(sq);
            })
            this._squares = arr;
    }
}