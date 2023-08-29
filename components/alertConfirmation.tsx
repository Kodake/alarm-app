import { Alert } from 'react-native'
import { CONFIRMATION_MESSAGES } from '../messages/appMessages';
import store from '../store/sharedStateStore';

const AlertConfirmation = (item: Date) => {
    return (
        Alert.alert(
            CONFIRMATION_MESSAGES.deleteConfirmation,
            CONFIRMATION_MESSAGES.deleteConfirmationDescription,
            [
                { text: CONFIRMATION_MESSAGES.deleteConfirmationYes, onPress: () => store.deleteSelectedDate(item) },
                { text: CONFIRMATION_MESSAGES.deleteConfirmationCancel, style: 'cancel' },
            ],
        )
    )
}

export default AlertConfirmation;