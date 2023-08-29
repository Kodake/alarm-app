import { Alert } from 'react-native'
import { ALERT_MESSAGES } from '../messages/appMessages';

const AlertTime = () => {
    return (
        Alert.alert(
            ALERT_MESSAGES.error,
            ALERT_MESSAGES.duplicatedAlarm,
            [
                { text: ALERT_MESSAGES.confirmationOk, style: 'cancel' },
                { text: ALERT_MESSAGES.confirmationCancel, style: 'cancel' },
            ],
        )
    )
}

export default AlertTime;