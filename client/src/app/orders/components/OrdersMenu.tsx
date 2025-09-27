import React from 'react';

import { ShoppingCart, Hamburger, UserRound } from 'lucide-react';

interface OrdersMenuProps {
  orderSection: string;
  setOrderSection: (section: string) => void;
  numberOfShoppedItems: number;
  cartRef?: React.RefObject<HTMLDivElement | null>;
}

export default function OrdersMenu({
  orderSection,
  setOrderSection,
  numberOfShoppedItems,
  cartRef,

}: OrdersMenuProps) {

  return (
    <div
      className="glass-card d-flex w-100 gap-3 justify-content-center mx-5 rounded-pill"
      style={{
        backgroundColor: 'rgba(220, 24, 44, 0.8)',
        maxWidth: '600px',
      }}
    >
      <div
        className="p-3"
        style={{ opacity: orderSection == "Profile" ? 1 : 0.6 }}
        onClick={() => setOrderSection("Profile")}
      >
        <UserRound size={30} color={"white"}/>
      </div>
      <div
        className="p-3"
        style={{ opacity: orderSection == "NewOrder" ? 1 : 0.6 }}
        onClick={() => setOrderSection("NewOrder")}
      >
        <Hamburger size={30} color={"white"} />
      </div>
      <div
        className="p-3"
        style={{ opacity: orderSection == "Cart" ? 1 : 0.6 }}
        ref={cartRef}
        onClick={() => setOrderSection("Cart")}
      >
        <ShoppingCart size={30} color={"white"} />
        <p
          className="m-0 p-0 position-absolute translate-middle badge rounded-pill"
          style={{
            fontSize: '1rem',
            opacity: numberOfShoppedItems > 0 ? 1 : 0,
          }}
        >
          {numberOfShoppedItems}
        </p>
      </div>
    </div>
  );
}