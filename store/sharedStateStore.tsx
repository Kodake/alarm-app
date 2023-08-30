import { observable, action, makeAutoObservable } from 'mobx';
import notifee, { AlarmType, AndroidImportance, RepeatFrequency, TimestampTrigger, TimestampTriggerAlarmManager, TriggerType } from '@notifee/react-native';
import { ALERT_MESSAGES, NOTIFICATION_STRINGS } from '../messages/appMessages';
import AlertTime from '../components/alertTime';
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

  confirmedDate(hoursAndMinutes: { hours: number; minutes: number }) {
    const newDate = this.createNewDate(hoursAndMinutes.hours, this.minutes);

    if (!this.hasDuplicateTime(newDate)) {
      this.addSelectedDate(newDate);
    } else {
      this.showDuplicateAlert();
    }
  }

  createNewDate = (hours: number, minutes: number): Date => {
    const newDate = new Date();
    newDate.setDate(newDate.getDate());
    newDate.setHours(hours, minutes);
    return newDate;
  };

  hasDuplicateTime = (newDate: Date): boolean => {
    return this.selectedDates.some(date => {
      return (
        date.getHours() === newDate.getHours() && date.getMinutes() === newDate.getMinutes()
      );
    });
  };

  showDuplicateAlert = () => {
    AlertTime(ALERT_MESSAGES.duplicatedError, ALERT_MESSAGES.duplicatedAlarm);
  };

  validateTimeBeforeToday = async (date: Date): Promise<boolean> => {
    const currentDate = new Date();
    const isBefore = moment(date).isBefore(currentDate);

    return isBefore;
  };

  displayNotification = async (date: Date) => {
    if (await this.validateTimeBeforeToday(date)) {
      AlertTime(ALERT_MESSAGES.notFutureError, ALERT_MESSAGES.timeBeforeAlarm);
      return;
    }

    await notifee.requestPermission();

    const channelId = await notifee.createChannel({
      id: date.toString(),
      name: NOTIFICATION_STRINGS.notificationChannelName,
      sound: NOTIFICATION_STRINGS.notificationSound,
      importance: AndroidImportance.HIGH,
      vibration: true,
    });

    const alarmManager: TimestampTriggerAlarmManager = {
      type: AlarmType.SET_EXACT_AND_ALLOW_WHILE_IDLE,
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
      body: moment(date).format('YYYY/MM/DD HH:mm'),
      android: { channelId },
    }, trigger);
  };
}

const sharedStateStore = new SharedStateStore();
export default sharedStateStore;
