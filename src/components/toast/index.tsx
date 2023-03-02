import React from "react";
import Portal from "../portal";
import ToastContainer, { ToastProps } from "./toastContainer";

interface IToastConfigurable {
  duration?: number;
  onClose?: () => void;
  mask?: boolean;
  stackable?: boolean;
}

const defaultConfig: IToastConfigurable = {
  duration: 3000, // 毫秒
  onClose: () => {},
  stackable: true,
};

const toastKeyMap: { [key: number]: 1 } = {};

function remove(key: number) {
  Portal.remove(key);
  delete toastKeyMap[key];
}

function removeAll() {
  Object.keys(toastKeyMap).forEach((_key) =>
    Portal.remove(Number.parseInt(_key, 10))
  );
}

function notice(type: string, props: ToastProps) {
  const noticeProps = {
    duration: defaultConfig.duration,
    onClose: defaultConfig.onClose,
    stackable: defaultConfig.stackable,
    ...props,
  };

  if (!noticeProps.stackable) {
    removeAll();
  }

  const key = Portal.add(
    <ToastContainer
      type={type}
      {...noticeProps}
      onAnimationEnd={() => {
        remove(key);
      }}
    />
  );
  toastKeyMap[key] = 1;
  return key;
}

export default {
  show(props: ToastProps) {
    return notice("show", { ...props });
  },
  remove,
  removeAll,
};
