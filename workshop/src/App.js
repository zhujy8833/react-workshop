// @flow
import * as React from 'react';
import './App.css';
import EmailList from './components/EmailList';
import EmailForm from './components/EmailForm';
import EmailView from './components/EmailView';
import type { EmailType } from './utils/constants';

import {
  addEmail,
  getEmails,
  deleteEmail,
  toggleEmailUnread
} from './action-reducer';
import sortBy from 'lodash/sortBy';

const defaultInterval = 5000;

const EmailViewWrapper = ({selectedEmail, onClose, onDelete, onMarkRead, onMarkUnread}) => {
    let emailViewComponent = null;

    if (selectedEmail) {
      emailViewComponent = (
        <article className="app__view">
          <EmailView
            email={selectedEmail}
            onClose={onClose}
            onDelete={onDelete}
            onMarkRead={onMarkRead}
            onMarkUnread={onMarkUnread}
          />
        </article>
      )
    }

    return emailViewComponent
};

const EmailFormWrapper = ({showForm, onFormSubmit, onFormCancel}) => {
  let emailFormComponent = null;

  if (showForm) {
    emailFormComponent = (
      <div className="app__form">
        <EmailForm onSubmit={onFormSubmit} onCancel={onFormCancel}/>
      </div>
    );
  }

  return emailFormComponent;
};

type Props = {
  pollInterval?: number
}

type State = {
  emails: Array<EmailType>,
  selectedEmailId: number,
  showForm: boolean
}

export default class App extends React.Component<Props, State> {

  static defaultProps = {
    pollInterval: defaultInterval
  }

  state = {
    emails: [],
    selectedEmailId: -1,
    showForm: false
  }

  _pollInterval = 0

  componentDidMount() {
    const { pollInterval } = this.props;

    this._pollEmails();

    this._pollInterval = setInterval(() => {
      this._pollEmails();
    }, pollInterval);
  }

  componentWillUnmount() {
    clearInterval(this._pollInterval)
  }

  _pollEmails() {
    getEmails().then(emails => this.setState({emails}));
  }

  _handleItemSelect = (emailId: number) => {
    this.setState(({selectedEmailId: prevSelectedEmailId}) => {
      return {
        selectedEmailId: emailId === prevSelectedEmailId ? -1 : emailId
      };
    });
  }

  _handleOnClose = () => {
    this.setState({selectedEmailId: -1});
  }

  _handleFormSubmit = (newEmail: EmailType) => {
    const { emails } = this.state;

    addEmail(newEmail, emails)
      .then(emails => this.setState({
        emails,
        showForm: false
      }));
  }

  _handleItemDelete = (emailId: number) => {
    const { emails, selectedEmailId } = this.state;

    deleteEmail(emailId, emails)
      .then(({emailToDeleteIndex, emails}) => {
        if (selectedEmailId === emailId) {
          this.setState({
            selectedEmailId: -1
          });
        }
        if (emailToDeleteIndex >= 0) {
          this.setState({emails});
        }
      });
  }

  _setUnread(emailId: number, unread: boolean = true) {
    // Make a PUT request to update unread state
    const { emails } = this.state;

    toggleEmailUnread(emailId, unread, emails)
      .then(emails => this.setState({emails}));
  }

  _handleItemMarkRead = (emailId: number) => {
    this._setUnread(emailId, false);
  }

  _handleItemMarkUnread = (emailId: number) => {
    this._setUnread(emailId, true);
  }

  _handleShowForm = () => {
    this.setState({showForm: true});
  }

  _handleFormCancel = () => {
    this.setState({showForm: false});
  }

  _sortEmailsByUnread(emails: Array<EmailType>) {
    return sortBy(emails, (email) => !email.unread);
  }

  render() {
    const { emails , selectedEmailId, showForm } = this.state;
    const selectedEmail = emails.find(({id}) => id === selectedEmailId);

    return(
      <main className="app">
        <div className="app__page">
          <div className="app__list">
            <EmailList
              className="app__list"
              emails={this._sortEmailsByUnread(emails)}
              selectedEmailId={selectedEmailId}
              onItemSelect={this._handleItemSelect}
              onItemDelete={this._handleItemDelete}
              onMarkUnread={this._handleItemMarkUnread}
            />
          </div>
          <EmailViewWrapper
            selectedEmail={selectedEmail}
            onClose={this._handleOnClose}
            onDelete={this._handleItemDelete}
            onMarkRead={this._handleItemMarkRead}
            onMarkUnread={this._handleItemMarkUnread}
          />
          <button
            className="app__new-email"
            onClick={this._handleShowForm}
          >
            +
          </button>
          <EmailFormWrapper
            showForm={showForm}
            onFormSubmit={this._handleFormSubmit}
            onFormCancel={this._handleFormCancel}
          />
        </div>
      </main>
    );
  }
}
