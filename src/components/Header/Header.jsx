import React from 'react';
import logo from '../../assets/logo.svg'
import './styles.scss'

const Header = () => {
    return (
        <header className="header">
            <div className="container">
                <img src={logo} alt="logo" className="logo"/>
            </div>
        </header>
    )
}

export default Header 