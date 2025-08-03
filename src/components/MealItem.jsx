import {currencyFormatter} from '../util/formatting.js'
import Button from './UI/Button.jsx';
import CartContext from '../store/CartContext.jsx';
import { useContext } from 'react';
const MealItem = ({ meal }) => {
  const cartCtx=useContext(CartContext)
  function handleAddMealToCart()
  {
      cartCtx.addItem(meal);
  }
  return (
    <li className="meal-item">
      <article>
        <img src={`https://food-ordering-backend-3.onrender.com/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">{currencyFormatter.format(meal.price)}</p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={handleAddMealToCart}>Add to cart</Button>
        </p>
      </article>
    </li>
  );
};
export default MealItem;
