module.exports = {
  "extends": ['@commitlint/config-conventional'],
  rules:{
    "header-max-length": [0, "always", 72], 
    "body-empty":[2,"never"],
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'style',
        'refactor',
        'test',
        'chore',
        'ci',
        'build',
      ],
    ],
  },
}
