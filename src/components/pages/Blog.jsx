import React from 'react';
import Moment from 'moment';
import { Link } from 'react-router';
import queryString from 'query-string';
import Partials from './partials';
import { blog, tags } from '../../actions';
import { buildUrl } from '../../core/helpers/Utils';
import SocialWidgets from '../widgets';

export default class Blog extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      tags: []
    };
  }

  componentDidMount() {
    // Get list of tags
    tags(
      {},
      (tags) => this.setState({ tags }),
      (error)  => console.error(error)
    );

    // Get list of posts
    this.fetchPosts();
  }

  componentWillReceiveProps(props) {
    this.fetchPosts();
  }

  fetchPosts() {
    // Get filter parameter from query string
    const { tag } = queryString.parse(location.search);

    // If tag parameter provied
    const filter = typeof tag !== 'undefined'
      ? JSON.stringify({ tags: {'$in': [tag] } }) : '';

    const params = (filter)
      ? { filter, orderBy: 'dateCreated', ascdesc: -1 }
      : { orderBy: 'dateCreated', ascdesc: -1 };

    blog(
      params,
      (posts) => this.setState({ posts }),
      (error)  => console.error(error)
    );
  }

  render() {
    return (
      <section>
        <Partials.PageTitle breadcumbs={['Главная', 'Блог']} title="Блог" />

        <div class="wrapper blog clear">
          <div class="content">
            <div class="posts">
              {
                this.state.posts.length > 0 ?
                  this.state.posts.map(({ id, title, tags, picture, dateCreated }) => (
                    <div key={id} class="post">
                      <div class="post-wrapper">
                        <div class="picture">
                          <Link to={`/post/${id}`}>
                            <img src={buildUrl(picture)} alt={title} />
                          </Link>
                        </div>
                        <span class="tag fw-600">
                          {
                            (tags || []).map(({ id, title }, key) => (
                              <Link key={id} to={{ pathname: `/blog`, query: { tag: id } }}>
                                #{title}
                                { (key < tags.length - 1) && <span>, </span> }
                              </Link>
                            ))
                          }
                        </span>
                        <span class="date"> {Moment(dateCreated * 1000).format('DD.MM.YYYY')}</span>
                        <div class="heading-1">
                          {title}
                        </div>
                      </div>
                    </div>
                  )) :
                  <span>Не найдено постов удовлетворяющих критерию поиска.</span>
              }
            </div>
          </div>

          <div class="sitebar">
            <div class="heading-1">
              поиск по тегам:
            </div>
            <ul class="tags-list fw-600">
            {
              (this.state.tags || []).map(({ id, title }, key) => (
                <li key={id} class="tag">
                  <Link to={{ pathname: `/blog`, query: { tag: id } }}>
                    &nbsp;#{title}
                  </Link>
                  { (key < this.state.tags.length - 1) && <span>,</span> }
                </li>
              ))
            }
            </ul>
            <ul class="widgets">
              <li class="widget">
                <SocialWidgets.Facebook />
              </li>
              <li class="widget">
                <a href="#">
                  <img src={require('../../staticFiles/img/sitebar/widget-banner.jpg')} alt="Banner" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Partials.AdvertisingServices />
      </section>
    );
  }
}
