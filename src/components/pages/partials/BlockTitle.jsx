import React from 'react';
import classNames from 'classnames';

export default class BlockTitle extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class={classNames('section-header', this.props.className)}>
        <div class="title-wrapper">
          <div class="heading-1">{this.props.title}</div>
        </div>
        <div class="description">{this.props.description}</div>
      </div>
    );
  }
}
