import { useState } from "react";

function Dropdown(props: any): JSX.Element {
    let [value, setValue] = useState('Choose option');
    let [visible, setVisible] = useState(false);

    function showItems():void {
        setVisible(true);
    };

    function closeItems():void {
        setVisible(false);
    };

    const listItems = props.name.map((name: string, index: number) =>
        <li className="dropdown__item" key={index} onClick={(e) => {setValue(value=name)}}>{name}</li>
    );

    if (visible == true) {
        return (
            <div className="wrap">
                <p className="title">Dropdown</p>
                <div className="dropdown">
                    <div className="dropdown__current-item">{value}</div>
                    <button className="btn-arrow dropdown__btn" onClick={closeItems}><span className="btn-arrow__arrow-up"></span></button>
                </div>
                <div className="dropdown__dropdown-visible">
                    <ul className="dropdown__list">
                        {listItems}
                    </ul>
                </div>
            </div>)
    } else {
        return (
            <div className="wrap">
                <p className="title">Dropdown</p>
                <div className="dropdown">
                    <div className="dropdown__current-item">{value}</div>
                    <button className="btn-arrow dropdown__btn" onClick={showItems}><span className="btn-arrow__arrow-down"></span></button>
                </div>
            </div>
        )
    }
}

export default Dropdown;