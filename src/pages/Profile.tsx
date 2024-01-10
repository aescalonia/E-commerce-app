import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonItem, IonLabel, IonAvatar, IonButtons, IonMenuButton, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const Profile: React.FC = () => {
    const history = useHistory();

    const handleBack = () => {
        history.push('/products');
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Profile</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonCard style={{ margin: '0 auto', maxWidth: '350px', textAlign: 'center' }}>
                    <IonCardContent>
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                            <IonAvatar style={{ width: '250px', height: '250px', border: '2px solid #000', borderRadius: '50%', overflow: 'hidden' }}>
                                <img src="https://cdn.discordapp.com/attachments/834346893495762944/1164059830688948295/20231018_113705.jpg?ex=6541d632&is=652f6132&hm=1087cd51663ce4272837c1ccdeb5e250b298e51940c5f0730107e0f829a8ab1c&" alt="profile" />
                            </IonAvatar>
                        </div>
                        <IonItem>
                            <IonLabel style={{ textAlign: 'center' }}>Areta Escalonia Candra</IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonLabel style={{ textAlign: 'center' }}>00000057872</IonLabel>
                        </IonItem>
                    </IonCardContent>
                </IonCard>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <IonButton onClick={handleBack}>Back to home</IonButton>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Profile;
