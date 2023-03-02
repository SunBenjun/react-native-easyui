import { createContext } from "react";
import Portal from "../portal";
 
const Content = createContext(null);

const { Provider } = Content;

export default (props) => {
  const { children,theme } = props;
  return (
    <Provider value={theme}>
      <Portal.Host>{children}</Portal.Host>
    </Provider>
  );
};

// export default class Provider extends React.Component<ProviderProps> {
//     render() {
//       return (
//         <LocaleProvider locale={this.props.locale}>
//           <ThemeProvider value={this.props.theme}>
//             <Portal.Host>{this.props.children}</Portal.Host>
//           </ThemeProvider>
//         </LocaleProvider>
//       )
//     }
//   }
