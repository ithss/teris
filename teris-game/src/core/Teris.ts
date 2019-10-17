import { Point, Shape } from "../types"
import { SquareGroup } from "./SquareGroup"
import { makeRandom } from "./utils";

class LShape extends SquareGroup{
    constructor(center: Point, color: string) {
        super([{x: 0, y: 1},{x: 1, y: 0},{x: 0, y: 2},{x: 0, y: 0}],
             center, color);
    }

    
}

class LReverseShape extends SquareGroup{
    constructor(center: Point, color: string) {
        super([{x: 0, y: 1},{x: -1, y: 0},{x: 0, y: 2},{x: 0, y: 0}], 
            center, color);
    }
}

class SReverseShape extends SquareGroup{
    constructor(center: Point, color: string) {
        super([{x: 1, y: 0},{x: 0, y: -1},{x: 1, y: 1},{x: 0, y: 0}],
            center, color);
    }
    rotate() {
        super.rotate();
        this.isClock = !this.isClock;
    }
}

class SShape extends SquareGroup{
    constructor(center: Point, color: string) {
        super([{x: 1, y: -1},{x: 0, y: 1},{x: 1, y: 0},{x: 0, y: 0}],
            center, color);
    }
    rotate() {
        super.rotate();
        this.isClock = !this.isClock;
    }
}

class IShape extends SquareGroup{
    constructor(center: Point, color: string) {
        super([{x: 0, y: -1},{x: 0, y: 1},{x: 0, y: -2},{x: 0, y: 0}],
            center, color);
    }
}

class TShape extends SquareGroup{
    constructor(center: Point, color: string) {
        super([{x: 0, y: -1},{x: -1, y: 0},{x: 1, y: 0},{x: 0, y: 0}],
            center, color);
    }
}

class SquareShape extends SquareGroup{
    constructor(center: Point, color: string) {
        super([{x: 0, y: -1},{x: 1, y: 0},{x: 1, y: -1},{x: 0, y: 0}],
            center, color);
    }
    afterRotateShape(): Shape {
        return this.shape
    }
}

export const shapeGroups = [LShape, SShape,SReverseShape, LReverseShape, IShape, SquareShape, TShape]
export const colors = [
    "#ccc",
    "#ffc",
    "#cff",
    "f0f",
    "#abcdef",
    "#aaf"
]

export function createTeris(center: Point): SquareGroup {
    const shape = shapeGroups[makeRandom(0, shapeGroups.length)];
    return new shape(center, colors[makeRandom(0, colors.length)]);
}