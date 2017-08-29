// @flow
import type { EmailType } from '../utils/constants';
import {
  addEmail as addEmailRequest,
  getEmails as getEmailsRequest,
  deleteEmail as deleteEmailRequest,
  toggleEmailUnread as toggleEmailUnreadRequest
} from '../api';

export const addEmail = (newEmail: EmailType, existingEmails:Array<Object> = []): Promise<*> =>
  addEmailRequest(newEmail)
  .then((res = {}) => {
    const { success } = res;

    if (!success) {
      throw new Error('Unable to send email!');
    } else {
      return [
        {
          ...newEmail,
          id: Date.now(),
          date: `${String(new Date())}`,
          unread: true
        },
        ...existingEmails
      ];
    }
  })

export const getEmails = (): Promise<*> => getEmailsRequest();

export const deleteEmail = (emailId: number, existingEmails: Array<EmailType> = []): Promise<*> =>
  deleteEmailRequest(emailId).then((res = {}) => {
    const { success } = res;

    if (!success) {
      throw new Error(`Unable to delete email ID# ${String(emailId)}.`);
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

  export const toggleEmailUnread = (emailId: number, unread: boolean, existingEmails: Array<EmailType> = []): Promise<*> =>
    toggleEmailUnreadRequest(emailId, unread).then((res = {}) => {
      const { success } = res;
      if (!success) {
        throw new Error(
          `Unable to set email ID# ${String(emailId)} unread state to ${String(unread)}.`
        );
      } else {
        return existingEmails.map(email => email.id === emailId ? {...email, unread } : email );
      }
    });