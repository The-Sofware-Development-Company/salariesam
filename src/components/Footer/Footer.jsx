import React from 'react';
import SDClogo from '../../assets/sdc-logo.svg'
import './styles.scss'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <img src={SDClogo} alt="SDC logo" className="sdc-logo"/>
                <small className="fz14 fw600 c-black300">Powered by the SDC since 2019</small>
            </div>
        </footer>
    )
}

export default Footer 