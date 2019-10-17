import { SquareGroup } from "./core/SquareGroup";
import { Game } from "./core/Game";

export interface Point {
    readonly x: number,
    readonly y: number
}

export interface Viewer {
    // show: () => void
    // remove: () => void
    //显示
    show(): void,
    //移除
    remove(): void
}

export type Shape = Point[];

export enum MoveDirection {
    left,
    right,
    down
}

export enum GameStatus {
    init, //未开始
    playing, //进行中,
    pause, //暂停
    over //游戏结束
}

export interface GameViewer {
    /**
     * 
     * @param teris 下一个方块对象
     */
    showNext(teris: SquareGroup): void;
    /**
     * 
     * @param teris 切换的方块对象
     */
    swtich(teris: SquareGroup): void;

    /**
     * 完成界面的初始化
     */
    init(game: Game): void;

    showScore(score: number): void;

    onGamePause(): void;

    onGameStart(): void;

    onGameOver(): void;
}