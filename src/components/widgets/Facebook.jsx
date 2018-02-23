import React from 'react';

export default class Facebook extends React.Component {

  constructor(props) {
    super(props);

    $('#facebook-jssdk').remove();
    window.FB = undefined;
  }

  componentDidMount() {
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = `https://connect.facebook.net/ru_RU/sdk.js#xfbml=1&version=v2.12&appId=${config.FACEBOOK_APP}&autoLogAppEvents=1`;
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  render() {
    return (
      <div>
        <div id="fb-root"></div>
        <div class="fb-page"
          data-href={config.FACEBOOK_PAGE}
          data-tabs="timeline"
          data-small-header="false"
          data-hide-cover="false"
          data-show-facepile="true"
          data-width="500"
        ></div>
      </div>
    );
  }
}
