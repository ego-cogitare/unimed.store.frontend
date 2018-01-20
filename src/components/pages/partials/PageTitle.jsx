import React from 'react';
import classNames from 'classnames';

export default class PageTitle extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="wrapper">
        <div class="page-title">
          <div class="breadcumbs">
            {
              this.props.breadcumbs.map((item, key) => (
                <span key={key} class="breadcumb">
                  <span class={classNames({ 'color-green': key === this.props.breadcumbs.length - 1 })}>{item}</span>
                  { key < this.props.breadcumbs.length - 1 && <span> > </span> }
                </span>
              ))
            }
          </div>
          <div class="heading-1 fw-500">
            {this.props.title}
          </div>
        </div>
      </div>
    );
  }
}
