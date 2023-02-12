import { gql } from 'graphql-modules';

export const sharedTypeDefs = gql`
  type Query
  type Mutation
  # type Subscription

  scalar DateTime
  scalar JSON

  type ArchivePayload {
    success: Boolean!
    error: String
  }

  type BatchPayload {
    success: Boolean!
    count: Int
  }

  enum EventType {
    INSERT
    UPDATE
    DELETE
  }

  type PageInfo {
    hasPreviousPage: Boolean!
    hasNextPage: Boolean!
    startCursor: String
    endCursor: String
  }

  input DateComparator {
    """
    Equals constraint.
    """
    equals: DateTime

    """
    Not-equals constraint.
    """
    not: DateTime

    """
    In-array constraint.
    """
    in: [DateTime!]

    """
    Not-in-array constraint.
    """
    notIn: [DateTime!]

    """
    Less-than constraint. Matches any values that are less than the given value.
    """
    lt: DateTime

    """
    Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.
    """
    lte: DateTime

    """
    Greater-than constraint. Matches any values that are greater than the given value.
    """
    gt: DateTime

    """
    Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.
    """
    gte: DateTime
  }

  input PriorityComparator {
    """
    Equals constraint.
    """
    equals: Priority

    """
    Not-equals constraint.
    """
    not: Priority

    """
    In-array constraint.
    """
    in: [Priority!]

    """
    Not-in-array constraint.
    """
    notIn: [Priority!]
  }

  """
  By which field should the pagination order by
  """
  enum PaginationOrderBy {
    createdAt
    updatedAt
  }

  enum SortOrder {
    asc
    desc
  }

  """
  Comparator for strings.
  """
  input StringComparator {
    """
    Equals constraint.
    """
    equals: String

    """
    In-array constraint.
    """
    in: [String!]

    """
    Not-in-array constraint.
    """
    notIn: [String!]

    """
    Less-than constraint. Matches any values that are less than the given value.
    """
    lt: String

    """
    Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.
    """
    lte: String

    """
    Greater-than constraint. Matches any values that are greater than the given value.
    """
    gt: String

    """
    Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.
    """
    gte: String

    """
    Case sensitive constraint. Matches string values case sensitive.
    """
    caseSensitive: Boolean

    """
    Starts with constraint. Matches any values that start with the given string.
    """
    startsWith: String

    """
    Ends with constraint. Matches any values that end with the given string.
    """
    endsWith: String

    """
    Contains constraint. Matches any values that contain the given string.
    """
    contains: String

    """
    Not-equals constraint.
    """
    not: String
  }

  """
  Comparator for identifiers.
  """
  input IDComparator {
    """
    Equals constraint.
    """
    equals: ID

    """
    Not-equals constraint.
    """
    not: ID

    """
    In-array constraint.
    """
    in: [ID!]

    """
    Not-in-array constraint.
    """
    notIn: [ID!]
  }

  """
  Comparator for numbers.
  """
  input NumberComparator {
    """
    Equals constraint.
    """
    equals: Float

    """
    Not-equals constraint.
    """
    not: Float

    """
    In-array constraint.
    """
    in: [Float!]

    """
    Not-in-array constraint.
    """
    notIn: [Float!]

    """
    Less-than constraint. Matches any values that are less than the given value.
    """
    lt: Float

    """
    Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.
    """
    lte: Float

    """
    Greater-than constraint. Matches any values that are greater than the given value.
    """
    gt: Float

    """
    Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.
    """
    gte: Float
  }
`;
