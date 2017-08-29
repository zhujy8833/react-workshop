// @flow
import * as React from 'react';
import EmailListItem from './EmailListItem';
import type { EMAIL_PROP_TYPE } from '../utils/constants';
import './EmailList.css';

type Props = {
  emails: Array<EMAIL_PROP_TYPE>,
  onItemDelete: Function,
  onItemSelect: Function,
  onMarkUnread: Function,
  selectedEmailId: ?number
}

export default class EmailList extends React.Component<Props> {

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
