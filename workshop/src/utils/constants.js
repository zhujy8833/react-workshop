import PropTypes from 'prop-types';

export const EMAIL_PROP_TYPE = PropTypes.shape({
  from: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired
});
