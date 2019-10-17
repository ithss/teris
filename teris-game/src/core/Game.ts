import { GameStatus, MoveDirection, GameViewer } from "../types";
import { SquareGroup } from "./SquareGroup";
import { createTeris } from "./Teris";
import { TerisRules } from "./TerisRules";
import PageConfig from "./view/PageConfig";
import { Square } from "./Square";

export class Game {
    //游戏状态
    private _gameStatus: GameStatus = GameStatus.init;

    public get gameStatus() {
        return this._gameStatus;
    }
    //当前玩家操作的方块
    private _curTeris?: SquareGroup;
    //下一个方块
    private _nextTeris: SquareGroup;
    //计时器
    private _timer?: number;
    //自动下落的间隔时间
    private _duration: number;
    //当前游戏中，已存在的小方块
    private _existingSquares: Square[] = [];
    //积分
    private _score: number = 0;
    public get score() {
        return this._score;
    }
    public set score(val) {
        this._score = val;
        this._viewer.showScore(val);
        const level = PageConfig.levels.filter(it => it.score <= val).pop()!;
        if (level.duration === this._duration) {
            return;
        }
        this._duration = level.duration;
        if(this._timer){
            clearInterval(this._timer);
            this._timer = undefined;
            this.autoDrop();
        }
    }

    constructor(private _viewer: GameViewer) {
        this._duration = PageConfig.levels[0].duration;
        this._nextTeris = createTeris({ x: 0, y: 0 });//没有实际含义的代码，只是为了不让TS报错
        this.createNext();
        this._viewer.init(this);
        this._viewer.showScore(this.score);
    }

    private createNext() {
        this._nextTeris = createTeris({ x: 0, y: 0 });
        this.resetCenterPoint(PageConfig.nextSize.width, this._nextTeris);
        this._viewer.showNext(this._nextTeris);
    }

    private init() {
        this._existingSquares.forEach(sq => {
            if (sq.viewer) {
                sq.viewer.remove();
            }
        })
        this._existingSquares = [];
        this.createNext();
        this._curTeris = undefined;
        this.score = 0;
    }

    /**
     * 游戏开始
     */
    start() {
        //游戏状态的改变
        if (this._gameStatus === GameStatus.playing) {
            return;
        }
        //从游戏结束到开始
        if (this._gameStatus === GameStatus.over) {
            //初始化操作
            this.init();
        }
        this._gameStatus = GameStatus.playing;
        if (!this._curTeris) {
            //给当前玩家操作的方块赋值
            this.changeTeris();
        }
        this.autoDrop();
        this._viewer.onGameStart();
    }

    /**
     * 游戏暂停
     */
    pause() {
        if (this._gameStatus === GameStatus.playing) {
            this._gameStatus = GameStatus.pause;
            clearInterval(this._timer);
            this._timer = undefined;
            this._viewer.onGamePause();
        }
    }

    controlLeft() {
        if (this._curTeris && this._gameStatus === GameStatus.playing) {
            TerisRules.move(this._curTeris, MoveDirection.left, this._existingSquares);
        }
    }

    controlRight() {
        if (this._curTeris && this._gameStatus === GameStatus.playing) {
            TerisRules.move(this._curTeris, MoveDirection.right, this._existingSquares);
        }
    }

    controlDown() {
        if (this._curTeris && this._gameStatus === GameStatus.playing) {
            TerisRules.moveSoon(this._curTeris, MoveDirection.down, this._existingSquares);
            //触底
            this.hitBottom();
        }
    }

    controlRotate() {
        if (this._curTeris && this._gameStatus === GameStatus.playing) {
            TerisRules.rotate(this._curTeris, this._existingSquares);
        }
    }

    /**
     * 当前方块自由下落
     */
    private autoDrop() {
        if (this._timer || this._gameStatus !== GameStatus.playing) {
            return;
        }
        this._timer = setInterval(() => {
            if (this._curTeris) {
                if (!TerisRules.move(this._curTeris, MoveDirection.down, this._existingSquares)) {
                    //触底
                    this.hitBottom();
                }
            }
        }, this._duration);
    }

    /**
     * 切换方块
     */
    private changeTeris() {
        this._curTeris = this._nextTeris;
        this._curTeris.squares.forEach(sq => {
            if (sq.viewer) {
                sq.viewer.remove();
            }
        })
        this.resetCenterPoint(PageConfig.UiSize.width, this._curTeris);
        //有可能出问题：当前方块一出现时，就已经和之前的方块重叠了
        if (!TerisRules.canIMove(this._curTeris.shape, this._curTeris.center, this._existingSquares)) {
            //游戏结束
            this._gameStatus = GameStatus.over;
            clearInterval(this._timer);
            this._timer = undefined;
            this._viewer.onGameOver();
            return;
        }
        this.createNext();
        this._viewer.swtich(this._curTeris);
    }

    /**
     * 设置中心点坐标，已达到让该方块出现在区域的中上方
     * @param width 
     * @param teris 
     */
    private resetCenterPoint(width: number, teris: SquareGroup) {
        const x = Math.ceil(width / 2) - 1;
        const y = 0;
        teris.center = { x, y };
        while (teris.squares.some(it => it.point.y < 0)) {
            teris.center = {
                x: teris.center.x,
                y: teris.center.y + 1
            };
        }
    }

    /**
     * 触底之后的操作
     */
    private hitBottom() {
        //将当前的俄罗斯方块包含的小方块，加入到已存在的方块数组中。
        this._existingSquares = this._existingSquares.concat(this._curTeris!.squares);
        //处理移除
        const num = TerisRules.deleteSquares(this._existingSquares);
        //增加积分
        this.addScore(num);
        //切换方块
        this.changeTeris();
    }

    private addScore(lineNum: number) {
        if (lineNum === 0) {
            return;
        }
        else if (lineNum === 1) {
            this.score += 10;
        }
        else if (lineNum === 2) {
            this.score += 25;
        }
        else if (lineNum === 3) {
            this.score += 50;
        }
        else {
            this.score += 100;
        }
    }
}