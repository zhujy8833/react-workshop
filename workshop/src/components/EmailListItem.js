import React, {PureComponent} from 'react';
import { EMAIL_PROP_TYPE } from '../utils/constants';
import PropTypes from 'prop-types';

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

    let markUnreadButton;

    if (isSelected && !unread) {
      markUnreadButton = <button onClick={this._handleMarkUnread.bind(this)}>Mark Unread</button>
    }
    return (
      <div className="email-list-item" onClick={this._handleClick.bind(this)}>
        <span>{from}</span>
        <span>{subject}</span>
        <button onClick={this._handleClickDelete.bind(this)}>Delete</button>
        {markUnreadButton}
      </div>
    )
  }
}
