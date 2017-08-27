const URL = '//localhost:9090/emails';

const _fetchJSON = (url, options = {}) =>
  fetch(url, options)
    .then((res) => res.json())
    .catch(e => console.log(e));

export const getEmails = () => _fetchJSON(URL);

export const addEmail = (newEmail) => _fetchJSON(URL, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(newEmail)
});

export const deleteEmail = (emailId) => {
  const deleteUrl = `${URL}/${emailId}`;

  return _fetchJSON(deleteUrl, {
    method: 'DELETE'
  });
};

export const toggleEmailUnread = (emailId, unread) =>
  _fetchJSON(`${URL}/${emailId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({unread})
  });