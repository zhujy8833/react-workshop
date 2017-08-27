import React, {PureComponent} from 'react';
import EmailListItem from './EmailListItem';
import PropTypes from 'prop-types';
import { EMAIL_PROP_TYPE } from '../utils/constants';
import './EmailList.css';

export default class EmailList extends PureComponent {
  static propTypes = {
    emails: PropTypes.arrayOf(EMAIL_PROP_TYPE).isRequired,
    onItemSelect: PropTypes.func.isRequired,
    onItemDelete: PropTypes.func.isRequired,
    onMarkUnread: PropTypes.func.isRequired,
    selectedEmailId: PropTypes.number
  }

  render() {
    const { emails, selectedEmailId } = this.props;

    const emailComponent = emails.map(email =>
      <li className="email-list__item" key={email.id}>
        <EmailListItem
          email={email}
          onSelect={this.props.onItemSelect}
          onDeleteEmail={this.props.onItemDelete}
          onMarkUnread={this.props.onMarkUnread}
          isSelected={email.id === selectedEmailId}
        />
      </li>
    );

    return (
      <ul className="email-list">
        {emailComponent}
      </ul>
    );
  }
}
