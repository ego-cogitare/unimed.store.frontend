import React from 'react';
import classNames from 'classnames';

export default class PageTitle extends React.Component {
  constructor(props) {
    super(props);

    this.trimTo = 80;
  }

  render() {
    return (
      <div class="wrapper">
        <div class="page-title">
          <div class="breadcumbs">
            {
              this.props.breadcumbs.map((item, key) => (
                <span key={key} class="breadcumb">
                  <span class={classNames({ 'color-green': key === this.props.breadcumbs.length - 1 })}>{(item || '').substr(0, this.trimTo)}{(item || '').length > this.trimTo ? <span>&hellip;</span> : ''}</span>
                  { key < this.props.breadcumbs.length - 1 && <span> > </span> }
                </span>
              ))
            }
          </div>
          <div class="heading-1 fw-500">
            {(this.props.title || '').substr(0, this.trimTo)}{(this.props.title || '').length > this.trimTo ? <span>&hellip;</span> : ''}
          </div>
        </div>
      </div>
    );
  }
}
