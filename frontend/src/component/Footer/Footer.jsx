import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-right">
                    <img src={assets.logo} alt="" />
                    <p>Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Nemo obcaecati blanditiis
                        harum aperiam. Eveniet, quaerat nesciunt
                        quod maxime quidem iusto. Similique
                        ullam autem, nisi ipsum nemo soluta
                        iste ratione laboriosam?</p>
                        <div className="footer-content-social">
                            <img src={assets.facebook_icon} alt="" />
                            <img src={assets.twitter_icon} alt="" />
                            <img src={assets.linkedin_icon} alt="" />
                        </div>
                </div>
                <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>
                <div className="footer-content-left">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+1 123 456 7890</li>
                        <li>info@company.com</li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className="footer Copyright">
                &copy; 2023 Company Name- All rights reserved.
            </p>
        </div>
    )
}

export default Footer
