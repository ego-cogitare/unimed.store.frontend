import React from 'react';

export default class Phones extends React.Component {
  render() {
    return (
      <div itemScope itemType="http://schema.org/Organization" class="phones right">
        { this.props.icon && <i class="fa fa-phone"></i> }
        <a class="phone" href="tel:0445269898"><span itemProp="telephone">(044) 526-98-98</span></a>,
        <a class="phone" href="tel:0445269899"><span itemProp="telephone">(044) 526-98-99</span></a>,
        <a class="phone" href="tel:0443613430"><span itemProp="telephone">(044) 361-34-30</span></a>
      </div>
    );
  }
}
