// @flow
import * as React from 'react';
import type { EmailType } from '../utils/constants';
import "./EmailView.css";

const EmailViewButtonBar = ({unread, onMardRead, onMarkUnread, onClose, onDelete}) => {
    const markUnreadButton = unread ? (
      <button onClick={onMardRead}>Mark Read</button>
    ) : (
      <button onClick={onMarkUnread}>Mark Unread</button>
    )

    return (
      <div className="email-view__button-bar">
        <button onClick={onDelete}>Delete Me!</button>
        {markUnreadButton}
        <button className="close-it" onClick={onClose}>Close Me!</button>
      </div>
    );
};

type Props = {
  email: EmailType,
  onClose: Function,
  onDelete: Function,
  onMarkRead: Function,
  onMarkUnread: Function
}

export default class EmailView extends React.Component<Props> {

  _handleOnClose = () => {
    const { onClose } = this.props;

    if (onClose) {
      onClose();
    }
  }

  _handleOnDelete = () => {
    const { onDelete, email: { id: emailId } } = this.props;

    if (onDelete) {
      onDelete(emailId);
    }
  }

  _handleMarkRead = () => {
    const { onMarkRead, email: { id: emailId } } = this.props;

    if (onMarkRead) {
      onMarkRead(emailId);
    }
  }

  _handleMarkUnread = () => {
    const { onMarkUnread, email: { id: emailId } } = this.props;

    if (onMarkUnread) {
      onMarkUnread(emailId);
    }
  }

  render() {
    const { from, subject, message, date, unread } = this.props.email;
    const rawMessage = {__html: message};

    return (
      <div className="email-view">
        <h1>{subject}</h1>
        <h2>From: <a href={`mailto:${from}`}>{from}</a></h2>
        <h3>{date}</h3>
        <div dangerouslySetInnerHTML={rawMessage}/>
        <EmailViewButtonBar
          unread={unread}
          onMardRead={this._handleMarkRead}
          onMarkUnread={this._handleMarkUnread}
          onClose={this._handleOnClose}
          onDelete={this._handleOnDelete}
        />
      </div>
    );
  }
}
