import React from 'react';
import Moment from 'moment';
import { Link } from 'react-router';
import Partials from './partials';
import { blog, post, products, tags, addPostComment } from '../../actions';
import { buildUrl, getRandomOrder } from '../../core/helpers/Utils';

export default class Post extends React.Component {

  constructor(props) {
    super(props);

    this.emptyComment = {
        userName: '',
        message: '',
        errorField: '',
        errorMessage: '',
        successMessage: ''
    };

    this.state = {
      post: {
        comments: []
      },
      comment: { ...this.emptyComment },
      relatedPosts: [], // Related by tag
      tags: [],
      bestsellers: [],
      loaded: false
    }
  }

  fetchPost() {
    post(
      { id: this.props.params.id },
      (post) => {
        this.setState({
          post,
          loaded: true
        },
        () => {
          // If no tags to post assigned
          if (post.tags.length === 0) {
            return false;
          }
          // Get related by tags products
          blog(
            { orderBy: 'dateCreated',
              filter: JSON.stringify({ tags:{'$in': post.tags.map(({id}) => id)} }),
              ascdesc: getRandomOrder(),
              limit: 4 },
            (posts) => this.setState({ relatedPosts: posts }),
            (error)  => console.error(error)
          );
        }
      );
      },
      (error)  => console.error(error)
    );
  }

  componentDidMount() {
    this.fetchPost();

    // Get list of bestseller products
    products(
      { filter: JSON.stringify({ isBestseller: true }),
        limit: 2,
        orderBy: 'dateCreated',
        ascdesc: getRandomOrder() },
      (bestsellers) => this.setState({ bestsellers }),
      (error)  => console.error(error)
    );

    // Get list of tags
    tags(
      {},
      (tags) => this.setState({ tags }),
      (error)  => console.error(error)
    );
  }

  addComment(e) {
    e.preventDefault();

    addPostComment(
      Object.assign({ ...this.state.comment }, { postId: this.props.params.id }),
      (response) => this.setState({
          comment: { ...this.emptyComment, successMessage: response.message },
          post: Object.assign(this.state.post, {
            comments: this.state.post.comments.concat([response.comment])
          })
        },
        () => setTimeout(() => this.setState({
                comment: Object.assign(this.state.comment, { successMessage: '' })
              }), 2000)
      ),
      ({responseJSON}) => this.setState({
        comment: Object.assign(
          this.state.comment, {
            errorField: responseJSON.field,
            errorMessage: responseJSON.error
        })
      })
    );
  }

  render() {
    return (
      <section>
        <Partials.PageTitle
          breadcumbs={['Главная', 'Блог', this.state.post.title]}
          title={this.state.post.title}
        />

        {
          this.state.loaded > 0 &&
          <div class="wrapper article clear">
            <div class="content">
              <div class="body clear">
                  <div class="cover-wrapper left">
                    <img src={buildUrl(this.state.post.picture)} alt={this.state.post.title} />
                  </div>
                  <div class="heading-1">
                    {this.state.post.title}
                  </div>
                  <div class="tag-date">
                    <span class="tag fw-600">
                    {
                      (this.state.post.tags || []).map(({ id, title }, key) => (
                        <Link key={id} to={{ pathname: `/blog`, query: { tag: id } }}>
                          #{title}
                          { (key < this.state.post.tags.length - 1) && <span>, </span> }
                        </Link>
                      ))
                    },
                    </span>
                    <span class="date"> {Moment(this.state.post.dateCreated * 1000).format('DD.MM.YYYY')}</span>
                  </div>
                  <div class="text-block" dangerouslySetInnerHTML={{ __html: this.state.post.body }} />
                </div>

                {
                  this.state.post.video &&
                  <div class="section-header text-left no-margin">
                    <div class="title-wrapper">
                      <div class="heading-1">обзор на youtube:</div>
                    </div>
                    <div class="description"></div>
                  </div>
                }
                {
                  this.state.post.video &&
                  <div class="youtube-overview">
                    <iframe src={`https://www.youtube.com/embed/${new URL(this.state.post.video).searchParams.get('v')}`} frameBorder="0" allowFullScreen=""></iframe>
                  </div>
                }

                <Partials.BlockTitle title="вам может быть интересно:" className="text-left no-margin" />
                <div class="posts">
                  {
                    this.state.relatedPosts.map(({id, title, picture, dateCreated, tags}) => (
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
                                #{title}&nbsp;
                                { (key < tags.length - 1) && <span>, </span> }
                              </Link>
                            ))
                          }
                          </span>
                          <span class="date">{Moment(this.state.post.dateCreated * 1000).format('DD.MM.YYYY')}</span>
                          <div class="heading-1">{title}</div>
                        </div>
                      </div>
                    ))
                  }
                </div>

                <Partials.BlockTitle title="коментарии:" className="text-left no-margin" />
                <div class="comments">
                  {
                    this.state.post.comments.map(({id, userName, comment, dateCreated}) => (
                      <div key={id} class="comment-wrapper clear">
                        <div class="quote left">
                          <img src={require('../../staticFiles/img/article/quote.png')} alt="Quote" />
                        </div>
                        <div class="comment left">
                          <div class="user-date">
                            <span class="fw-600">{userName} | </span>
                            <span class="date color-green">{Moment(dateCreated * 1000).format('DD.MM.YYYY HH:mm')}</span>
                          </div>
                          <p class="text">
                            {comment}
                          </p>
                        </div>
                        <div class="hr right"></div>
                      </div>
                    ))
                  }
                  <div class="post-comment">
                    <div class="form-row">
                      <div class="fw-600">Ваше имя:</div>
                      <input
                        type="text"
                        class="input w100p"
                        placeholder="Ваше имя"
                        value={this.state.comment.userName}
                        onChange={(e) => this.setState({
                          comment: Object.assign(this.state.comment, { userName: e.target.value })
                        })}
                      />
                      { this.state.comment.errorField === 'userName' && <small class="color-red no-wrap">{this.state.comment.errorMessage}</small> }
                    </div>
                    <div class="form-row">
                      <div class="fw-600">Ваш коментарий:</div>
                      <textarea
                        class="input textarea w100p"
                        placeholder="Коментарий..."
                        value={this.state.comment.message}
                        onChange={(e) => this.setState({
                          comment: Object.assign(this.state.comment, { message: e.target.value })
                        })}
                      ></textarea>
                      { this.state.comment.errorField === 'message' && <small class="color-red no-wrap">{this.state.comment.errorMessage}</small> }
                      { this.state.comment.successMessage && <small class="color-green no-wrap">{this.state.comment.successMessage}</small> }
                    </div>
                    <div class="btn-green" onClick={this.addComment.bind(this)}>написать отзыв</div>
                  </div>
                </div>
              </div>

              <div class="sitebar">
                <Partials.BlockTitle
                  title="хиты продаж:"
                  className="text-left no-margin"
                />
                <Partials.ProductsList
                  products={this.state.bestsellers}
                  className="no-hover-border no-hover-btn"
                />

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
                    <a href="#">
                      <img src={require('../../staticFiles/img/sitebar/widget-banner.jpg')} alt="Banner" />
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
        }

        <Partials.AdvertisingServices />
      </section>
    );
  }
}
