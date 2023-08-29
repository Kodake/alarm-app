import { observable, action, makeAutoObservable } from 'mobx';
import notifee, { AlarmType, AndroidImportance, RepeatFrequency, TimestampTrigger, TimestampTriggerAlarmManager, TriggerType } from '@notifee/react-native';
import { NOTIFICATION_STRINGS } from '../messages/appMessages';
import moment from 'moment';

class SharedStateStore {
  minutes = 0;
  hours = 0;
  isVisible = false;
  selectedDates: Date[] = [];

  constructor() {
    makeAutoObservable(this, {
      minutes: observable,
      hours: observable,
      isVisible: observable,
      selectedDates: observable,
      setMinutes: action,
      setHours: action,
      setVisibility: action,
      addSelectedDate: action,
      deleteSelectedDate: action
    });
  }

  setMinutes(minutes: number) {
    this.minutes = minutes;
  }

  setHours(hours: number) {
    this.hours = hours;
  }

  setVisibility(visible: boolean) {
    this.isVisible = visible;
  }

  addSelectedDate(date: Date) {
    this.selectedDates.push(date);
  }

  deleteSelectedDate(date: Date) {
    this.selectedDates = this.selectedDates.filter(d => !moment(d).isSame(moment(date)));
  }

  displayNotification = async (date: Date, body: string) => {
    await notifee.requestPermission();
    await notifee.openAlarmPermissionSettings();
    date.setSeconds(0);

    const channelId = await notifee.createChannel({
      id: date.toString(),
      name: NOTIFICATION_STRINGS.notificationChannelName,
      sound: NOTIFICATION_STRINGS.notificationSound,
      importance: AndroidImportance.HIGH,
      vibration: true,
    });

    const alarmManager: TimestampTriggerAlarmManager = {
      type: AlarmType.SET_ALARM_CLOCK,
      allowWhileIdle: true
    }

    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(),
      alarmManager: alarmManager,
      repeatFrequency: RepeatFrequency.DAILY
    };

    await notifee.createTriggerNotification({
      id: date.toString(),
      title: NOTIFICATION_STRINGS.notificationTitle,
      body: body,
      android: { channelId },
    }, trigger);
  };
}

const sharedStateStore = new SharedStateStore();
export default sharedStateStore;