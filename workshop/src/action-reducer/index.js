import {
  addEmail as addEmailRequest,
  getEmails as getEmailsRequest,
  deleteEmail as deleteEmailRequest,
  toggleEmailUnread as toggleEmailUnreadRequest
} from '../api';

export const addEmail = (newEmail, existingEmails=[]) =>
  addEmailRequest(newEmail)
  .then(({success}) => {
    if (!success) {
      throw new Error('Unable to send email!');
    } else {
      return [
        {
          ...newEmail,
          id: Date.now(),
          date: `${new Date()}`,
          unread: true
        },
        ...existingEmails
      ];
    }
  });

export const getEmails = () => getEmailsRequest();

export const deleteEmail = (emailId, existingEmails=[]) =>
  deleteEmailRequest(emailId).then(({success}) => {
    if (!success) {
      throw new Error(`Unable to delete email ID# ${emailId}.`);
    } else {
      const emailToDeleteIndex = existingEmails.findIndex(({id}) => id === emailId);
      const copyEmails = existingEmails.slice();

      copyEmails.splice(emailToDeleteIndex, 1);

      return {
        emailToDeleteIndex,
        emails: copyEmails
      };
    }
  });

  export const toggleEmailUnread = (emailId, unread, existingEmails=[]) =>
    toggleEmailUnreadRequest(emailId, unread).then(({success}) => {
      if (!success) {
        throw new Error(
          `Unable to set email ID# ${emailId} unread state to ${unread}.`
        );
      } else {
        return existingEmails.map(email => email.id === emailId ? {...email, unread } : email );
      }
    });