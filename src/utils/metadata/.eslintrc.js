module.exports = {
  extends: [require.resolve('src/utils/config/eslint/base.js')],
  rules: {
    'import/no-anonymous-default-export': 'off'
  }
};
