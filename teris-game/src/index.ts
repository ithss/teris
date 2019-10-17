import { Game } from "./core/Game";
import { ShowGameToPage } from "./core/view/ShowGameToPage";
new Game(new ShowGameToPage());


// import { Square } from "./core/Square";
// import { ShowSquareToPage } from "./core/view/ShowSquareToPage";
// import $ from "jquery"
// import { SquareGroup } from "./core/SquareGroup";
// import PageConfig from "./core/view/PageConfig";
// import { TerisRules } from "./core/TerisRules";
// import { MoveDirection } from "./types";
// import { createTeris } from "./core/Teris";
// $("#root").css({
//     width: PageConfig.UiSize.width*PageConfig.SquareSize.width,
//     height: PageConfig.UiSize.height*PageConfig.SquareSize.height,
// })

// const bool = TerisRules.canIMove([{x: 0, y: -1},{x: -1, y: 0},{x: 1, y: 0},{x: 0, y: 0}], {x: 14, y: 15})
// console.log(bool)
// createTeris({x: 2, y: 2});

// const sg = new SquareGroup([{x: 1, y: 0}, {x: -1, y: 0}, {x: 0, y: 1}, {x: 0, y: 0}], {x: 1, y: 1}, 'red');

// sg.squares.forEach(e => {
//     e.viewer = new ShowSquareToPage(e, $("#root"))
// })

// const teris1 = createTeris({x: 1, y: 3})
// teris1.squares.forEach(ele=> {
//     ele.viewer = new ShowSquareToPage(ele, $("#root"))
// })
// const sq = new Square();
// sq.viewer = new ShowSquareToPage(sq, $("#root"));

// let n = 1;
