// @flow

export type EmailType = {
  id: number,
  date: ?string,
  from: string,
  subject: string,
  to: string,
  message: string,
  unread: ?boolean
};