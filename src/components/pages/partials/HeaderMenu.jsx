import React from 'react';
import { Link } from 'react-router';
import Phones from './Phones.jsx';
import Socials from './Socials.jsx';

export default class HeaderMenu extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const context = this;

    $(this.refs['burger-right']).on('click', function() {
      $(this).toggleClass('opened');

      if ($(this).hasClass('opened'))
      {
        $('.menu.right').addClass('opened');
        $('html, body').addClass('no-scroll');
        $(context.refs['burger-left']).removeClass('opened')
          .siblings('.menu.left').removeClass('opened');
      }
      else
      {
        $('.menu.right').removeClass('opened');
        $('html, body').removeClass('no-scroll');
      }
    });

    $(this.refs['burger-left']).on('click', function() {
      $(this).toggleClass('opened');

      if ($(this).hasClass('opened'))
      {
        $(this).siblings('.menu.left').addClass('opened');
        $('html, body').addClass('no-scroll');
        $(context.refs['burger-right']).removeClass('opened');
        $('.menu.right').removeClass('opened');
      }
      else
      {
        $(this).siblings('.menu.left').removeClass('opened');
        $('html, body').removeClass('no-scroll');
      }
    });
  }

  render() {
    return (
      <section>
        <div class="top-header">
          <div class="wrapper clear">
            <div ref="burger-left" class="burger-menu left-menu">
              <label class="left">
                <span>&nbsp;</span>
              </label>
            </div>
            <div ref="burger-right" class="burger-menu right-menu">
              <label class="left">
                <span>&nbsp;</span>
              </label>
            </div>
            <ul class="menu left clear">
              {
                ((this.props.data.menu || []).children || []).map(({ id, link, title })=>(
                  <li key={id} class="item left">
                    <Link to={link} activeClassName="active">{title}</Link>
                  </li>
                ))
              }
            </ul>
            <Socials />
            <Phones icon={true} />
          </div>
        </div>
      </section>
    );
  }
}
