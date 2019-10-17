import { Point, Shape, MoveDirection } from "../types";
import PageConfig from "./view/PageConfig";
import { SquareGroup } from "./SquareGroup";
import { Square } from "./Square";
function isPoint(obj: any): obj is Point {
    if(typeof obj.x == 'undefined') {
        return false;
    }
    return true;
}

export class TerisRules {
    // 判断某形状的俄罗斯方块是否能移动到目标点
    static canIMove(shape: Shape ,point: Point, exists: Square[]): boolean {
        //假设，中心点已经移动到了目标位置，算出每个小方块的坐标
        const targetSquarePoints: Point[] = shape.map(it => {
            return {
                x: it.x + point.x,
                y: it.y + point.y
            }
        })
        //边界判断
        let result = targetSquarePoints.some(p => {
            //是否超出了边界
            return p.x < 0 || p.x > PageConfig.UiSize.width - 1 ||
                p.y < 0 || p.y > PageConfig.UiSize.height - 1;
        })
        if (result) {
            return false;
        }

        //判断是否与已有的方块有重叠
        result = targetSquarePoints
            .some(p => exists.some(sq => sq.point.x === p.x && sq.point.y === p.y))
        if (result) {
            return false;
        }
        return true;
    }

    
    // 移动俄罗斯方块到目标位置 or 按照某个方向移动俄罗斯方块
    static move(teris: SquareGroup, targetPoint: Point, exists: Square[]): boolean;
    static move(teris: SquareGroup, direction: MoveDirection, exists: Square[]): boolean;
    static move(teris: SquareGroup, targetOrDir: Point | MoveDirection, exists: Square[]):boolean {
        
        if(isPoint(targetOrDir)){
            
            if(this.canIMove(teris.shape, targetOrDir,exists)){
                teris.center = targetOrDir
                
                return true;
            }
            return false;
        }else{
                let targetPoint: Point;
                switch (targetOrDir) {
                    case MoveDirection.left:
                        targetPoint = {x: teris.center.x-1, y: teris.center.y}
                        break;
                    case MoveDirection.right:
                        targetPoint = {x: teris.center.x+1, y: teris.center.y}
                        break;
                    default:
                        targetPoint = {x: teris.center.x, y: teris.center.y+1}
                        break;
                }    
                   return this.move(teris, targetPoint,exists);
               }
            
        
    }

    //  迅速移动俄罗斯方块
    static moveSoon(teris: SquareGroup, dir: MoveDirection, exists: Square[]): boolean {
        while(this.move(teris, dir,exists)){    
        }
        return true;
    }
    
    //  旋转俄罗斯方块
    static rotate(teris: SquareGroup, exists: Square[]): boolean {
        const newShape = teris.afterRotateShape(); //得到旋转之后新的形状
        if (this.canIMove(newShape, teris.center, exists)) {
            teris.rotate();
            return true;
        }
        else {
            return false;
        }
    }

    // 从已存在的方块中进行消除，并返回消除的行数
    static deleteSquares(exists: Square[]): number {
        //1. 获得y坐标数组
        const ys = exists.map(sq => sq.point.y);
        //2. 获取最大和最小的y坐标
        const maxY = Math.max(...ys);
        const minY = Math.min(...ys);
        //3. 循环判断每一行是否可以消除
        let num = 0;
        for (let y = minY; y <= maxY; y++) {
            if (this.deleteLine(exists, y)) {
                num++;
            }
        }
        return num;
    }

    private static deleteLine(exists: Square[], y: number): boolean {
        const squares = exists.filter(sq => sq.point.y === y);
        if (squares.length === PageConfig.UiSize.width) {
            //这一行可以消除
            squares.forEach(sq => {
                //1. 从界面中移除
                if (sq.viewer) {
                    sq.viewer.remove();
                }
                //2. 从数组中移除
                const index = exists.indexOf(sq)
                exists.splice(index, 1);
            })
            //2. 剩下的，y坐标比当前的y小的方块，y+1
            exists.filter(sq => sq.point.y < y).forEach(sq => {
                sq.point = {
                    x: sq.point.x,
                    y: sq.point.y + 1
                }
            })

            return true;
        }
        return false;
    }

}