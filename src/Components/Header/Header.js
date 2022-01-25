import React from 'react';
import './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import { ShoppingBasket } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useStateValue } from '../Context-Reducer/StateProvider';
import { signOut } from "firebase/auth";
import { auth } from '../Login/Login';

const Header = () => {
    // const [state,dispatch]=useStateValue();
    const [{ basket, user }, dispatch] = useStateValue();

    const handleAuthentication = () => {
        if (user) {
            signOut(auth)
            .then(() => {
        
            }).catch((error) => {
                alert(error.message);
            });
        }
    }

    return (
        <div className="header">
            <Link to='/'>
                <img className="header_logo" src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="" />
            </Link>
            <div className="header_search">
                <input className="header_searchInput" type="text" />
                <SearchIcon className="header_searchIcon" />
            </div>
            <div className="header_nav">
            {/* !user means user jodi null hoi, r if(user) means user jodi takhe mane null na hoi,,,,r if(!user) means user jodi na takhe mane user jodi null hoi */}
                <Link to={!user && '/login'}>  
                    <div onClick={handleAuthentication} className="header_option">
                        <span className="header_optionLineOne">
                            {/* user null hole means user na takle mane !user, r user takle ba true hole ba null na hole hobe user.email mane user ? user.email : "guest" */}
                            {/* user?.email || "Guest" */}
                            Hello {!user ? "Guest" : user.email}
                        </span>
                        <span className="header_optionLineTwo">

                            {user ? "Sign Out" : "Sign In"}

                        </span>
                    </div>
                </Link>
                <div className="header_option">
                    <span className="header_optionLineOne">
                        Returns
                    </span>
                    <span className="header_optionLineTwo">
                        & Orders
                    </span>
                </div>
                <div className="header_option">
                    <span className="header_optionLineOne">
                        Your
                    </span>
                    <span className="header_optionLineTwo">
                        Prime
                    </span>
                </div>

                <Link to='/checkout'>
                    <div className="header_optionBusket">
                        <ShoppingBasket />
                        <span className="header_optionLineTwo header_busketCount">{basket?.length}</span>
                        {/* <span className="header_optionLineTwo header_busketCount">{basket ? basket.length : 0}</span> */}
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Header;