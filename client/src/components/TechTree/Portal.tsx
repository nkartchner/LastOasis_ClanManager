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
