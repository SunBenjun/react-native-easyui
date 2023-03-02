import React, { useEffect, useRef } from "react";
import {
  DeviceEventEmitter,
  NativeEventEmitter,
  View,
} from "react-native";
import PortalManager from "./manager";

type PortalHostProps = {
  children: React.ReactNode;
};

type Operation =
  | { type: "mount"; key: number; children: React.ReactNode }
  | { type: "update"; key: number; children: React.ReactNode }
  | { type: "unmount"; key: number };

export type PortalMethods = {
  mount: (children: React.ReactNode) => number;
  update: (key: number, children: React.ReactNode) => void;
  unmount: (key: number) => void;
};

export const PortalContext = React.createContext<PortalMethods>(null as any);
// events
const addType = "REACT_NATIVE_EASY_UI_RN_ADD_PORTAL";
const removeType = "REACT_NATIVE_EASY_UI_RN_REMOVE_PORTAL";

const TopViewEventEmitter = DeviceEventEmitter || new NativeEventEmitter();

const PortalGuard = {
  nextKey: 10000,
  add(e:React.ReactNode) {
    const key = PortalGuard.nextKey++;  
    TopViewEventEmitter.emit(addType, e, key);
    return key;
  },
  remove(key: number) {
    TopViewEventEmitter.emit(removeType, key);
  },
};

export const portal = PortalGuard;

function PortalHost(props: PortalHostProps) {
  const { children: _children } = props;
  let _nextKey = useRef(0);
  let _queue: any = useRef([]);
  let _manager: any = useRef(null);

  function _mount(children: React.ReactNode, _key?: number) {
    const key = _key || _nextKey.current++;
    if (_manager.current) {
      _manager.current.mount(key, children);
    } else {
      _queue.current.push({ type: "mount", key, children });
    }

    return key;
  }

  function _update(key: number, children: React.ReactNode) {
    if (_manager.current) {
      _manager.current.update(key, children);
      return;
    }
    const op: Operation = { type: "mount", key, children };
    const index = _queue.current.findIndex(
      (o: any) => o.type === "mount" || (o.type === "update" && o.key === key)
    );

    if (index > -1) {
      _queue.current[index] = op;
      return;
    }
    _queue.current.push(op);
  }

  function _unmount(key: number) {
    if (_manager.current) {
      _manager.current.unmount(key);
      return;
    }
    _queue.current.push({ type: "unmount", key });
  }

  useEffect(() => {
    const manager = _manager.current;
    const queue = _queue.current;

    TopViewEventEmitter.addListener(addType, _mount);
    TopViewEventEmitter.addListener(removeType, _unmount);

    while (queue.length && manager) {
      const action = queue.pop();
      if (!action) {
        continue;
      }

      const { type, key, children } = action;

      if (type === "mount") {
        manager.mount(key, children);
        return;
      }

      if (type === "update") {
        manager.update(key, children);
        return;
      }

      if (type === "unmount") {
        manager.unmount(key);
        return;
      }
    }

    return () => {
      TopViewEventEmitter.removeAllListeners(addType);
      TopViewEventEmitter.removeAllListeners(removeType);
    };
  }, []);

  return (
    <PortalContext.Provider
      value={{
        mount: _mount,
        update: _update,
        unmount: _unmount,
      }}
    >
      {/* Need collapsable=false here to clip the elevations, otherwise they appear above Portal components */}
      <View style={{ flex: 1 }} collapsable={false}>
        {_children}
      </View>
      <PortalManager ref={_manager} />
    </PortalContext.Provider>
  );
}

export default PortalHost;
 