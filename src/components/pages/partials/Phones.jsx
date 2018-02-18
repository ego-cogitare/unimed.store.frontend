import React from 'react';

export default class Phones extends React.Component {
  render() {
    return (
      <div class="phones right">
        { this.props.icon && <i class="fa fa-phone"></i> }
        <a class="phone" href="tel:0445269898">(044) 526-98-98</a>,
        <a class="phone" href="tel:0445269899">(044) 526-98-99</a>,
        <a class="phone" href="tel:0443613430">(044) 361-34-30</a>
      </div>
    );
  }
}
