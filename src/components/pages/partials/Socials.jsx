import React from 'react';
import { Link } from 'react-dom';

export default class Socials extends React.Component {
  render() {
    return (
      <ul class="socials right">
        <li class="item">
          <a href="#" class="fa fa-youtube-play"></a>
        </li>
        <li class="item">
          <a href="https://www.facebook.com/junimed/" target="_blank" class="fa fa-facebook"></a>
        </li>
        <li class="item">
          <a href="https://www.instagram.com/junimed_organic_2018/" target="_blank" class="fa fa-instagram"></a>
        </li>
      </ul>
    );
  }
}
