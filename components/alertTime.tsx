import { Alert } from 'react-native'
import { ALERT_MESSAGES } from '../messages/appMessages';

const AlertTime = (title: string, message: string) => {
    return (
        Alert.alert(
            title,
            message,
            [
                { text: ALERT_MESSAGES.confirmationOk, style: 'cancel' },
                { text: ALERT_MESSAGES.confirmationCancel, style: 'cancel' },
            ],
        )
    )
}

export default AlertTime;