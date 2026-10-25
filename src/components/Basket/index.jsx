import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { beers, formatPrice } from "../../utils/beers";
import "./style.scss";

const BasketContext = createContext(null);
export const DEPOSIT = 8;
const STORAGE_KEY = "burgbrau-basket-v1";

export function normalizeBasket(value) {
  return Object.fromEntries(beers.flatMap(({ id }) => {
    const quantity = value?.[id];
    return Number.isInteger(quantity) && quantity > 0 ? [[id, Math.min(quantity, 99)]] : [];
  }));
}

export function changeQuantity(current, id, delta) {
  if (!beers.some((beer) => beer.id === id)) return current;
  const next = { ...current, [id]: Math.max(0, Math.min(99, (current[id] || 0) + delta)) };
  if (!next[id]) delete next[id];
  return next;
}

export function calculateTotals(quantities) {
  const count = beers.reduce((sum, beer) => sum + (quantities[beer.id] || 0), 0);
  const subtotal = beers.reduce((sum, beer) => sum + beer.price * (quantities[beer.id] || 0), 0);
  return { count, subtotal, deposit: count * DEPOSIT, total: subtotal + count * DEPOSIT };
}

export function BasketProvider({ children }) {
  const [quantities, setQuantities] = useState(() => {
    try { return normalizeBasket(JSON.parse(localStorage.getItem(STORAGE_KEY))); }
    catch { return {}; }
  });
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(quantities)); } catch { /* Basket still works without storage. */ }
  }, [quantities]);
  const add = useCallback((id) => {
    const beer = beers.find((item) => item.id === id);
    if (!beer) return;
    setQuantities((current) => changeQuantity(current, id, 1));
    setMessage(`${beer.title} selected. Basket updated.`);
  }, []);
  const adjust = (id, delta) => setQuantities((current) => changeQuantity(current, id, delta));
  const remove = (id) => setQuantities((current) => {
    const next = { ...current }; delete next[id]; return next;
  });
  const totals = calculateTotals(quantities);
  return (
    <BasketContext.Provider value={{ quantities, add, count: totals.count, openBasket: () => setIsOpen(true) }}>
      {children}
      {totals.count > 0 && !isOpen && <button className="basket-shortcut" type="button" aria-haspopup="dialog" onClick={() => setIsOpen(true)}>Basket ({totals.count}) <span>{formatPrice(totals.total)}</span></button>}
      <div className="basket-announcement" role="status" aria-live="polite">{message} {totals.count > 0 ? `${totals.count} bottles in basket.` : ""}</div>
      <BasketDrawer {...{ quantities, totals, add, adjust, remove, isOpen }} onClose={() => setIsOpen(false)} />
    </BasketContext.Provider>
  );
}

export const useBasket = () => useContext(BasketContext);

function BasketDrawer({ quantities, totals, add, adjust, remove, isOpen, onClose }) {
  const dialogRef = useRef(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!isOpen) { if (dialog.open) dialog.close(); return; }
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    dialog.showModal();
    return () => {
      document.documentElement.style.overflow = previousOverflow;
      if (dialog.open) dialog.close();
    };
  }, [isOpen]);

  const saveOrder = () => {
    const lines = beers.filter((beer) => quantities[beer.id]).map((beer) => `${quantities[beer.id]} x ${beer.title} (${beer.subtitle}, 330 ml) - ${formatPrice(beer.price * quantities[beer.id])}`);
    const content = ["BURGBRÄU / YOUR BEER SELECTION", "", ...lines, "", `Beer subtotal: ${formatPrice(totals.subtotal)}`, `Refundable bottle deposit: ${formatPrice(totals.deposit)}`, `Total before shipping: ${formatPrice(totals.total)}`, "", "Selection only. No order has been placed or payment taken. Ordering opens soon."].join("\n");
    const url = URL.createObjectURL(new Blob([content], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url; link.download = "burgbrau-order-list.txt"; link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return createPortal(
    <dialog className="basket" ref={dialogRef} aria-labelledby="basket-title" onCancel={onClose} onClose={onClose} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }} onWheel={(event) => event.stopPropagation()} onTouchMove={(event) => event.stopPropagation()}>
      <div className="basket__panel">
        <header className="basket__header"><div><span className="basket__eyebrow">Good beer. Your selection.</span><h2 id="basket-title">Your basket <span>({totals.count})</span></h2></div><button className="basket__close" type="button" onClick={onClose} aria-label="Close basket">×</button></header>
        <div className="basket__scroll">
          {totals.count === 0 ? <div className="basket__empty"><h3>A good round starts here.</h3><p>Your basket is empty. Pick a beer below to get started.</p></div> : <ul className="basket__items">{beers.filter((beer) => quantities[beer.id]).map((beer) => (
            <li className="basket__item" key={beer.id}>
              <img src={beer.bottle} alt="" />
              <div className="basket__item-copy"><h3>{beer.title}</h3><p>{beer.subtitle} · 330 ml · {formatPrice(beer.price)}</p><div className="basket__controls"><div className="basket__stepper"><button type="button" aria-label={`Decrease ${beer.title} quantity`} onClick={() => adjust(beer.id, -1)}>−</button><span aria-label={`${beer.title} quantity`}>{quantities[beer.id]}</span><button type="button" disabled={quantities[beer.id] >= 99} aria-label={`Increase ${beer.title} quantity`} onClick={() => add(beer.id)}>+</button></div><button className="basket__remove" type="button" onClick={() => remove(beer.id)} aria-label={`Remove ${beer.title}`}>Remove</button></div></div>
              <strong>{formatPrice(beer.price * quantities[beer.id])}</strong>
            </li>
          ))}</ul>}
          <div className="basket__quick"><div className="basket__section-title"><h3>Build your round</h3><span>Quick add / 330 ml</span></div>{beers.map((beer) => (
            <div className="basket__suggestion" key={beer.id}><img src={beer.bottle} alt="" /><div><h4>{beer.title}</h4><p>{beer.subtitle} · {formatPrice(beer.price)}</p></div><button type="button" disabled={quantities[beer.id] >= 99} aria-label={`Quick add ${beer.title}`} onClick={() => add(beer.id)}>+ Add</button></div>
          ))}</div>
        </div>
        <footer className="basket__footer"><div><span>Beer subtotal</span><span>{formatPrice(totals.subtotal)}</span></div><div><span>Bottle deposit (€0.08 each)</span><span>{formatPrice(totals.deposit)}</span></div><div className="basket__total"><strong>Total</strong><strong>{formatPrice(totals.total)}</strong></div><p>330 ml bottles. Shipping not included. Ordering opens soon; save your selection for later.</p><button className="basket__save" type="button" disabled={!totals.count} onClick={saveOrder}>Save order list <span>↓</span></button></footer>
      </div>
    </dialog>, document.body
  );
}
