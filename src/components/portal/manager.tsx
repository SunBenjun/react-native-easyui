import React, { useState, forwardRef, useImperativeHandle } from "react";
import { View, StyleSheet } from "react-native";
 
const Manager = forwardRef((_props, ref: any) => {
  const [portals, setPortals] = useState([]);
  useImperativeHandle(ref, () => ({
    mount(key: number, children: React.ReactNode) {
      setPortals([...portals, { key, children }]);
    },
    update(key: number, children: React.ReactNode) {
      setPortals(
        portals.map((item) => {
          if (item.key === key) {
            return { ...item, children };
          }
          return item;
        })
      );
    },
    unmount(key: number) {
      setPortals(portals.filter((item) => item.key !== key));
    }
  }));
 
  return portals.map(({ key, children }, i) => (
    <View
      ref={ref}
      key={key}
      collapsable={
        false /* Need collapsable=false here to clip the elevations, otherwise they appear above sibling components */
      }
      pointerEvents="box-none"
      style={[StyleSheet.absoluteFill, { zIndex: 1000 + i }]}
    >
      {children}
    </View>
  ));
});

export default Manager;
