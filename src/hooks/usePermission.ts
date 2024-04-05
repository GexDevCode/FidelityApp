import { PERMISSIONS, RESULTS, check, requestMultiple } from "react-native-permissions";

check(PERMISSIONS.ANDROID.CAMERA)
.then((result: any) => {
  switch (result) {
    case RESULTS.UNAVAILABLE:
      console.log('This feature is not available (on this device / in this context)');
      break;
    case RESULTS.DENIED:
      console.log('The permission has not been requested / is denied but requestable');
      break;
    case RESULTS.LIMITED:
      console.log('The permission is limited: some actions are possible');
      break;
    case RESULTS.GRANTED:
      console.log('The permission is granted');
      break;
    case RESULTS.BLOCKED:
      console.log('The permission is denied and not requestable anymore');
      break;
  }
})
.catch((error) => {
  // …
});


check(PERMISSIONS.IOS.CAMERA)
.then((result: any) => {
  switch (result) {
    case RESULTS.UNAVAILABLE:
      console.log('This feature is not available (on this device / in this context)');
      break;
    case RESULTS.DENIED:
      console.log('The permission has not been requested / is denied but requestable');
      break;
    case RESULTS.LIMITED:
      console.log('The permission is limited: some actions are possible');
      break;
    case RESULTS.GRANTED:
      console.log('The permission is granted');
      break;
    case RESULTS.BLOCKED:
      console.log('The permission is denied and not requestable anymore');
      break;
  }
})
.catch((error) => {
  // …
});

requestMultiple([PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.IOS.CAMERA]).then((statuses) => {
  console.log('Camera Android', statuses[PERMISSIONS.ANDROID.CAMERA]);
  console.log('Camera IOS', statuses[PERMISSIONS.IOS.CAMERA]);
});
