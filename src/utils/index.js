import {Dimensions, PixelRatio, Platform, Alert} from 'react-native';
import moment from 'moment';
import Toast from 'react-native-toast-message';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;
const guidelineBaseWidth = 375;

const scaleSize = size => (WINDOW_WIDTH / guidelineBaseWidth) * size;
const scaleFont = size => size * PixelRatio.getFontScale();

const isAndroid = Platform.OS === 'android';
const isIOS = Platform.OS === 'ios';

const BUCKET_NAME = 'staragent-userfiles';
const ACCESS_KEY = 'AKIAI5OVIVC5SHMBEQDA';
const SECRET_KEY = '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';

const getPercentage = (input, total) => (input / total) * 100;

const populateCalendarDates = (currentDate = moment()) => {
  let dateList = [];
  let startDay = currentDate.clone().startOf('month').startOf('week');
  let endDay = currentDate.clone().endOf('month').endOf('week');
  let date = startDay.clone().subtract(1, 'day');
  while (date.isBefore(endDay, 'day')) {
    dateList.push(date.add(1, 'day').clone());
  }
  console.log(dateList);
  return dateList;
};

const showToast = (title, msg, variant) => {
  switch (variant) {
    case 'success':
      Toast.show({
        type: 'success',
        text1: title,
        text2: msg,
      });
      break;
    case 'error':
      Toast.show({
        type: 'error',
        text1: title,
        text2: msg,
      });
      break;
    case 'warning':
      Toast.show({
        type: 'info',
        text1: title,
        text2: msg,
      });
      break;
    default:
      Toast.show({
        type: 'info',
        text1: title,
        text2: msg,
      });
      break;
  }
};

const validateEmail = text => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  if (reg.test(text) === false) {
    return false;
  } else {
    return true;
  }
};

const convertTimeToDuration = serviceTime => {
  let hours = moment(serviceTime, 'HH:mm:ss').hours();
  let minutes = moment(serviceTime, 'HH:mm:ss').minutes();
  let timeToDisplay = '';
  if (hours === 0) {
    timeToDisplay = minutes.toString() + ' mins';
  } else {
    timeToDisplay =
      hours +
      ' ' +
      (hours === 1 ? 'hr' : 'hrs') +
      (minutes !== 0 ? ' ' + minutes + ' mins' : '');
  }

  return timeToDisplay;
};

const getFileNameFromUri = uri => {
  // return uri.split('\\').pop().split('/').pop().split('.')[0]
  return uri.split('\\').pop().split('/').pop();
};

const DEFAULT_IMAGE = 'https://bit.ly/broken-link';

const lists = [
  {
    id: '_1',
    image: 'person-outline',
    title: 'Profile',
    color: '',
    delay: 200,
  },
  {
    id: '_5',
    image: 'calendar-outline',
    title: 'Bookings',
    color: '',
    delay: 600,
  },
  {id: '_6', image: 'list-outline', title: 'Jobs', color: '', delay: 700},
];

export {
  scaleSize,
  scaleFont,
  isAndroid,
  isIOS,
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
  getPercentage,
  populateCalendarDates,
  showToast,
  getFileNameFromUri,
  convertTimeToDuration,
  validateEmail,
  DEFAULT_IMAGE,
  lists,
  BUCKET_NAME,
  ACCESS_KEY,
  SECRET_KEY,
};
