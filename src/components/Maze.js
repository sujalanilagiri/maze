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

function create2DArray(x, y) {
  var arr = new Array([]);

  for (var i = 0; i < x; i++) {
    arr[i] = [];
    for (var j = 0; j < y; j++) {
      arr[i][j] = 0;
    }
  }
  return arr;
}

function getStart(maze) {
  var i = 0;
  while (i < maze.length) {
    if (maze[i][0] == "S") {
      return i;
    }
    i++;
  }
  return -1;
}

function solveMaze(maze, solution) {
  this.maze = maze;

  var memory = create2DArray(maze.length, maze[0].length);
  var maxRows = maze.length;
  var maxColumns = maze[0].length;
  this.traverse = function(i, j) {
    if (i < 0 || j < 0 || i >= maxRows || j >= maxColumns) {
      return false;
    }

    if (memory[i][j] == 1) {
      return false;
    }

    memory[i][j] = 1;

    if (maze[i][j] == "#") {
      return false;
    }

    if (maze[i][j] == "F") {
      solution[i][j] = 1;
      return true;
    }

    solution[i][j] = 1;
    var r1 = this.traverse(i + 1, j);

    var r3 = this.traverse(i - 1, j);
    var r2 = this.traverse(i, j + 1);

    var r4 = this.traverse(i, j - 1);
    if (r1 || r2 || r3 || r4) {
      return true;
    } else {
      solution[i][j] = 0;
      return false;
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
    var solution = create2DArray(maze.length, maze[0].length);
    var solvedmaze = new solveMaze(mazeArray, solution);
    solvedmaze.traverse(getStart(maze), 0);

    var newMazeArray = [];
    for (var i = 0; i < solution.length; i++) {
      newMazeArray[i] = solution[i].toString();
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
