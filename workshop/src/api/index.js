// @flow
import type { EmailType } from '../utils/constants';

const URL = '//localhost:9090/emails';

const _fetchJSON = (url: string, options?: Object = {}): Promise<*> =>
  fetch(url, options)
    .then(res => res.json())
    .catch((e: Error) => console.log(e));

export const getEmails = () => _fetchJSON(URL);

export const addEmail = (newEmail: EmailType): Promise<*> => _fetchJSON(URL, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(newEmail)
});

export const deleteEmail = (emailId: number): Promise<*> => {
  const deleteUrl = `${URL}/${emailId}`;

  return _fetchJSON(deleteUrl, {
    method: 'DELETE'
  });
};

export const toggleEmailUnread = (emailId: number, unread: boolean): Promise<*> =>
  _fetchJSON(`${URL}/${emailId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({unread})
  });