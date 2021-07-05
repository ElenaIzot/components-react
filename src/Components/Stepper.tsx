import { useState } from 'react';

function Stepper(): JSX.Element {
    let [count, setCount] = useState(0);

    function increment():void {
        setCount(count + 1)
    }
    function decrement():void  {
        setCount(count - 1)
    }

    return (
        <div className="wrap">
            <p className="title">Stepper</p>
        <div className="stepper">
            <div className="stepper__item">
                <div className="stepper_btns">
                    <button className="btn-arrow stepper__btn" onClick={increment}><span className="btn-arrow__arrow-up"></span></button>
                    <button className="btn-arrow stepper__btn" onClick={decrement}><span className="btn-arrow__arrow-down"></span></button>
                </div>
                <div className="stepper__count">{count} px</div>
            </div>

            <div className="stepper__item">
                  <div className="stepper__count">{count}</div>
                <div className="stepper_btns">
                    <button className="btn-arrow stepper__btn" ><span className="btn-arrow__arrow-up"></span></button>
                    <button className="btn-arrow stepper__btn" ><span className="btn-arrow__arrow-down"></span></button>
                </div>
              
            </div>
         </div>   
        </div>
    )
};

export default Stepper;