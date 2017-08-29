// @flow
import * as React from 'react';
import type { EmailType } from '../utils/constants';
import './EmailListItem.css';
import classNames from 'classnames';

const EmailListStatus = ({isSelected, unread, onMarkUnread, onDelete}) => {
  let markUnreadButton;

  if (isSelected && !unread) {
    markUnreadButton = <button onClick={onMarkUnread}>Mark Unread</button>
  }

  return (
    <span className="email-list-item__status">
      <button onClick={onDelete}>Delete</button>
      {markUnreadButton}
    </span>
  );
};

type Props = {
  email: EmailType,
  onSelect: Function,
  onDeleteEmail: Function,
  onMarkUnread: Function,
  isSelected: boolean
}

export default class EmailListItem extends React.Component<Props> {

  _handleClick = (e: SyntheticEvent<HTMLDivElement>) => {
    e.stopPropagation();

    const emailId = this.props.email.id;
    this.props.onSelect(emailId);
  }

  _handleClickDelete = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const { id: emailId } = this.props.email;

    if (emailId) {
      this.props.onDeleteEmail(emailId);
    }
  }

  _handleMarkUnread = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const { onMarkUnread, email: { id: emailId } } = this.props;

    if (onMarkUnread) {
      this.props.onMarkUnread(emailId);
    }
  }

  render() {
    const { isSelected, email: { from, subject, unread } } = this.props;

    const className = classNames('email-list-item', {
      'email-list-item--selected': isSelected,
      'email-list-item--unread': unread
    });

    return (
      <div className={className} onClick={this._handleClick}>
        <span className="email-list-item__from">{from}</span>
        <span className="email-list-item__subject">{subject}</span>
        <EmailListStatus
          isSelected={isSelected}
          unread={unread}
          onDelete={this._handleClickDelete}
          onMarkUnread={this._handleMarkUnread}
        />
      </div>
    )
  }
}
