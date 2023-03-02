import React, { useState, useEffect } from "react";
import { Text, View, Animated } from "react-native";

export interface ToastProps {
  content: string | React.ReactNode;
  duration?: number;
  onClose?: () => void;
  mask?: boolean;
  type?: string;
  onAnimationEnd?: () => void;
}

let anim: Animated.CompositeAnimation | null;

export default (props: ToastProps) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const { onAnimationEnd, duration = 3, onClose } = props;

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
      Animated.delay(duration * 1000),
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

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ backgroundColor: "transparent" }}>
        <Animated.View style={{ opacity: fadeAnim }}>
          <View
            style={{
              width: 140,
              height: 45,
              borderRadius: 4,
              backgroundColor: "rgba(0,0,0,0.75)",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "PingFangSC-Regular",
                fontSize: 16,
                color: "#ffffff",
              }}
            >
              保存成功
            </Text>
          </View>
        </Animated.View>
      </View>
    </View>
  );
};
