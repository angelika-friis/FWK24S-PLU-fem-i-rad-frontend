import { BoardSquare } from "./BoardSquare"
import './boardRow.css'

export const BoardRow = () => {
    return (
        <div className="board-row-container">
            <BoardSquare/>
            <BoardSquare/>
            <BoardSquare/>
            <BoardSquare/>
            <BoardSquare/>
            <BoardSquare/>
            <BoardSquare/>
            <BoardSquare/>
            <BoardSquare/>
            <BoardSquare/>
        </div>
    )
}