// import React from "react";
// import ReactDOM from "react-dom";

// const Portal: React.FC<any> = (props) => {
//     console.log(props);
//     const [defaultNode, setDefaultNode] = React.useState<null | HTMLDivElement>(
//         null
//     );

//     const renderPortal = () => {
//         if (!props.node && !defaultNode) {
//             const node = document.createElement("div");
//             setDefaultNode(node);
//             document.body.appendChild(node);
//         }

//         let children = props.children;
//         if (typeof children.type === "function") {
//             children = React.cloneElement(children);
//         }

//         ReactDOM.render(children, props.node || defaultNode);
//     };
//     React.useEffect(() => {
//         renderPortal();
//         return () => {
//             if (defaultNode || props.node) {
//                 ReactDOM.unmountComponentAtNode(defaultNode || props.node);
//                 if (defaultNode) {
//                     document.body.removeChild(defaultNode);
//                 }
//             }
//             setDefaultNode(null);
//         };
//     }, [props, defaultNode, setDefaultNode]);
//     return null;
// };

// export default Portal;
// adapted from https://github.com/tajo/react-portal/blob/55ed77ab823b03d1d4c45b950ba26ea5d687e85c/src/LegacyPortal.js

import React from "react";
import ReactDOM from "react-dom";

export default class Portal extends React.Component<any, any> {
    defaultNode: null | HTMLDivElement = null;

    constructor(props: any) {
        super(props);
    }
    componentDidMount() {
        this.renderPortal();
    }

    componentDidUpdate() {
        this.renderPortal();
    }

    componentWillUnmount() {
        ReactDOM.unmountComponentAtNode(this.defaultNode || this.props.node);
        if (this.defaultNode) {
            document.body.removeChild(this.defaultNode);
        }
        this.defaultNode = null;
    }

    renderPortal() {
        if (!this.props.node && !this.defaultNode) {
            this.defaultNode = document.createElement("div");
            const mainStage = document.getElementById("main-stage");
            if (mainStage) mainStage.appendChild(this.defaultNode);
        }

        let children: any = this.props.children;

        if (typeof children.type === "function") {
            children = React.cloneElement(children);
        }

        ReactDOM.render(children, this.props.node || this.defaultNode);
    }

    render() {
        return null;
    }
}
