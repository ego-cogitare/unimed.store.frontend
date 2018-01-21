import React from 'react';
import Moment from 'moment';
import { Link } from 'react-router';
import Partials from './partials';
import { buildUrl } from '../../core/helpers/Utils';

export default class AboutUs extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <section>
        <Partials.PageTitle breadcumbs={['Главная', 'О нас']} title="О нас" />

        <div class="wrapper catalog clear">
          <div class="sitebar">
            <ul class="menu">
              <li class="item">
                <a href="#" class="heading-3 fw-600">почему мы?</a>
              </li>
              <li class="item">
                <a href="#" class="heading-3 fw-600">текст</a>
              </li>
              <li class="item">
                <a href="#" class="heading-3 fw-600">и еще пункт</a>
              </li>
            </ul>
          </div>
          <div class="content">
            <div class="text-block">
              <p class="text">
                Я совсем один и блаженствую в здешнем краю, словно созданном для таких, как я. Я так счастлив, мой друг, так упоен ощущением покоя, что искусство мое страдает от этого. Ни одного штриха не мог бы я сделать, а никогда не был таким большим художником, как в эти минуты. Когда от милой моей долины поднимается пар и полдневное солнце стоит над непроницаемой чащей темного леса и лишь редкий луч проскальзывает в его святая святых, а я лежу в высокой траве у быстрого ручья и, прильнув к земле, вижу тысячи всевозможных былинок и чувствую, как близок моему сердцу крошечный мирок, что снует между стебельками, наблюдаю эти неисчислимые, непостижимые разновидности червяков и мошек и чувствую близость всемогущего, создавшего нас по своему подобию, веяние вселюбящего, судившего нам парить в вечном блаженстве, когда взор мой туманится и все вокруг меня и небо надо мной запечатлены в моей душе, точно образ возлюбленной, - тогда, дорогой друг, меня часто томит мысль: "Ах! Как бы выразить, как бы вдохнуть в рисунок то, что так полно, так трепетно живет во мне, запечатлеть отражение моей души, как душа моя - отражение предвечного бога!"
              </p>
            </div>
          </div>
        </div>

        <Partials.AdvertisingServices />
      </section>
    );
  }
}
