import React from 'react';
import { View, FlatList } from 'react-native';
import { FAB, Headline, PaperProvider } from 'react-native-paper';
import { TimePickerModal } from 'react-native-paper-dates';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { styles } from './styles/appStyles';
import { theme } from './theme/appThemes';
import { observer } from 'mobx-react';
import { ALARM_STRINGS, ALERT_MESSAGES } from './messages/appMessages';
import EmptyListMessage from './components/emptyListMessage';
import AlarmListItem from './components/alarmListItem';
import store from './store/sharedStateStore';

const App = () => {
  const onDismiss = () => {
    store.setVisibility(false);
  };

  const onConfirm = ({ hours, minutes }: { hours: number; minutes: number }) => {
    
    const newDate = store.createNewDate(hours, minutes);
    
    if (!store.hasDuplicateTime(newDate)) {
      store.setVisibility(false);
      store.addSelectedDate(newDate);
    } else {
      store.showDuplicateAlert();
    }
  };

  return (
    <>
      <PaperProvider theme={theme}>
        <Headline style={styles.titulo}>{ALARM_STRINGS.title}</Headline>
        <FlatList
          centerContent
          ListEmptyComponent={EmptyListMessage}
          data={store.selectedDates}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }: { item: Date }) => (
            <AlarmListItem item={item} />
          )}
        />
        <SafeAreaProvider>
          <View style={styles.container}>
            <FAB
              animated
              color='white'
              style={styles.fab}
              icon='plus'
              onPress={() => store.setVisibility(true)}
            />
            <TimePickerModal
              animationType='fade'
              inputFontSize={20}
              visible={store.isVisible}
              onDismiss={onDismiss}
              onConfirm={onConfirm}
            />
          </View>
        </SafeAreaProvider>
      </PaperProvider>
    </>
  );
};

export default observer(App);
