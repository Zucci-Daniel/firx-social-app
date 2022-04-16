import Toast from 'react-native-toast-message';

//this function basically calls a reuseable toast method.
export const showToast = (
  title = 'title',
  message = 'message goes in here',
  toastType = 'warning',
) => {
  Toast.show({
    type: 'appToast',
    text1: title,
    text2: message,
    props: {toastType: toastType},
  });
};
