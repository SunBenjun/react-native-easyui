import React, { useEffect, useRef } from "react";
import { PortalMethods } from "./portal-host";

type PortalConsumerProps = {
  manager: PortalMethods;
  children: React.ReactNode;
};

export default (props: PortalConsumerProps) => {
  const { manager, children } = props;
  const mounting = useRef(true);
  let _key: any = useRef();

  useEffect(() => {
    if (mounting.current) {
      // componentDidMount 
      if (!manager) {
        throw new Error(
          "Looks like you forgot to wrap your root component with `Provider`"
        );
      }
      _key = manager.mount(children);
      mounting.current = false;
      return;
    }
    // componentDidUpdate
    manager.update(_key, children);
  });

  useEffect(() => {
    return () => {
      manager.unmount(_key);
    };
  }, []);

  return null;
};
 
