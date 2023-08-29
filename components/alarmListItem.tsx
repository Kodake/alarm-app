import React from 'react';
import { List } from 'react-native-paper';
import { styles } from '../styles/appStyles';
import { Props } from '../interfaces/appInterfaces';
import store from '../store/sharedStateStore';
import moment from 'moment';

const AlarmListItem: React.FC<Props> = ({ item, alertConfirmation }) => {
    const handleSetAlarm = async (item: Date) => {
        console.warn('Hello buddy');
        store.displayNotification(item, item.toString());
    }

    return (
        <List.Item
            style={styles.item}
            key={item.toString()}
            title={moment(item).format('YYYY/MM/DD')}
            description={moment(item).format('HH:mm')}
            onLongPress={() => alertConfirmation(item)}
            onPress={() => { handleSetAlarm(item) }}
        />
    );
};

export default AlarmListItem;
