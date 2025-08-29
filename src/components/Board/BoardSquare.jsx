import "./boardSquare.css"
import Coin from "../Coin/Coin"

export const BoardSquare = () => {
    return(
        <div className="board-square-container">
            <div className="coin-container">
                <Coin color={'red'}/>
            </div>
        </div>
    )
}