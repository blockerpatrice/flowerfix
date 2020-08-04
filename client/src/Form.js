import React, {useState} from 'react';
import PhoneInput from 'react-phone-number-input';
import axios from 'axios';
import {useHistory, withRouter} from "react-router-dom";

const Form = () => {
    const [phone,setPhone]=useState();
    const [clicked,setClick]=useState(false);
    //added button control to prevent multiple confirmation codes

    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        setClick(true);
        axios.get(`http://localhost:9000/?phoneNumber=${phone}`)
            .then(function (response) {
                history.push('/confirm');
                console.log(response);
            })
            .catch(function (error) {
            console.log(error);
        })

  }

    return(
        <div className="form-styles">
            <form onSubmit={handleSubmit}>
                <div className="one"> </div>
                <div className="two">Join the Club!</div>
                <div className="three">Great deals and exclusive offers via text.</div>
                <div className="four">
                    <p>1. Enter your cell phone</p>
                    <p>2. Create your account (1 minute)</p> 
                    <p>3. We text you exclusive offers</p>
                    <p>4. Reply "YES" to get the deal!</p>
                </div>

                <div className="five">
                    Cell Phone
                        <PhoneInput
                            autoComplete="off" 
                            country={"us"} 
                            defaultCountry="US" 
                            placeholder="(XXX)-XXX-XXXX" 
                            value={phone} 
                            className="phone-input" 
                            onChange={setPhone} 
                            maxLength="14"/>
                </div>
                <div className="six">
                    <input type="checkbox"></input>
                    <label>
                        By providing your mobile number, you consent to receive text message promotions
                        and product campaigns from FlowerFix (Powered By Textual), and you also agree to our
                        Privacy Policy and Terms. Standard messaging rates may apply.
                    </label>                   
                </div>

                <div className="seven">
                    <button type="submit" className="button" disabled={clicked}>Send Me Deals</button>
                </div>

                <div className="eight"></div>
            </form>
          </div>
    )
}

export default withRouter(Form);