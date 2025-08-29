import { BoardRow } from "./BoardRow"
import './board.css'

export const Board = () => {
    return (
        <div className="board-container">
            <BoardRow/>
            <BoardRow/>
            <BoardRow/>
            <BoardRow/>
            <BoardRow/>
            <BoardRow/>
            <BoardRow/>
            <BoardRow/>
            <BoardRow/>
            <BoardRow/>
        </div>
    )
}
