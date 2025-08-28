import "./Coin.css";

const Coin = ({ color }) => {
    return (
        <div className="coin" style={{color: color}}></div>
    );
}

export default Coin;