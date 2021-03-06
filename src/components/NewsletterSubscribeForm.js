// Adapted from react-mailchimp-subscribe:
// https://github.com/revolunet/react-mailchimp-subscribe

import React, { Component } from "react";
import jsonp from "jsonp";

// Components
import LoadingBlocks from './Loaders/LoadingBlocks';

const getAjaxUrl = url => url.replace('/post?', '/post-json?')

class NewsletterSubscribeForm extends Component {
  state = {
    status: null,
    input: {
      email: ''
    },
    formIsShown: true,
    action: "https://tapinguide.us14.list-manage.com/subscribe/post?u=14e98619ae4c42af11b4222bb&id=8e0497d99f"
  }

  onSubmit = (event) => {
    event.preventDefault();

    // Check field for properly formatted email
    if (!this.input.value || this.input.value.length < 5 || this.input.value.indexOf("@") === -1) {
      this.setState({
        status: "error"
      })
      return
    }

    const url = getAjaxUrl(this.state.action) + `&EMAIL=${encodeURIComponent(this.input.value)}`;

    this.setState(
      {
        status: "sending",
        msg: null
      }, () => jsonp(url, {
        param: "c"
      }, (error, data) => {
        if (error) {
          console.log('error: ', error);
          this.setState({
            status: 'error',
            msg: error
          })
        } else if (data.result !== 'success') {
          this.setState({
            status: 'error',
            msg: data.msg
          })
        } else {
          this.setState({
            status: 'success',
            formIsShown: false,
            msg: data.msg
          })
        }
      })
    ) // End this.setState()
  } // End onSubmit()

  renderForm() {
    let { status } = this.state;

    if (this.state.formIsShown) {
      return(
        <form
          action={this.state.action}
          method="post"
          noValidate
        >
          <div
            className="newsletter-subscribe-form-inner"
          >
            <input
              ref={node => (this.input = node)}
              type="email"
              defaultValue=""
              name="EMAIL"
              required={true}
              placeholder="Newsletter - Enter Your Email"
            />
            <button
              disabled={this.state.status === "sending" || this.state.status === "success"}
              onClick={this.onSubmit}
              type="submit"
            >
              {status === 'sending' ? <LoadingBlocks /> : 'Subscribe'}
            </button>
          </div>
        </form>
      )
    }
  }

  handleInputChange = (newPartialInput) => {
    console.log('handle')
    this.setState(state => ({
      ...state,
      input: {
        ...state.input,
        ...newPartialInput,
      }
    }))
  }

  renderErrorMessage() {
    let { msg } = this.state;

    if (msg) {
      if(msg.includes('already subscribed')) {
        return 'This email has already been subscribed to our newsletter';
      } else {
        return "Oops, there's been an error. Please try again."
      }
    }
  }

  renderMessage() {
    let { status } = this.state;

    if (status === "success") {
      return (
        <div className="message message-confirmation">
          Thanks for subscribing to Tap In!
        </div>
      )
    } else if (status === "error") {
      return(
        <p className="message message-error">
          {this.renderErrorMessage()}
        </p>
      )
    }
  }

  render() {
    return (
      <div className="newsletter-subscribe-form">
        {this.renderForm()}
        {this.renderMessage()}
      </div>
    )
  }
}

export default NewsletterSubscribeForm
