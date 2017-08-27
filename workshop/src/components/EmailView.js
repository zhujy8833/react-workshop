import React, {PureComponent} from 'react';
import { EMAIL_PROP_TYPE } from '../utils/constants';
import PropTypes from 'prop-types';

export default class EmailView extends PureComponent {
  static propTypes = {
    email: EMAIL_PROP_TYPE,
    onClose: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onMarkRead: PropTypes.func.isRequired,
    onMarkUnread: PropTypes.func.isRequired
  }

  _handleOnClose() {
    const { onClose } = this.props;

    if (onClose) {
      onClose();
    }
  }

  _handleOnDelete() {
    const { onDelete, email: { id: emailId } } = this.props;

    if (onDelete) {
      onDelete(emailId);
    }
  }

  _handleMarkRead() {
    const { onMarkRead, email: { id: emailId } } = this.props;

    if (onMarkRead) {
      onMarkRead(emailId);
    }
  }

  _handleMarkUnread() {
    const { onMarkUnread, email: { id: emailId } } = this.props;

    if (onMarkUnread) {
      onMarkUnread(emailId);
    }
  }

  render() {
    const { from, subject, message, date, unread } = this.props.email;
    const rawMessage = {__html: message};

    const markUnreadButton = unread ? (
      <button onClick={this._handleMarkRead.bind(this)}>Mark Read</button>
    ) : (
      <button onClick={this._handleMarkUnread.bind(this)}>Mark Unread</button>
    )

    return (
      <div className="email-view">
        <h1>{subject}</h1>
        <h2>From: <a href={`mailto:${from}`}>{from}</a></h2>
        <h3>{date}</h3>
        <div dangerouslySetInnerHTML={rawMessage}/>
        <button className="close-it" onClick={this._handleOnClose.bind(this)}>Close Me!</button>
        <button onClick={this._handleOnDelete.bind(this)}>Delete Me!</button>
        {markUnreadButton}
      </div>
    );
  }
}
