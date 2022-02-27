const PARSE_PRESET = 'conventional-changelog-conventionalcommits';
const RULES = {
  'body-leading-blank': [1, 'always'],
  'footer-leading-blank': [1, 'always'],
  'header-max-length': [2, 'always', 82],
  'scope-case': [2, 'always', 'lower-case'],
  'subject-case': [2, 'always', 'sentence-case'],
  'subject-empty': [2, 'never'],
  'subject-full-stop': [2, 'never', '.'],
  'type-case': [2, 'never', 'lower-case'],
  'type-empty': [2, 'never'],
  'type-enum': [2, 'always', ['GENERAL', 'MAINTENANCE', 'ClientService', 'AuthService', 'WIP']],
};
