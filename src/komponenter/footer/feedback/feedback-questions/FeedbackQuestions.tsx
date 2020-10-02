import React, { Component, createContext } from 'react';

const context = createContext({});

const { Provider, Consumer } = context;

const Tab = ({ id: nu, children }) => (
    <Consumer>
        {({ changeTab }) => <div onClick={() => changeTab(id)}>{children}</div>}
    </Consumer>
);

const TabPanel = ({ whenActive, children }) => (
    <Consumer>
        {({ activeTabId }) => (activeTabId === whenActive ? children : null)}
    </Consumer>
);

class TabSwitcher extends Component {
    state = {
        activeTabId: 'a'
    };

    changeTab = newTabId => {
        console.log(newTabId);
        this.setState({
            activeTabId: newTabId
        });
    };

    render() {
        return (
            <Provider
                value={{
                    activeTabId: this.state.activeTabId,
                    changeTab: this.changeTab
                }}
            >
                {this.props.children}
            </Provider>
        );
    }
}

export default TabSwitcher;
export { Tab, TabPanel };ativFeiort default AlternativFei ort default