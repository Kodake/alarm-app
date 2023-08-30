import React from 'react';
import { List } from 'react-native-paper';
import { styles } from '../styles/appStyles';
import { Props } from '../interfaces/appInterfaces';
import { Alert } from 'react-native';
import { CONFIRMATION_MESSAGES } from '../messages/appMessages';
import store from '../store/sharedStateStore';
import moment from 'moment';

const AlarmListItem: React.FC<Props> = ({ item }) => {
    const handleSetAlarm = async (item: Date) => {
        store.displayNotification(item);
    }

    const handleDeleteAlarm = async (item: Date) => {
        Alert.alert(
            CONFIRMATION_MESSAGES.deleteConfirmation,
            CONFIRMATION_MESSAGES.deleteConfirmationDescription,
            [
                { text: CONFIRMATION_MESSAGES.deleteConfirmationYes, onPress: async () => store.deleteSelectedDate(item) },
                { text: CONFIRMATION_MESSAGES.deleteConfirmationCancel, style: 'cancel' },
            ],
        )
    }

    return (
        <List.Item
            titleStyle={styles.textColor}
            descriptionStyle={styles.textColor}
            style={styles.item}
            key={item.toString()}
            title={moment(item).format('YYYY/MM/DD')}
            description={moment(item).format('HH:mm')}
            onLongPress={() => handleDeleteAlarm(item)}
            onPress={() => { handleSetAlarm(item) }}
        />
    );
};

export default AlarmListItem;
