import './SelectorBox.css';

const SelectorBox = ({ heading, currencies, userInput, setUserInput }) => {

    return (
        <div className="selector-box">
            <h3>{heading}</h3>
            <select
                value={userInput[heading]}
                onChange={(e) => setUserInput(prev => ({ ...prev, [heading]: e.target.value }))}
            >
                {
                    currencies && currencies?.map((item, index) => {
                        return <option value={item.code} key={index}>{item.code} - {item.currency}</option>
                    })
                }
            </select>
        </div>
    );
}
export default SelectorBox;