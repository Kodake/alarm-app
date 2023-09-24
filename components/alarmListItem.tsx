import React, { useState } from 'react';
import { List, Switch } from 'react-native-paper';
import { styles } from '../styles/appStyles';
import { Props } from '../interfaces/appInterfaces';
import { Alert } from 'react-native';
import { CONFIRMATION_MESSAGES } from '../messages/appMessages';
import store from '../store/sharedStateStore';
import moment from 'moment';

const AlarmListItem: React.FC<Props> = ({ item }) => {
    const [alarmState, setAlarmState] = useState<boolean>(false);

    const onToggleSwitch = async (item: Date) => {
        setAlarmState(!alarmState)
        if (!alarmState) {
            handleSetAlarm(item);
        } else {
            handleCancelAlarm(item);
        }
    };

    const handleSetAlarm = async (item: Date) => {
        store.displayNotification(item);
    };

    const handleCancelAlarm = async (item: Date) => {
        store.cancelNotification(item);
    };

    const handleDeleteAlarm = async (item: Date) => {
        store.deleteSelectedDate(item);
    };

    const handleConfirmAlarm = async (item: Date) => {
        Alert.alert(
            CONFIRMATION_MESSAGES.deleteConfirmation,
            CONFIRMATION_MESSAGES.deleteConfirmationDescription,
            [
                { text: CONFIRMATION_MESSAGES.deleteConfirmationYes, onPress: async () => handleDeleteAlarm(item) },
                { text: CONFIRMATION_MESSAGES.deleteConfirmationCancel, style: 'cancel' },
            ],
        );
    };

    return (
        <>
            <List.Item
                titleStyle={styles.textColor}
                descriptionStyle={styles.textColor}
                style={styles.item}
                key={item.toString()}
                title={moment(item).format('HH:mm')}
                onLongPress={() => handleConfirmAlarm(item)}
                right={() => (
                    <Switch
                        value={alarmState}
                        onValueChange={() => onToggleSwitch(item)}
                    />
                )}
            />
        </>
    );
};

export default AlarmListItem;
