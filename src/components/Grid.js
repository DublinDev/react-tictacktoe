import React from "react";
import Cell from "./Cell";
import Message from "./Message";

export default class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cellValues: Array(9).fill(null),
      isUsersTurn: true,
      cellCssClass: Array(9).fill("game-cell"),
      inProgress: true,
      message: "You are playing as X",
    };
  }

  componentDidUpdate() {
    if (this.state.inProgress) {
      let hasWon = this.checkForWin();
      if (hasWon) {
        console.log("Winner");
        this.setState({
          inProgress: false,
          message: `${this.getWinningSymbol(hasWon)} has won!`,
        });
        this.updateWinningCellClasses(hasWon);
      } else {
        if (!this.state.isUsersTurn) {
          this.opponentMoves();
          let hasWon = this.checkForWin();
          if (hasWon) {
            console.log("Winner");
            this.setState({
              inProgress: false,
              message: `${this.getWinningSymbol(hasWon)} has won!`,
            });
            this.updateWinningCellClasses(hasWon);
          }
        }
      }
    }
  }

  getWinningSymbol = (winningIndexes) => {
    return this.state.cellValues[winningIndexes[0]];
  };

  updateWinningCellClasses = (winningCells) => {
    // console.log(winningCells);
    let tmp = this.state.cellCssClass.map((val, index) => {
      return winningCells.includes(index) ? val + " winner" : val;
    });
    console.log(tmp);
    this.setState({ cellCssClass: tmp });
  };

  setCellValue = (cellIndex, value) => {
    if (!this.cellHasValue(cellIndex)) {
      let tempState = this.state.cellValues;
      tempState[cellIndex] = value;
      this.setState({
        cellValues: tempState,
        isUsersTurn: !this.state.isUsersTurn,
      });

      return true;
    }
    return false;
  };

  cellHasValue = (cellIndex) => {
    return this.state.cellValues[cellIndex] !== null;
  };

  //returns the
  findEmptyCells = () => {
    return this.state.cellValues
      .map((val, index) => val === null || index)
      .filter((cellVal) => typeof cellVal !== "number");
  };

  opponentMoves = () => {
    const closestEmptyCell = this.state.cellValues.indexOf(null);
    console.log(closestEmptyCell);
    // const emptyCellIndexes = this.findEmptyCells();
    // if(emptyCellIndexes.length > 0){
    this.setCellValue(closestEmptyCell, "O");
    this.setState({ isUsersTurn: true });
    // }
  };

  check3Cells = (index1, index2, index3) => {
    const cell1 = this.state.cellValues[index1];
    const cell2 = this.state.cellValues[index2];
    const cell3 = this.state.cellValues[index3];

    return cell1 !== null && cell1 === cell2 && cell2 === cell3;
  };

  checkForWin = () => {
    console.log("Checking for win");
    if (this.check3Cells(0, 1, 2)) return [0, 1, 2];
    else if (this.check3Cells(3, 4, 5)) return [3, 4, 5];
    else if (this.check3Cells(6, 7, 8)) return [6, 7, 8];
    else if (this.check3Cells(0, 3, 6)) {
      return [0, 3, 6];
    } else if (this.check3Cells(1, 4, 7)) return [1, 4, 7];
    else if (this.check3Cells(2, 5, 8)) return [2, 5, 8];
    else if (this.check3Cells(0, 4, 8)) return [0, 4, 8];
    else if (this.check3Cells(2, 4, 6)) return [2, 4, 6];

    return false;
  };

  render() {
    return (
      <div className="game">
        <h1>Grid</h1>
        <Message message={this.state.message} />
        <div className="game-row container-fluid">
          <Cell
            id="1"
            className={`${this.state.cellCssClass[0]} left top`}
            value={this.state.cellValues[0]}
            onClick={() => this.setCellValue(0, "X")}
          />
          <Cell
            id="2"
            className={`${this.state.cellCssClass[1]} top`}
            value={this.state.cellValues[1]}
            onClick={() => this.setCellValue(1, "X")}
          />
          <Cell
            id="3"
            className={`${this.state.cellCssClass[2]} right top`}
            value={this.state.cellValues[2]}
            onClick={() => this.setCellValue(2, "X")}
          />
        </div>
        <div className="game-row">
          <Cell
            id="4"
            className={`${this.state.cellCssClass[3]} left`}
            value={this.state.cellValues[3]}
            onClick={() => this.setCellValue(3, "X")}
          />
          <Cell
            id="5"
            className={`${this.state.cellCssClass[4]} `}
            value={this.state.cellValues[4]}
            onClick={() => this.setCellValue(4, "X")}
          />
          <Cell
            id="6"
            className={`${this.state.cellCssClass[5]} right`}
            value={this.state.cellValues[5]}
            onClick={() => this.setCellValue(5, "X")}
          />
        </div>
        <div className="game-row">
          <Cell
            id="7"
            className={`${this.state.cellCssClass[6]} left bottom`}
            value={this.state.cellValues[6]}
            onClick={() => this.setCellValue(6, "X")}
          />
          <Cell
            id="8"
            className={`${this.state.cellCssClass[7]} bottom`}
            value={this.state.cellValues[7]}
            onClick={() => this.setCellValue(7, "X")}
          />
          <Cell
            id="9"
            className={`${this.state.cellCssClass[8]} right bottom`}
            value={this.state.cellValues[8]}
            onClick={() => this.setCellValue(8, "X")}
          />
        </div>
        <button
          className="ui button right floated"
          onClick={() => {
            this.setState({
              cellValues: this.state.cellValues.fill(null),
              cellCssClass: this.state.cellCssClass.fill("game-cell"),
              inProgress: true,
              message: "You are playing as X",
            });
          }}
        >
          Reset
        </button>
      </div>
    );
  }
}
