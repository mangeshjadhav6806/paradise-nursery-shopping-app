import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { removeItem, selectCartItems, selectCartTotal, updateQuantity } from './CartSlice.jsx';

const money = (amount) => `$${amount.toFixed(2)}`;

export default function CartItem() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const [checkoutMessage, setCheckoutMessage] = useState('');

  if (!items.length) {
    return (
      <main className="cart-page page-shell empty-cart">
        <div className="empty-cart-icon"><ShoppingBag size={30} strokeWidth={1.4} /></div>
        <p className="eyebrow">Your basket is taking a breather</p>
        <h1>Nothing growing<br /><em>in here yet.</em></h1>
        <Link className="button button-dark" to="/plants">Explore the plants <ArrowLeft size={17} /></Link>
      </main>
    );
  }

  return (
    <main className="cart-page page-shell">
      <header className="cart-heading">
        <div><p className="eyebrow">Your little indoor jungle</p><h1>Shopping <em>cart.</em></h1></div>
        <Link className="text-link" to="/plants"><ArrowLeft size={16} /> Continue shopping</Link>
      </header>
      <div className="cart-layout">
        <section className="cart-items" aria-label="Items in your shopping cart">
          {items.map((item) => (
            <article className="cart-row" key={item.id}>
              <img src={`https://images.unsplash.com/${item.image}?auto=format&fit=crop&w=360&q=80`} alt={item.name} />
              <div className="cart-product-info">
                <p className="eyebrow">Houseplant</p>
                <h2>{item.name}</h2>
                <p>{money(item.price)} <span>each</span></p>
                <button className="remove-button" onClick={() => dispatch(removeItem(item.id))}><Trash2 size={14} /> Remove</button>
              </div>
              <div className="cart-quantity" aria-label={`Quantity of ${item.name}`}>
                <button aria-label={`Decrease ${item.name} quantity`} disabled={item.quantity <= 1} onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}><Minus size={15} /></button>
                <span>{item.quantity}</span>
                <button aria-label={`Increase ${item.name} quantity`} onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}><Plus size={15} /></button>
              </div>
              <strong className="cart-line-total">{money(item.price * item.quantity)}</strong>
            </article>
          ))}
        </section>
        <aside className="order-summary">
          <p className="eyebrow">The good stuff</p>
          <h2>Order summary</h2>
          <div className="summary-line"><span>Plants ({items.reduce((count, item) => count + item.quantity, 0)})</span><span>{money(total)}</span></div>
          <div className="summary-line"><span>Delivery</span><span>Calculated at checkout</span></div>
          <div className="summary-total"><span>Subtotal</span><strong>{money(total)}</strong></div>
          <button className="button button-dark checkout-button" onClick={() => setCheckoutMessage('Coming soon. Your plants are not going anywhere.')}>Checkout <span>↗</span></button>
          {checkoutMessage && <p className="checkout-message" role="status">{checkoutMessage}</p>}
          <p className="order-note">Carefully packed, ready to find a home.</p>
        </aside>
      </div>
    </main>
  );
}