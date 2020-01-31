import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { ReactComponent as Logo } from '../../assets/crown.svg';
import { auth } from '../../firebase/firebase.utils';

import './header.styles.scss';

const Header = ({ currentUser, dian }) => (
    <div className='header'>    
        <Link className='logo-container' to="/">
            <Logo className='logo' />
        </Link>
        <div className='options'>
            <Link className='option' to='/shop'>SHOP</Link>
            <Link className='option' to='/shop'>CONTACT</Link>
            <Link className='option' to='/sign-in'>SIGN IN</Link>         
            {console.log('hi', dian)}     
            {
                currentUser ?
                <div className='option' onClick={() => auth.signOut()}>SIGN OUT</div>
                :
                <Link className='option' to='/sign-in'>SIGN IN</Link>
            }
        </div>
    </div>
)

const mapStateToProps = state => ({    
    currentUser: state.user.currentUser,
    dian: state.user.dian    
});

export default connect(mapStateToProps)(Header);