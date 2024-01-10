import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle, IonRouterOutlet, IonToggle, IonTabButton, IonTabs, IonTitle, IonToolbar, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import React, { useState } from 'react';
import Home from './pages/Home';
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './theme/variables.css';
import Products from './pages/Product';
import { star, book, person, moon } from 'ionicons/icons';
import History from './pages/History';
import Wishlist from './pages/Wishlist';
import Profile from './pages/Profile';
import ShoppingCart from './pages/ShoppingCart';
import ProductsContextProvider from './data/ProductsContextProvider';

setupIonicReact();

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme'); 
    }
  };

  return (
  <IonApp>
    <IonReactRouter>
      <IonMenu contentId="main">
        <IonHeader>
          <IonToolbar>
            <IonItem button routerLink="/products">
                <IonLabel>Reta's Album Shop</IonLabel>
              </IonItem>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonMenuToggle>
              <IonItem button routerLink="/wishlist">
                <IonIcon slot="start" icon={star} />
                <IonLabel>Wishlist</IonLabel>
              </IonItem>
              <IonItem button routerLink="/history">
                <IonIcon slot="start" icon={book} />
                <IonLabel>History</IonLabel>
              </IonItem>
              <IonItem button routerLink="/profile">
                <IonIcon slot="start" icon={person} />
                <IonLabel>Profile</IonLabel>
              </IonItem>
              <IonItem>
                <IonIcon slot="start" icon={moon} />
                  <IonLabel>Dark theme</IonLabel>
                <IonToggle slot="end" checked={darkMode} onIonChange={toggleDarkMode} />
              </IonItem>
            </IonMenuToggle>
          </IonList>
        </IonContent>
      </IonMenu>
      <ProductsContextProvider>
      <IonRouterOutlet id='main'>
          <Route path="/products" component={Products} />
          <Route path="/products/:productId" component={Products} />
          <Route exact path="/home" component={Products} />
          <Route exact path='/history' component={History} />
          <Route exact path='/wishlist' component={Wishlist} />
          <Route exact path='/profile' component={Profile} />
          <Route path="/shopping-cart" component={ShoppingCart} />
          <Redirect exact from="/" to="/products" />
        </IonRouterOutlet>
      </ProductsContextProvider>
    </IonReactRouter>
  </IonApp>
);
};

export default App;

