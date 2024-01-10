import React from 'react';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent
} from '@ionic/react';
import { useContext } from 'react';
import ProductsContext from '../data/product-context';

const History: React.FC = () => {
  const productsContext = useContext(ProductsContext);
  const { history } = productsContext || {};

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>History</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {history && history.map((transaction, index) => (
          <IonCard
            key={index}
            style={{
              width: '80%',
              margin: '0 auto',
              borderRadius: '10px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.26)' }}
          >
            <IonCardHeader>
              <IonCardTitle>Transaction Code: {transaction.code}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                {transaction.products.map((product, idx) => (
                  <IonItem key={idx}>
                    <IonLabel>
                      {product.name} -  ({product.quantity}x) - Price: ${product.price}
                    </IonLabel> 
                  </IonItem>
                ))}
              </IonList>
              <p>Total Price: ${transaction.products.reduce((total, product) => total + product.price * product.quantity, 0)}</p>
            </IonCardContent>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default History;
