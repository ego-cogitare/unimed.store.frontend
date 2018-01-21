import React from 'react';
import Moment from 'moment';
import { Link } from 'react-router';
import Partials from './partials';
import { blog, tags } from '../../actions';
import { buildUrl } from '../../core/helpers/Utils';

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
    blog(
      { orderBy: 'dateCreated', ascdesc: -1 },
      (posts) => this.setState({ posts }),
      (error)  => console.error(error)
    );
  }

  filterByTag(tagId, e) {
    e.preventDefault();

    // Get list of posts
    blog(
      { filter: `{"tags":{"$in":["${tagId}"]}}`, orderBy: 'dateCreated', ascdesc: -1 },
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
                  this.state.posts.map(({ id, title, tags, pictures, pictureId, dateCreated }) => (
                    <div key={id} class="post">
                      <div class="post-wrapper">
                        <div class="picture">
                          <Link to={`/post/${id}`}>
                            { pictures.length > 0 && <img src={buildUrl(pictures.find(({id}) => id === pictureId) || pictures[0])} alt={title} /> }
                          </Link>
                        </div>
                        <span class="tag fw-600">
                          {
                            (tags || []).map(({ id, title }, key) => (
                              <a href="#" key={id} onClick={this.filterByTag.bind(this, id)}>
                                #{title}
                                { (key < tags.length - 1) && <span>, </span> }
                              </a>
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
                  <a href="#" onClick={this.filterByTag.bind(this, id)}>
                    &nbsp;#{title}
                  </a>
                  { (key < this.state.tags.length - 1) && <span>,</span> }
                </li>
              ))
            }
            </ul>
            <ul class="widgets">
              <li class="widget">
                <a href="#">
                  <img src={require('../../staticFiles/img/sitebar/widget-facebook.jpg')} alt="Facebook" />
                </a>
              </li>
              <li class="widget">
                <a href="#">
                  <img src={require('../../staticFiles/img/sitebar/widget-vk.jpg')} alt="VK" />
                </a>
              </li>
              <li class="widget">
                <a href="#">
                  <img src={require('../../staticFiles/img/sitebar/widget-instagram.jpg')} alt="Instagram" />
                </a>
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
