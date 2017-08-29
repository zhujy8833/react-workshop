// @flow

// export const EMAIL_PROP_TYPE = PropTypes.shape({
//   from: PropTypes.string.isRequired,
//   subject: PropTypes.string.isRequired
// });

export type EMAIL_PROP_TYPE = {
  id: string,
  date: ?string,
  from: string,
  subject: string,
  to: string,
  message: string,
  unread: ?boolean
};