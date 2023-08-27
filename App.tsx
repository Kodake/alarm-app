import React from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-paper';
import {TimePickerModal} from 'react-native-paper-dates';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const [visible, setVisible] = React.useState(false);
  const onDismiss = React.useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const onConfirm = React.useCallback(
    ({hours, minutes}: {hours: number; minutes: number}) => {
      setVisible(false);
      console.warn({hours, minutes});
    },
    [setVisible],
  );

  return (
    <SafeAreaProvider>
      <View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
        <Button
          onPress={() => setVisible(true)}
          uppercase={false}
          mode="outlined">
          Pick time
        </Button>
        <TimePickerModal
          inputFontSize={20}
          visible={visible}
          onDismiss={onDismiss}
          onConfirm={onConfirm}
          hours={12}
          minutes={14}
        />
      </View>
    </SafeAreaProvider>
  );
};

export default App;
