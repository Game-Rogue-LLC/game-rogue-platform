import React from "react";

class DraggableChildComponent extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("div", {
      draggable: true,
      onDragStart: this.props.dragStart,
      onDragEnter: this.props.dragEnter,
      onDragEnd: this.props.dragEnd,
      className: "grabbable"
    }, this.props.children);
  }

}

export default DraggableChildComponent;