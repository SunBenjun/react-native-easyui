import React, { useRef } from "react";
import { View, Text } from "react-native";

const visible = true;
export default () => {
  const count = useRef(0);
  count.current += 1;

  if (visible) {
    return (
      <View
        style={{
          backgroundColor: "hsl(0,100%,50%)",
          borderRadius: 6,
          height: 35,
          margin: 2,
          width: 35,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 10,
            fontWeight: "bold",
          }}
        >
          {count.current}
        </Text>
      </View>
    );
  }

  return null;
};
