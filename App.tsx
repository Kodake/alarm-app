import { useCallback, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import { FAB, Headline, PaperProvider } from 'react-native-paper';
import { TimePickerModal } from 'react-native-paper-dates';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { styles } from './styles/appStyles';
import { theme } from './theme/appThemes';

const App = () => {
  const [visible, setVisible] = useState(false);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  const onDismiss = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const onConfirm = useCallback(
    ({ hours, minutes }: { hours: number; minutes: number }) => {
      setVisible(false);
      const newDate = new Date();
      newDate.setDate(newDate.getDate() + 1);
      newDate.setHours(hours, minutes);

      setSelectedDates((prevDates) => [...prevDates, newDate]);
    },
    [setVisible, setSelectedDates],
  );

  return (
    <>
      <PaperProvider theme={theme}>
        <Headline style={styles.titulo}>
          Alarmas
        </Headline>
        <FlatList
          data={selectedDates}
          renderItem={({ item }) => <Text style={styles.item}>{item.toString()}</Text>}
          keyExtractor={(item) => item.toString()}
        />
        <SafeAreaProvider>
          <View style={styles.container}>
            <FAB
              animated
              color='white'
              style={styles.fab}
              icon="plus"
              onPress={() => setVisible(true)}
            />

            <TimePickerModal
              animationType='fade'
              inputFontSize={20}
              visible={visible}
              onDismiss={onDismiss}
              onConfirm={onConfirm}
            />
          </View>
        </SafeAreaProvider>
      </PaperProvider>
    </>
  );
};

export default App;
