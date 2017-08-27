import React, {PureComponent} from 'react';

import EmailList from './components/EmailList';
import EmailForm from './components/EmailForm';
import EmailView from './components/EmailView';
// import EMAILS from './utils/emails';
import PropTypes from 'prop-types';

const defaultInterval = 5000;

export default class App extends PureComponent {
  static protoTypes = {
    pollInterval: PropTypes.number
  }

  static defaultProps = {
    pollInterval: defaultInterval
  }

  state = {
    emails: [],
    selectedEmailId: -1,
    closeView: false,
  }

  componentDidMount() {

    this._pollEmails();

    this._pollInterval = setInterval(() => {
      this._pollEmails();
    }, this.props.pollInterval);
  }

  componentWillUnmount() {
    clearInterval(this._pollInterval)
  }

  _pollEmails() {
    fetch('//localhost:9090/emails')
      .then((res) => res.json())
      .then(emails => this.setState({emails}))
      .catch(e => console.log(e))
  }

  _handleItemSelect(emailId) {
    this.setState(({selectedEmailId: prevSelectedEmailId}) => {
      return {
        selectedEmailId: emailId === prevSelectedEmailId ? -1 : emailId
      };
    });
  }

  _handleOnClose() {
    this.setState({selectedEmailId: -1});
  }

  _handleFormSubmit(newEmail) {
    console.log('submit');
    const { emails } = this.state;

    fetch('//localhost:9090/emails', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newEmail)
    })
      .then(res => res.json())
      .then(({success}) => {
        if (!success) {
          throw new Error('Unable to send email!');
        } else {
          this.setState(({ emails }) => {
            const newEmails = [{
              ...newEmail,
              id: Date.now(),
              date: `${new Date()}`,
              unread: true
            }, ...emails];

            return {
              emails: newEmails
            }
          });
        }
      })
      .catch(ex => console.error(ex));
  }

  _handleItemDelete(emailId) {
    const { emails, selectedEmailId } = this.state;

    fetch(`//localhost:9090/emails/${emailId}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(({success}) => {
      if (!success) {
        throw new Error(`Unable to delete email ID# ${emailId}.`);
      } else {
        const emailToDeleteIndex = emails.findIndex(({id}) => id === emailId);

        if (selectedEmailId === emailId ) {
          this.setState({ selectedEmailId: -1});
        }
        if (emailToDeleteIndex >= 0) {
          this.setState(({ emails }) => {
            const copyEmails = emails.slice();
            copyEmails.splice(emailToDeleteIndex, 1);
            return {
              emails: copyEmails
            }
          });
        }
      }
    })
    .catch(ex => console.error(ex));
  }

  _setUnread(emailId, unread = true) {
    // Make a PUT request to update unread state
    const { emails } = this.state;

    fetch(`//localhost:9090/emails/${emailId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({unread})
    })
    .then(res => res.json())
    .then(({success}) => {
      if (!success) {
        throw new Error(
          `Unable to set email ID# ${emailId} unread state to ${unread}.`
        );
      } else {
        const newEmails = emails.map(email => email.id ===emailId ? {...email, unread } : email );

        this.setState(({ emails }) => {
          return { emails: newEmails };
        });
        //return { emails: newEmails };
      }
    })
    .catch(ex => console.error(ex));
  }

  _handleItemMarkRead(emailId) {
    this._setUnread(emailId, false);
  }

  _handleItemMarkUnread(emailId) {
    this._setUnread(emailId, true);
  }

  render() {
    const { emails , selectedEmailId } = this.state;
    const selectedEmail = emails.find(({id}) => id === selectedEmailId);

    let emailView;

    if (selectedEmail) {
      emailView = <EmailView email={selectedEmail}
        onClose={this._handleOnClose.bind(this)}
        onDelete={this._handleItemDelete.bind(this)}
        onMarkRead={this._handleItemMarkRead.bind(this)}
        onMarkUnread={this._handleItemMarkUnread.bind(this)}
      />
    }

    return(
      <main className="app">
        <EmailList
          emails={emails}
          selectedEmailId={selectedEmailId}
          onItemSelect={this._handleItemSelect.bind(this)}
          onItemDelete={this._handleItemDelete.bind(this)}
          onMarkUnread={this._handleItemMarkUnread.bind(this)}
        />
        {emailView}
        <EmailForm onSubmit={this._handleFormSubmit.bind(this)}/>
      </main>
    );
  }
}
