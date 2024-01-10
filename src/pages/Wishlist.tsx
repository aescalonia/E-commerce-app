import React, { useContext } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButtons, IonMenuButton, IonIcon, IonItemSliding, IonItemOptions, IonItemOption } from '@ionic/react';
import { trash, cart } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import ProductsContext, { Wishlist, Product } from '../data/product-context';

const Wish: React.FC = () => {
    const productsContext = useContext(ProductsContext);
    const wishlist: Wishlist[] = productsContext?.wishlist || [];
    const history = useHistory();

    const handleRemoveWishlist = (productId: string) => {
        productsContext?.removeWishlist(productId);
    };

    const handleAddProduct = (productId: string) => {
        productsContext?.addProduct(productId);
    };
    
    const getProductById = (productId: string): Product | undefined => {
        return productsContext?.products.find(product => product.id === productId);
    };

    const navigateToCart = () => {
        history.push('/shopping-cart');
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Wishlist</IonTitle>
                    <IonIcon
                        slot="end"
                        icon={cart}
                        onClick={navigateToCart}
                        style={{ paddingRight: "20px", fontSize: "20px" }}
                    />
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                {wishlist.length === 0 ? (
                    <p>Wishlist is empty</p>
                ) : (
                    <IonList lines="full">
                        {wishlist.map((item) => (
                            <IonItemSliding key={item.id} style={{ marginBottom: '10px' }}>
                                <IonItem style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px' }}>
                                    {getProductById(item.id) && (
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <img src={getProductById(item.id)?.image} alt="product" 
                                                style={{ width: '70px', height: '70px', marginRight: '10px' }} />
                                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                                <IonLabel>{getProductById(item.id)?.name}</IonLabel>
                                                <p style={{ fontSize: '14px', margin: '0' }}>{`$${getProductById(item.id)?.price}`}</p>
                                            </div>
                                        </div>
                                    )}
                                </IonItem>
                                <IonItemOptions side="start" style={{ width: '70px', height: '100%' }}>
                                    <IonItemOption color="secondary" 
                                                    style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} 
                                                    onClick={() => handleAddProduct(item.id)}>
                                        <IonIcon icon={cart} size="large" />
                                    </IonItemOption>
                                </IonItemOptions>
                                <IonItemOptions side="end" style={{ width: '70px', height: '100%' }}>
                                    <IonItemOption color="danger" 
                                                    style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} 
                                                    onClick={() => handleRemoveWishlist(item.id)}>
                                        <IonIcon icon={trash} size="large" />
                                    </IonItemOption>
                                </IonItemOptions>
                            </IonItemSliding>
                        ))}
                    </IonList>
                )}
            </IonContent>
        </IonPage>
    );
};

export default Wish;
