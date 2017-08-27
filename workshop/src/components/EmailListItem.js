import React, {PureComponent} from 'react';
import { EMAIL_PROP_TYPE } from '../utils/constants';
import PropTypes from 'prop-types';
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
export default class EmailListItem extends PureComponent {
  static propTypes = {
    email: EMAIL_PROP_TYPE.isRequired,
    onSelect: PropTypes.func.isRequired,
    onDeleteEmail: PropTypes.func.isRequired,
    onMarkUnread: PropTypes.func.isRequired,
    isSelected: PropTypes.bool
  };

  _handleClick(e) {
    e.stopPropagation();

    const emailId = this.props.email.id;
    this.props.onSelect(emailId);
  }

  _handleClickDelete(e) {
    e.stopPropagation();
    const { id: emailId } = this.props.email;

    if (emailId) {
      this.props.onDeleteEmail(emailId);
    }
  }

  _handleMarkUnread(e) {
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
      <div className={className} onClick={this._handleClick.bind(this)}>
        <span className="email-list-item__from">{from}</span>
        <span className="email-list-item__subject">{subject}</span>
        <EmailListStatus
          isSelected={isSelected}
          unread={unread}
          onDelete={this._handleClickDelete.bind(this)}
          onMarkUnread={this._handleMarkUnread.bind(this)}
        />
      </div>
    )
  }
}
