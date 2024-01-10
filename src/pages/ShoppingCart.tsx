import React, { useState, useEffect } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonButtons,
  IonMenuButton,
  IonIcon,
  IonCard,
  IonCardContent
} from '@ionic/react';
import { useContext } from 'react';
import ProductsContext from '../data/product-context';
import { Cart, CartItem } from '../data/product-context';

const ShopCart: React.FC = () => {
  const productsContext = useContext(ProductsContext);
  const cart: Cart[] = productsContext?.cart || [];
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [cartItem, setCartItem] = useState<CartItem[]>([]);

  useEffect(() => {
    let price = 0;
    if (cart) {
      cart.forEach((item) => {
        price += item.price * item.quantity;
      });
    }
    setTotalPrice(price);
  }, [cart]);

  const addCart = (cartItem: Cart) => {
    productsContext?.addCart(cartItem);
    setTotalPrice(totalPrice + cartItem.price);
  };

  const removeCart = (cartItem: Cart) => {
    if (cartItem.quantity > 1) {
      productsContext?.removeCart(cartItem);
      setTotalPrice(totalPrice - cartItem.price);
    }
  };

  const handleCheckout = () => {
    productsContext?.checkout(cartItem);
  }
  

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Cart</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {!cart || cart.length === 0 ? (
          <>
            <p>Cart is empty</p>
            <IonButton routerLink="/products">Go to Products</IonButton>
          </>
        ) : (
          <>
            <IonList>
              {cart.map((item) => (
                <IonItem key={item.id}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: '50px', height: '50px', marginRight: '10px' }}
                  />
                  <IonLabel
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}
                  >
                    <div>
                      {item.name} - ${item.price}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <IonButton onClick={() => removeCart(item)}>-</IonButton>
                      <span style={{ marginRight: '5px', marginLeft: '5px' }}>{item.quantity}</span>
                      <IonButton onClick={() => addCart(item)}>+</IonButton>
                    </div>
                  </IonLabel>
                </IonItem>
              ))}
            </IonList>
            <hr />
            <IonCard>
              <IonCardContent>
                <p style={{ textAlign: 'center' }}>Total Price: ${totalPrice.toFixed(2)}</p>
              </IonCardContent>
              <IonButton expand="full" onClick={handleCheckout}>
                Checkout
              </IonButton>
            </IonCard>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ShopCart;
