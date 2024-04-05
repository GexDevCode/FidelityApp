import * as React from 'react'
import { ReactElement, useCallback, useEffect, useState } from 'react'
import { Linking, StyleSheet, View } from 'react-native'
import { CameraPermissionStatus, Code, useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera'
import { Camera } from 'react-native-vision-camera'
import { CONTENT_SPACING, CONTROL_BUTTON_SIZE, SAFE_AREA_PADDING } from '../../../Constants'
import { useIsForeground } from '../../../hooks/useIsForeground'
import { StatusBarBlurBackground } from '../../../views/StatusBarBlurBackground'
import { PressableOpacity } from 'react-native-pressable-opacity'
import { useIsFocused } from '@react-navigation/core'
import Loader from '../../../views/Loader'
import CodeScannerModal, { CodeScanner } from '../components/CodeScannerModal'
import { AppIcon } from '../../../assets/icons/AppIcon'
import { Colors } from '../../../constants/colors'
import { useScanner } from './hooks/useScanner'
import { useAuth } from '../../../hooks/useAuth'
import { useStore } from '../../../providers/Store.provider'
import ActivationModal from '../components/ActivationModal'

export function CodeScannerPage({ navigation, route }: any): ReactElement {

  const [,auth] = useAuth();
  const { store } = useStore();
  const [renderError, scanRewardCard, scanDiscount] = useScanner();

  const [activationModal, setActivationModal] = useState<boolean>(false);
  React.useLayoutEffect(() => {
    navigation.setOptions({tabBarVisible: false, tabBarStyle: {display: 'none'}});
}, [navigation, route]);

  const [cameraPermissionStatus, setCameraPermissionStatus] = useState<CameraPermissionStatus>('not-determined')
  const [data, setData] = useState<any>();

  const requestCameraPermission = useCallback(async () => {
    const permission = await Camera.requestCameraPermission()

    if (permission === 'denied') await Linking.openSettings()
    setCameraPermissionStatus(permission)
  }, [])

  useEffect(() => {
    navigation.setOptions({ 
      tabBarStyle: { display: "none" }, 
      tabBarHideOnKeyboard: true 
    })
    if (cameraPermissionStatus === 'granted') navigation.replace('CameraPage')
    requestCameraPermission()
  }, [cameraPermissionStatus, navigation])
  // 1. Use a simple default back camera
  const device = useCameraDevice('back')

  // 2. Only activate Camera when the app is focused and this screen is currently opened
  const isFocused = useIsFocused()
  const isForeground = useIsForeground()
  const isActive = isFocused && isForeground

  // 3. (Optional) enable a torch setting
  const [torch, setTorch] = useState(false)
  const [code, setCode] = useState<any>();
  
  const onCodeScanned = useCallback(async (codes: Code[]) => {
    try {
      if(store.isActive) {
        if(codes && codes[0]?.value) {
          const value: string = codes[0].value;
          const data = JSON.parse(value);
          console.log("data", data);
          if(data.type) {
            setData(data);
          }
          throw "Invalid QRcode data"
        }
    
        throw "Invalid QRcode";
      }else {
        setActivationModal(true);
      } 

    } catch (error) {
      console.log(error)
    }
  }, [code])

  // 5. Initialize the Code Scanner to scan QR codes and Barcodes
  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: onCodeScanned,
  })

  const onSubmit = (data: CodeScanner) => {
    setData(null);
    switch(data.type) {
      case "USER":
        scanRewardCard(data);
        break;
      case "REWARD_CARD":
        scanRewardCard(data);
        break;
      case "DISCOUNT":
        scanDiscount(data)
        break;
      default:
        console.log("Invalid type scanner")
        break;
    }
  }

  if(cameraPermissionStatus !== 'granted') return <Loader />

  console.log("store", store)
  return (
    <>
      {renderError}
      {
        store.isActive ?
        <CodeScannerModal data={data} visible={!!data} onPress={onSubmit} onDismiss={() => setData(null)} />
        :
        <ActivationModal visible={activationModal} onPress={() => { setActivationModal(false); store.invoiceStore ? navigation.push("PackageSelection", store) : navigation.push("EditFidalityCard") }} />
      }
      
      <View style={styles.container}>
      {device != null && (
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={isActive}
          codeScanner={codeScanner}
          torch={torch ? 'on' : 'off'}
          enableZoomGesture={true}
        />
      )}

      <StatusBarBlurBackground />

      <View style={styles.rightButtonRow}>
        <PressableOpacity style={styles.button} onPress={() => navigation.navigate("Admin") } disabledOpacity={0.4}>
          <AppIcon name="x" iconSet="icon-app" style={{ width: 25, height: 25 }} fill={Colors.PRIMARY} />
        </PressableOpacity>
      </View>

      {/* Back Button */}
      <PressableOpacity style={styles.backButton} onPress={navigation.goBack}>
      </PressableOpacity>

    </View>
    </>

  )
}

const styles = StyleSheet.create({
    containerPopup: {
        width: 400,
        position: 'absolute',
        bottom: SAFE_AREA_PADDING.paddingBottom,
        left: SAFE_AREA_PADDING.paddingLeft,
        justifyContent: 'center',
        backgroundColor: 'grey',
      },
      contentContainerPopup: {
        flex: 1,
        alignItems: 'center',
      },
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  item: {
    flex: 1,
    overflow: 'hidden',
    alignItems: 'center',
    backgroundColor: 'orange',
  },
  button: {
    marginBottom: CONTENT_SPACING,
    width: CONTROL_BUTTON_SIZE,
    height: CONTROL_BUTTON_SIZE,
    borderRadius: CONTROL_BUTTON_SIZE / 2,
    backgroundColor: 'rgba(140, 140, 140, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightButtonRow: {
    position: 'absolute',
    right: SAFE_AREA_PADDING.paddingRight,
    top: SAFE_AREA_PADDING.paddingTop,
  },
  backButton: {
    position: 'absolute',
    left: SAFE_AREA_PADDING.paddingLeft,
    top: SAFE_AREA_PADDING.paddingTop,
  },
})