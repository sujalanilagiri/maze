import React, { Component } from "react";
import MazeRow from "./MazeRow";

/*###########
S #   #   #
# # # # # #
#   #   # #
######### #
# #       #
# # #######
# #   #   #
# # # ### #
#   #     F
###########
*/

function solveMaze(maze) {
  this.maze = maze;

  this.traverse = function(column, row) {
    if (this.maze[column][row] == "F") {
      console.log("Solved " + column + ", " + row);
    } else if (this.maze[column][row] == "$") {
      console.log("path" + column + "," + row);
      this.maze[column][row] = "_";
      if (column < this.maze.length - 1);
      {
        this.traverse(column + 1, row);
      }
      if (row < this.maze[column].length - 1) {
        this.traverse(column, row + 1);
      }
      if (column > 0) {
        this.traverse(column - 1, row);
      }
      if (row > 0) {
        this.traverse(column, row - 1);
      }
    }
  };
}

export class Maze extends Component {
  render() {
    /* var inputMaze =
        "###########\nS$#$$$#$$$#\n#$#$#$#$#$#\n#$$$#$$$#$#\n#########$#\n#$#$$$$$$$#\n#$#$#######\n#$#$$$#$$$#\n#$#$#$###$#\n#$$$#$$$$$F\n###########";*/
    var inputMaze = this.props.mazeData;
    var maze = inputMaze.split("\n");

    var mazeArray = [];

    var inputMazeToArray = inputMaze => {
      for (var i = 0; i < maze.length; i++) {
        mazeArray[i] = [];
        for (var j = 0; j < maze[i].length; j++) {
          mazeArray[i][j] = maze[i].charAt(j);
        }
      }
    };

    inputMazeToArray(inputMaze);
    var solvedmaze = new solveMaze(mazeArray);
    solvedmaze.traverse(1, 1);
    var newMazeArray = [];
    for (var i = 0; i < mazeArray.length; i++) {
      newMazeArray[i] = mazeArray[i].toString();
    }

    return newMazeArray.map((mazeRow, index) => {
      mazeRow = mazeRow.replace(new RegExp(",", "g"), " ");

      return (
        <div>
          <MazeRow mazeRow={mazeRow} key={index} />
        </div>
      );
    });
  }
}
export default Maze;
