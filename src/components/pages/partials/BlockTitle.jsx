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
          <h1 class="heading-1">{this.props.title}</h1>
        </div>
        <div class="description">{this.props.description}</div>
      </div>
    );
  }
}
