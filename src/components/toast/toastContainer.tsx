import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Animated,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";

export interface ToastProps {
  content: string | React.ReactNode;
  duration?: number;
  onClose?: () => void;
  type?: string;
  onAnimationEnd?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  containerInnerStyle?: StyleProp<ViewStyle>;
  toastBoxStyle?: StyleProp<ViewStyle>;
  toastTextStyle?: StyleProp<TextStyle>;
  stackable?: boolean;
}

let anim: Animated.CompositeAnimation | null;

export default (props: ToastProps) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const {
    onAnimationEnd,
    duration = 3000,
    onClose,
    content,
    containerStyle,
    containerInnerStyle,
    toastBoxStyle,
    toastTextStyle,
  } = props;

  function start() {
    const timing = Animated.timing;
    if (anim) {
      anim = null;
    }
    const animArr = [
      timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.delay(duration),
    ];
    if (duration > 0) {
      animArr.push(
        timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        })
      );
    }
    anim = Animated.sequence(animArr);
    anim.start(() => {
      if (duration > 0) {
        anim = null;
        if (onAnimationEnd) {
          onAnimationEnd();
        }
      }
    });
  }

  function end() {
    if (anim) {
      anim.stop();
      anim = null;
    }

    if (onClose) {
      onClose();
    }
  }
  useEffect(() => {
    start();
    return () => {
      end();
    };
  }, []);

  const styles = StyleSheet.create({
    containerStyle: {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      backgroundColor: "transparent",
      justifyContent: "center",
      alignItems: "center",
    },
    containerInnerStyle: {
      backgroundColor: "transparent",
    },
    toastBoxStyle: {
      minWidth: 140,
      maxWidth: 200,
      paddingHorizontal: 10,
      paddingVertical: 14,
      borderRadius: 4,
      backgroundColor: "rgba(0,0,0,0.75)",
      alignItems: "center",
      justifyContent: "center",
    },
    toastTextStyle: {
      fontFamily: "PingFangSC-Regular",
      fontSize: 16,
      color: "#ffffff",
    },
  });

  return (
    <View style={[styles.containerStyle, containerStyle]}>
      <View style={[styles.containerInnerStyle, containerInnerStyle]}>
        <Animated.View style={{ opacity: fadeAnim }}>
          {React.isValidElement(content) ? (
            content
          ) : (
            <View style={[styles.toastBoxStyle, toastBoxStyle]}>
              <Text style={[styles.toastTextStyle, toastTextStyle]}>
                {content}
              </Text>
            </View>
          )}
        </Animated.View>
      </View>
    </View>
  );
};
