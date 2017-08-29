// @flow

export type EmailType = {
  id: string,
  date: ?string,
  from: string,
  subject: string,
  to: string,
  message: string,
  unread: ?boolean
};