// import { ApolloError } from 'apollo-server-core';
// import {
//   AccountOrderBy,
//   AccountOrderField,
//   LotOrderBy,
//   LotOrderField,
//   PageInfo,
//   PaginationOrderBy,
//   SiteOrderBy,
//   SiteOrderField,
//   SortOrder,
//   TaskOrderBy,
//   TaskOrderField,
//   UserOrderBy,
//   UserOrderField,
// } from '../generated/graphql-types';
// export function getPaginationData(
//   before: string,
//   after: string,
//   first: number,
//   last: number
// ) {
//   let take = 25;
//   const result = { requested: take, query: {} };
//   if (!!before && !!first) {
//     throw new ApolloError('cannot use before and first together');
//   } else if (!!after && !!last) {
//     throw new ApolloError('cannot use after and last together');
//   } else if (!!first && !!last) {
//     throw new ApolloError('cannot use first and last together');
//   } else if (!!after && !!before) {
//     throw new ApolloError('cannot use after and before together');
//   } else if (!!first && first > 250) {
//     throw new ApolloError('cannot return more than 250 records');
//   } else if (!!last && last > 250) {
//     throw new ApolloError('cannot return more than 250 records');
//   } else if (!!first) {
//     result.requested = first;
//     take = first + 1;
//   } else if (!!last) {
//     result.requested = last;
//     take = -last - 1;
//   } else {
//     take = take + 1;
//   }
//   result.query = { take: take };
//   if (!!after) {
//     result.query['skip'] = 1;
//     result.query['cursor'] = { id: after };
//   } else if (!!before) {
//     result.query['skip'] = 1;
//     result.query['cursor'] = { id: before };
//   }
//   return result;
// }
// export function getConnection(
//   dataCollection: { id: string }[],
//   requestedData: number,
//   before?: boolean
// ) {
//   const totalRecords = dataCollection.length;
//   const hasMoreData = requestedData < totalRecords;
//   if (!!before && hasMoreData) {
//     dataCollection.shift();
//   } else if (hasMoreData) {
//     dataCollection.pop();
//   }
//   const pageInfo: PageInfo = {
//     hasNextPage: hasMoreData,
//     hasPreviousPage: !!before && hasMoreData,
//     startCursor: dataCollection.length ? dataCollection[0].id : null,
//     endCursor: dataCollection.length
//       ? dataCollection[dataCollection.length - 1].id
//       : null,
//   };
//   const connection = {
//     nodes: dataCollection,
//     edges: dataCollection.map((data) => ({
//       node: data,
//       cursor: data.id,
//     })),
//     pageInfo: pageInfo,
//   };
//   return connection;
// }
// export function getArchivedQuery(includeArchived: boolean): {
//   archived: boolean;
// } {
//   const archivedQuery = { archived: undefined };
//   if (!includeArchived) {
//     archivedQuery.archived = false;
//   }
//   return archivedQuery;
// }
// export function getOrderByQuery(orderBy: PaginationOrderBy) {
//   const orderByValue = orderBy || PaginationOrderBy.CreatedAt;
//   return { orderBy: { [orderByValue]: SortOrder.Desc } };
// }
// export function getAccountOrderByQuery(orderBy: AccountOrderBy) {
//   let isCountableField = false;
//   if (
//     orderBy?.field === AccountOrderField.Lots ||
//     orderBy?.field === AccountOrderField.Sites ||
//     orderBy?.field === AccountOrderField.Users
//   ) {
//     isCountableField = true;
//   }
//   const field = orderBy?.field || AccountOrderField.Name;
//   const sortBy = orderBy?.sortOrder || SortOrder.Asc;
//   if (isCountableField) {
//     return { orderBy: { [field]: { _count: sortBy } } };
//   } else {
//     return { orderBy: { [field]: sortBy } };
//   }
// }
// export function getSiteOrderByQuery(orderBy: SiteOrderBy) {
//   const field = orderBy?.field || SiteOrderField.Scheme;
//   const sortBy = orderBy?.sortOrder || SortOrder.Asc;
//   return { orderBy: { [field]: sortBy } };
// }
// export function getUserOrderByQuery(orderBy: UserOrderBy) {
//   const field = orderBy?.field || UserOrderField.FirstName;
//   const sortBy = orderBy?.sortOrder || SortOrder.Asc;
//   return { orderBy: { [field]: sortBy } };
// }
// export function getTaskOrderByQuery(orderBy: TaskOrderBy): { orderBy: any } {
//   if (orderBy?.field === TaskOrderField.AssignedTo) {
//     return {
//       orderBy: {
//         [TaskOrderField.AssignedTo]: {
//           firstName: orderBy?.sortOrder || SortOrder.Asc,
//         },
//       },
//     };
//   }
//   const field = orderBy?.field || TaskOrderField.CreatedAt;
//   const sortBy = orderBy?.sortOrder || SortOrder.Asc;
//   return { orderBy: { [field]: sortBy } };
// }
// export function getLotOrderByQuery(orderBy: LotOrderBy) {
//   const field = orderBy?.field || LotOrderField.Number;
//   const sortBy = orderBy?.sortOrder || SortOrder.Asc;
//   return { orderBy: { [field]: sortBy } };
// }
//# sourceMappingURL=pagination-helpers.js.map