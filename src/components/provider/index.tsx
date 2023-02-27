import { createContext } from 'react';

const Content = createContext(undefined);

const { Provider,Consumer } = Content

export {
    Provider,
    Consumer
};