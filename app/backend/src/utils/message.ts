enum Message {
  INCORRECT_EMAIL_OR_PASSWORD = 'Incorrect email or password',
  FIELD_MUST_BE_FILLED = 'All fields must be filled',
  UNAUTHORIZED = 'Unauthorized',
  MATCH_NOT_IN_PROGRESS = 'Match is not in progress',
  SAME_TEAMS = 'It is not possible to create a match with two equal teams',
  MATCH_FINISHED = 'Match is finished',
}

export default Message;
