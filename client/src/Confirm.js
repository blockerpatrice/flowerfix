import React, {useState} from 'react';
import {withRouter, Link} from 'react-router-dom';
import axios from 'axios';
import {Checkmark} from 'react-checkmark';
import {useAlert} from 'react-alert';

const Confirm = () => {
    const [code,setCode] = useState("");
    const [success,setSuccess] = useState(null);

    const alert = useAlert();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("test")
        axios.get(`http://localhost:9000/confirm?confirm=${code}`)
            .then((response) => {
                response.data === "approved" ? setSuccess(true) : alert.show("Please enter a valid Number",{onClose: () => {window.location.reload();}});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    return success ? (
        <div className="success">
            <Checkmark size='xxLarge'/>
            <div className="success-text">Phone Number Confirmed!</div>
            <div className="confirm-two">
                <button className="confirm-button">
                    <Link to="/">Retry</Link> 
                </button>
            </div>
        </div>
    ) : (
        <div className="confirm">
            <form onSubmit={handleSubmit}>
                <div className="confirm-one">
                    <input type="text" className="confirm-code" maxLength="4" value={code} onChange={e=>setCode(e.target.value)}></input>
                </div>
                <div className="confirm-two">
                    <button type="submit" className="confirm-button"> Confirm Phone Number</button>
                </div>
            </form>
        </div>
        
    )
}

export default withRouter(Confirm);