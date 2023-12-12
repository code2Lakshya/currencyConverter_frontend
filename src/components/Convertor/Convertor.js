import { useEffect, useState } from "react";
import { fetchData } from "../../utils/fetchData";
import SelectorBox from "./SelectorBox/SelectorBox";
import { FaArrowUpLong, FaArrowDownLong } from "react-icons/fa6";

import './Convertor.css';

const Convertor = () => {

    const [currencies, setCurrencies] = useState(null);
    const [userInput, setUserInput] = useState({ value: 0.0, from: 'INR', to: 'AED' });
    const [output, setOutput] = useState(null);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        fetchData('/currencies')
            .then(data => {
                setCurrencies(data.response);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    const submitHandler = () => {
        if (Number(userInput.value) > 0 && userInput.to.length !== 0) {
            setLoader(true);
            fetchData('/convert', true, userInput)
                .then(response => {
                    setOutput(response.response);
                    setLoader(false);
                })
                .catch((error) => {
                    console.log(error);
                    setLoader(false);
                })
        }
    }

    const switchCurrencyHandler = () => {
        setUserInput(prev => ({...prev, from: userInput.to, to: userInput.from}));
    }

    return (
        <div className="convertor-container">
            <div className="convertor">
                <div id='amount-container'>
                    <label htmlFor="amount">Amount</label>
                    <div className="amount-input">
                        {
                            currencies &&
                            <span>
                                {(currencies?.find(item => item.code === userInput.from))?.symbol}
                            </span>
                        }
                        <input type='number'
                            placeholder='Amount'
                            id='amount'
                            value={userInput.value}
                            onChange={(e) => setUserInput(prev => ({ ...prev, value: e.target.value }))}
                        />
                    </div>
                </div>
                <SelectorBox heading='from' currencies={currencies} userInput={userInput} setUserInput={setUserInput} />
                <div id='arrow-container' onClick={switchCurrencyHandler}>
                    <span>
                        <FaArrowUpLong />
                        <FaArrowDownLong />
                    </span>
                </div>
                <SelectorBox heading='to' currencies={currencies} userInput={userInput} setUserInput={setUserInput} />
            </div>
            <button onClick={submitHandler}>Submit</button>
            {!loader
                ?
                <div className="result-container">
                    {
                        output &&
                        <div className="result-display">
                            <p>
                                <span>{output.amountToBeConverted}</span>
                                <span>{output.from}</span>
                                <span>=</span>
                                <span id='converted'>{output.convertedAmount}</span>
                                <span>{output.to}</span>
                            </p>
                            <p>Exchange rates at : <span>{output.rates}</span></p>
                        </div>
                    }
                </div>
                :
                <p id='loader'>
                    <span ></span>
                </p>
            }
        </div>
    );
}
export default Convertor;