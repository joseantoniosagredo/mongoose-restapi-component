import { Component } from 'react';
declare class App extends Component<{
    tree: any;
    headers?: any;
    theme?: any;
}> {
    state: {
        menu: any;
        tree: any;
        headers: {};
        init: boolean;
    };
    componentDidMount(): void;
    render(): JSX.Element;
}
export default App;
