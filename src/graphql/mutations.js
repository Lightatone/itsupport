/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createEmail = /* GraphQL */ `
  mutation CreateEmail(
    $input: CreateEmailInput!
    $condition: ModelEmailConditionInput
  ) {
    createEmail(input: $input, condition: $condition) {
      id
      to
      from
      subject
      body
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateEmail = /* GraphQL */ `
  mutation UpdateEmail(
    $input: UpdateEmailInput!
    $condition: ModelEmailConditionInput
  ) {
    updateEmail(input: $input, condition: $condition) {
      id
      to
      from
      subject
      body
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteEmail = /* GraphQL */ `
  mutation DeleteEmail(
    $input: DeleteEmailInput!
    $condition: ModelEmailConditionInput
  ) {
    deleteEmail(input: $input, condition: $condition) {
      id
      to
      from
      subject
      body
      createdAt
      updatedAt
      __typename
    }
  }
`;
