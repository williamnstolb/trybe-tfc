enum Message {
  INCORRECT_EMAIL_OR_PASSWORD = 'Incorrect email or password',
  INCORRECT_FORMAT_EMAIL = 'Incorrect format email',
  FIELD_MUST_BE_FILLED = 'All fields must be filled',
  UNAUTHORIZED = 'Unauthorized',
  MATCH_NOT_IN_PROGRESS = 'Match is not in progress',
  SAME_TEAMS = 'It is not possible to create a match with two equal teams',
  MATCH_FINISHED = 'Match is finished',
  TEAM_NOT_EXIST = 'There is no team with such id!',
  MATCH_GOLS_UPDATED = 'Match goals updated',
}

export default Message;
