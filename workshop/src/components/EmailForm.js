import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const defaultFormState = {
    from: '',
    message: '',
    to: '',
    subject: ''
};
export default class EmailForm extends PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  }

  state = defaultFormState

  _updateFormFieldState(name, e) {
    this.setState({[name]: e.target.value});
  }

  _handleFormSubmit(e) {
    e.preventDefault();
    const { from, to, subject, message } = this.state;
    const { onSubmit } = this.props;

    if (onSubmit) {
      onSubmit({
        from,
        to,
        subject,
        message
      });
      this.setState(defaultFormState)
    }
  }

  render() {
    const { from, message, to, subject } = this.state;
    return (
      <form className="email-form" onSubmit={this._handleFormSubmit.bind(this)}>
        <fieldset>
          <label htmlFor="from">From:</label>
          <input
            type="email"
            id="from"
            value={from}
            placeholder="jill@me.com"
            onChange={this._updateFormFieldState.bind(this, 'from')}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="to">To:</label>
          <input
            type="email"
            id="to"
            value={to}
            placeholder="Recipient"
            onChange={this._updateFormFieldState.bind(this, 'to')}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            value={subject}
            placeholder="Subject"
            onChange={this._updateFormFieldState.bind(this, 'subject')}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            placeholder="[Insert message here]"
            onChange={this._updateFormFieldState.bind(this, 'message')}
          />
        </fieldset>
        <button type="submit">Send Email</button>
      </form>
    );
  }
}
