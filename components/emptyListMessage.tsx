import { Headline } from 'react-native-paper';
import { styles } from '../styles/appStyles';
import { ALARM_STRINGS } from '../messages/appMessages';

const EmptyListMessage = () => {
    return (
        <Headline style={styles.listado}>
            {ALARM_STRINGS.noAlarmsSet}
        </Headline>
    )
}

export default EmptyListMessage;