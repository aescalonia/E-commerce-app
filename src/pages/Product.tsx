import React, { useContext, useRef } from 'react';
import { IonButton, IonCard, IonCardContent, IonContent, IonGrid, IonHeader, IonImg, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import { IonIcon } from "@ionic/react";
import { star, add, cart } from "ionicons/icons";
import ProductsContext, { Product as ProductType } from "../data/product-context";
import { useHistory } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/swiper-bundle.css';

const Product: React.FC = () => {
    const productsContext = useContext(ProductsContext);
    const { products } = productsContext || { products: [] };
    const history = useHistory();

    const handleAddProduct = (productId: string) => {
        productsContext?.addProduct(productId);
    };

    const handleAddToWishlist = (productId: string) => {
        productsContext?.addWishlist(productId);
    };

    const navigateToCart = () => {
        history.push('/shopping-cart');
    };

    const renderProducts = (products: ProductType[]) => {
        return products.map((product) => (
            <IonCard key={product.id} style={{ width: '200px', height: '350px', margin: '30px' }}>
                <IonImg style={{ width: '100%', height: '70%' }} src={product.image} />
                <IonCardContent className="ion-text-center" style={{ height: '30%' }}>
                    <h2>{product.name}</h2>
                    <p>{`$${product.price}`}</p>
                    <IonButton onClick={() => handleAddToWishlist(product.id)}>
                        <IonIcon icon={star} />
                    </IonButton>
                    <IonButton onClick={() => handleAddProduct(product.id)}>
                        <IonIcon icon={add}/>
                    </IonButton>
                </IonCardContent>
            </IonCard>
        ));
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonMenuButton slot="start" />
                    <IonTitle>Reta's Album Shop</IonTitle>
                    <IonIcon
                        slot="end"
                        icon={cart}
                        onClick={navigateToCart}
                        style={{ paddingRight: "20px", fontSize: "20px" }}
                        />
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 3000 }}
                >
                    <SwiperSlide>
                        <IonCard style={{ width: '100%', height: '200px' }}>
                            <IonImg style={{ width: '100%', height: '100%', objectFit: 'cover' }}src="https://www.thepinknews.com/wp-content/uploads/2019/11/harry_styles_trans_rights.jpeg" />
                        </IonCard>
                    </SwiperSlide>
                    <SwiperSlide>
                        <IonCard style={{ width: '100%', height: '200px' }}>
                            <IonImg style={{ width: '100%', height: '100%', objectFit: 'cover' }}src="https://64.media.tumblr.com/969bdc17b850f6760b1adc68caf63d7a/012daaa21e5fe311-9b/s1280x1920/5250f394587c6b84086bb542ad89ea9a22752fd0.jpg" />
                        </IonCard>
                    </SwiperSlide>
                    <SwiperSlide>
                        <IonCard style={{ width: '100%', height: '200px' }}>
                            <IonImg style={{ width: '100%', height: '100%', objectFit: 'cover' }}src="https://miro.medium.com/v2/resize:fit:851/1*mHr0Hx4zEbzSJI7UdWV5aA.png" />
                        </IonCard>
                    </SwiperSlide>
                    <SwiperSlide>
                        <IonCard style={{ width: '100%', height: '200px' }}>
                            <IonImg style={{ width: '100%', height: '100%', objectFit: 'cover' }}src="https://cdc.s3-id-jkt-1.kilatstorage.id/2022/08/NIKI-Nicole.jpg" />
                        </IonCard>
                    </SwiperSlide>
                    <SwiperSlide>
                        <IonCard style={{ width: '100%', height: '200px' }}>
                            <IonImg style={{ width: '100%', height: '100%', objectFit: 'cover' }}src="https://akcdn.detik.net.id/visual/2022/07/12/musisi-keshi-1_169.jpeg?w=650" />
                        </IonCard>
                    </SwiperSlide>
                </Swiper>
                <IonGrid>
                    {[products.slice(0, 3), products.slice(3, 6), products.slice(6, 9), products.slice(9, 12)].map(
                        (productRow, index) => (
                            <IonRow key={index} className="ion-justify-content-center">
                                {renderProducts(productRow)}
                            </IonRow>
                        )
                    )}
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Product;
