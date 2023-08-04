module.exports = {
  extends: [require.resolve('@/tsconfig.json')],
  rules: {
    'import/no-anonymous-default-export': 'off',
    'no-use-before-define': 'off'
  }
};
