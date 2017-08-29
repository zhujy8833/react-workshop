// @flow
import * as React from 'react';
import "./EmailForm.css";

const defaultFormState = {
    from: '',
    message: '',
    to: '',
    subject: ''
};

const ButtonBarWrapper = ({onCancel, shouldShowCancel}) => {
    let cancelButton;

    if (shouldShowCancel) {
      cancelButton = (
        <button onClick={onCancel}>Cancel</button>
      )
    }

    return (
      <footer className="email-form__button-bar">
        <button type="submit">Send email</button>
        {cancelButton}
      </footer>
    );
};


type Props = {
  onSubmit: Function,
  onCancel: Function
}

type State = {
    from: string,
    message: string,
    to: string,
    subject: string
}

export default class EmailForm extends React.Component<Props, State> {

  state = defaultFormState

  _updateFormFieldState(name: string, e: SyntheticInputEvent<HTMLInputElement>) {
    this.setState({[name]: e.target.value});
  }

  _handleFormSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
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

  _handleFormCancel = () => {
    const { onCancel } = this.props;

    this.setState(defaultFormState);
    onCancel();
  }

  render() {
    const { from, message, to, subject } = this.state;
    const { onCancel } = this.props;

    return (
      <form className="email-form" onSubmit={this._handleFormSubmit}>
        <fieldset className="email-form-field">
          <label className="email-form__label" htmlFor="from">From:</label>
          <input
            className="email-form__input"
            type="email"
            id="from"
            value={from}
            placeholder="jill@me.com"
            onChange={this._updateFormFieldState.bind(this, 'from')}
          />
        </fieldset>
        <fieldset className="email-form-field">
          <label className="email-form__label" htmlFor="to">To:</label>
          <input
            className="email-form__input"
            type="email"
            id="to"
            value={to}
            placeholder="Recipient"
            onChange={this._updateFormFieldState.bind(this, 'to')}
          />
        </fieldset>
        <fieldset className="email-form-field">
          <label className="email-form__label" htmlFor="subject">Subject:</label>
          <input
            className="email-form__input"
            type="text"
            id="subject"
            value={subject}
            placeholder="Subject"
            onChange={this._updateFormFieldState.bind(this, 'subject')}
          />
        </fieldset>
        <fieldset className="email-form-field">
          <label className="email-form__label" htmlFor="message">Message:</label>
          <textarea
            className="email-form__input-message"
            id="message"
            value={message}
            placeholder="[Insert message here]"
            onChange={this._updateFormFieldState.bind(this, 'message')}
          />
        </fieldset>
        <ButtonBarWrapper onCancel={this._handleFormCancel} shouldShowCancel={!!onCancel}/>
        </form>
    );
  }
}
