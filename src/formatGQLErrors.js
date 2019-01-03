export default (errors) => errors.reduce((acc, error) => {
  acc[error.key] = error.message;
  return acc;
}, {})
