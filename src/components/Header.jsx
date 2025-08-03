import { useContext } from 'react';
import logoImg from '../assets/logo.jpg'
import Button from './UI/Button';
import CartContext from '../store/CartContext';
import UserProgressContext from '../util/UserProgressContext';
const Header = () => {

  const cartCtx=useContext(CartContext);
  const userProgressCtx=useContext(UserProgressContext)
  const handleShowCart=()=>{
   
    userProgressCtx.showCart();
  }
  const totalCartItems=cartCtx.items.reduce((totalNumberOfItems,item)=>{
      return totalNumberOfItems+item.quantity;
  },0);
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt='A restaurant'></img>
        <h1>ReactFood</h1>
      </div>
      <nav>
        <Button textOnly={true} onClick={handleShowCart}>Cart ({totalCartItems})</Button>
      </nav>
    </header>
  );
};
export default Header;
