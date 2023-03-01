import React,{useEffect,useState} from 'react'
import {
  Animated,
//   BackHandler,
  Dimensions,
  Easing,
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native'
 
 
const styles = StyleSheet.create({
  wrap: {
    zIndex: 1000,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor: 'rgba(0,0,0,0)',
  } as ViewStyle,
  mask: {
    backgroundColor: 'black',
    opacity: 0.5,
  } as ViewStyle,
  absolute: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
})

const screen = Dimensions.get('window')
 
interface IModalPropTypes {
    wrapStyle?: StyleProp<ViewStyle>
    maskStyle?: StyleProp<ViewStyle>
    animationType?: string
    // animateAppear?: boolean
    animationDuration?: number
    visible?: boolean
    maskClosable?: boolean
    onClose?: () => void | Promise<any>
    onAnimationEnd?: () => void | Promise<any>
    children?: any
    style?: any
} 

export default (props:IModalPropTypes) => {
    const {
        children,
        // animateAppear = false,        
        style = {},
        maskStyle = {},
        wrapStyle = {},
        visible = false,
        maskClosable = true,
        onClose = () => {},
        onAnimationEnd= (value:any) => {}
    } = props;

    let {
        animationType = 'none',
        animationDuration = 300
    } = props;

    let animMask: any
    let animDialog: any

    const [position] = useState(new Animated.Value(_getPosition(visible)))
    const [scale] = useState(new Animated.Value(_getScale(visible)))
    const [opacity] = useState(new Animated.Value(_getOpacity(visible)))
    const [modalVisible, setModalVisible] = useState(visible)

    
    useEffect(() => {

        setModalVisible(visible)
        if(visible){
            _animateDialog(visible)
        }
        return () => {
            _stopDialogAnim()
        }
    },[visible])

    function _stopDialogAnim(){
        if (animDialog) {
            animDialog.stop()
            animDialog = null
        }
    }


    function _stopMaskAnim() {
        if (animMask) {
          animMask.stop()
          animMask = null
        }
    }

    function _animateMask(visible: boolean){
        _stopMaskAnim()
        opacity.setValue(_getOpacity(!visible))
        animMask = Animated.timing(opacity, {
          toValue: _getOpacity(visible),
          duration: animationDuration,
          useNativeDriver: true,
        })
        animMask.start(() => {
          animMask = null
        })
    }

    function _animateDialog(visible: boolean){
         _stopDialogAnim()
         _animateMask(visible)
 
        animationDuration = animationDuration!
        if (animationType !== 'none') {
          if (animationType === 'slide-up' || animationType === 'slide-down') {
             position.setValue(_getPosition(!visible))
             animDialog = Animated.timing(position, {
              toValue: _getPosition(visible),
              duration: animationDuration,
              easing: (visible ? Easing.elastic(0.8) : undefined) as any,
              useNativeDriver: true,
            })
          } else if (animationType === 'fade') {
             animDialog = Animated.parallel([
              Animated.timing(opacity, {
                toValue: _getOpacity(visible),
                duration: animationDuration,
                easing: (visible ? Easing.elastic(0.8) : undefined) as any,
                useNativeDriver: true,
              }),
              Animated.spring(scale, {
                toValue: _getScale(visible),
                useNativeDriver: true,
              }),
            ])
          }
    
         animDialog.start(() => {
            animDialog = null
            if (!visible) {
              setModalVisible(false)
            //   BackHandler.removeEventListener(
            //     'hardwareBackPress',
            //     this.onBackAndroid,
            //   )
            }
            if (onAnimationEnd) {
              onAnimationEnd(visible)
            }
          })
        } else {
          if (!visible) {
            setModalVisible(false)
            // BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
          }
        }
    }

    function _onMaskClose(){
        if ( maskClosable && onClose) {
             onClose()
            // BackHandler.removeEventListener('hardwareBackPress', _onBackAndroid)
        }
    }

    function _getPosition(visible: boolean){
        if (visible) {
            return 0
          }
          return animationType === 'slide-down'
            ? -screen.height
            : screen.height
    }

    function _getScale(visible: boolean){
        return visible ? 1 : 1.05
    }

    function _getOpacity(visible: boolean){
        return visible ? 1 : 0
    }


    const _animationStyleMap = {
        none: {},
        'slide-up': { transform: [{ translateY: position }] },
        'slide-down': { transform: [{ translateY:position }] },
        fade: {
          transform: [{ scale: scale }],
          opacity: opacity,
        },
      }

    if (!modalVisible) {
        return null 
    }

    return (
        <View style={[styles.absolute,styles.wrap, wrapStyle]}>
          <TouchableWithoutFeedback onPress={_onMaskClose}>
            <Animated.View
              style={[styles.absolute, { opacity: opacity }]}>
              <View style={[styles.absolute, styles.mask, maskStyle]} />
            </Animated.View>
          </TouchableWithoutFeedback>
          <Animated.View
            style={[    
              style,
              _animationStyleMap[animationType],
            ]}>
            {children}
          </Animated.View>
        </View>
    )
}
 