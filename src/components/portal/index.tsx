import React from "react";
import PortalConsumer from "./consumer";
import PortalHost, { portal, PortalContext } from "./host";

type portalProps = {
  children?: React.ReactNode;
};
 
function Protal(props: portalProps){
  const { children } = props;
 
  return (
    <PortalContext.Consumer>
      {(manager) => (
        <PortalConsumer manager={manager}>{children}</PortalConsumer>
      )}
    </PortalContext.Consumer>
  );
};

Protal.Host = PortalHost
Protal.add = portal.add
Protal.remove = portal.remove

export default Protal
 