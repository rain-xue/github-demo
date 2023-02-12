// import {
//   DateComparator,
//   IdComparator,
//   LotFilter,
//   NumberComparator,
//   AccountFilter,
//   PriorityComparator,
//   RequestFilter,
//   SiteFilter,
//   StringComparator,
//   TemplateFilter,
//   UserFilter,
//   RoleFilter,
//   TaskFilter,
// } from '../generated/graphql-types';
// import { removeEmptyValues } from './object-helpers';

// export function getDateQuery(comparator: DateComparator) {
//   const query = {
//     equals: comparator?.equals,
//     gt: comparator?.gt,
//     gte: comparator?.gte,
//     in: comparator?.in,
//     lt: comparator?.lt,
//     lte: comparator?.lte,
//     not: comparator?.not,
//     notIn: comparator?.notIn,
//   };
//   return removeEmptyValues(query);
// }

// export function getPriorityQuery(comparator: PriorityComparator) {
//   const query = {
//     equals: comparator?.equals,
//     in: comparator?.in,
//     not: comparator?.not,
//     notIn: comparator?.notIn,
//   };
//   return removeEmptyValues(query);
// }

// export function getStringQuery(comparator: StringComparator) {
//   const query = {
//     equals: comparator?.equals,
//     in: comparator?.in,
//     notIn: comparator?.notIn,
//     lt: comparator?.lt,
//     lte: comparator?.lte,
//     gt: comparator?.gt,
//     gte: comparator?.gte,
//     contains: comparator?.contains,
//     startsWith: comparator?.startsWith,
//     endsWith: comparator?.endsWith,
//     mode: comparator?.caseSensitive ? 'default' : 'insensitive',
//     not: comparator?.not,
//   };
//   return removeEmptyValues(query);
// }

// export function getIdQuery(comparator: IdComparator) {
//   const query = {
//     equals: comparator?.equals,
//     in: comparator?.in,
//     notIn: comparator?.notIn,
//     not: comparator?.not,
//   };
//   return removeEmptyValues(query);
// }

// export function getNumberQuery(comparator: NumberComparator) {
//   const query = {
//     equals: comparator?.equals,
//     in: comparator?.in,
//     notIn: comparator?.notIn,
//     not: comparator?.not,
//     lt: comparator?.lt,
//     lte: comparator?.lte,
//     gt: comparator?.gt,
//     gte: comparator?.gte,
//   };
//   return removeEmptyValues(query);
// }

// export function getSiteQuery(filter: SiteFilter) {
//   const idQuery = { id: getIdQuery(filter?.id) };
//   const createdAtQuery = { createdAt: getDateQuery(filter?.createdAt) };
//   const updatedAtQuery = { updatedAt: getDateQuery(filter?.updatedAt) };
//   const nameQuery = { name: getStringQuery(filter?.name) };
//   const addressQuery = { address: getStringQuery(filter?.address) };
//   const schemeQuery = { scheme: getStringQuery(filter?.scheme) };

//   const query = {
//     ...idQuery,
//     ...createdAtQuery,
//     ...updatedAtQuery,
//     ...nameQuery,
//     ...addressQuery,
//     ...schemeQuery,
//   };

//   return query;
// }

// export function getLotQuery(filter: LotFilter) {
//   const idQuery = { id: getIdQuery(filter?.id) };
//   const createdAtQuery = { createdAt: getDateQuery(filter?.createdAt) };
//   const updatedAtQuery = { updatedAt: getDateQuery(filter?.updatedAt) };
//   const numberQuery = { number: getStringQuery(filter?.number) };
//   const floorNumberQuery = { floorNumber: getStringQuery(filter?.floorNumber) };
//   const apartmentNumberQuery = {
//     apartmentNumber: getStringQuery(filter?.apartmentNumber),
//   };

//   const query = {
//     ...idQuery,
//     ...createdAtQuery,
//     ...updatedAtQuery,
//     ...numberQuery,
//     ...floorNumberQuery,
//     ...apartmentNumberQuery,
//   };

//   return query;
// }

// export function getTemplateQuery(filter: TemplateFilter) {
//   const idQuery = { id: getIdQuery(filter?.id) };
//   const createdAtQuery = { createdAt: getDateQuery(filter?.createdAt) };
//   const updatedAtQuery = { updatedAt: getDateQuery(filter?.updatedAt) };
//   const titleQuery = { title: getStringQuery(filter?.title) };
//   const descriptionQuery = { description: getStringQuery(filter?.description) };

//   const query = {
//     ...idQuery,
//     ...createdAtQuery,
//     ...updatedAtQuery,
//     ...titleQuery,
//     ...descriptionQuery,
//   };

//   return query;
// }

// export function getRequestQuery(filter: RequestFilter) {
//   const idQuery = { id: getIdQuery(filter?.id) };
//   const createdAtQuery = { createdAt: getDateQuery(filter?.createdAt) };
//   const updatedAtQuery = { updatedAt: getDateQuery(filter?.updatedAt) };
//   const priorityQuery = { priority: getPriorityQuery(filter?.priority) };
//   const templateQuery = { template: getTemplateQuery(filter?.template) };
//   const lotQuery = { lots: { some: getLotQuery(filter?.lot) } };

//   const query = {
//     ...idQuery,
//     ...createdAtQuery,
//     ...updatedAtQuery,
//     ...priorityQuery,
//     ...templateQuery,
//     ...lotQuery,
//   };

//   return query;
// }

// export function getAccountQuery(filter: AccountFilter) {
//   const idQuery = { id: getIdQuery(filter?.id) };
//   const createdAtQuery = { createdAt: getDateQuery(filter?.createdAt) };
//   const updatedAtQuery = { updatedAt: getDateQuery(filter?.updatedAt) };
//   const nameQuery = { name: getStringQuery(filter?.name) };

//   const query = {
//     ...idQuery,
//     ...createdAtQuery,
//     ...updatedAtQuery,
//     ...nameQuery,
//   };

//   return query;
// }

// export function getUserQuery(filter: UserFilter) {
//   const idQuery = { id: getIdQuery(filter?.id) };
//   const createdAtQuery = { createdAt: getDateQuery(filter?.createdAt) };
//   const updatedAtQuery = { updatedAt: getDateQuery(filter?.updatedAt) };
//   const firstNameQuery = { firstName: getStringQuery(filter?.firstName) };
//   const lastNameQuery = { lastName: getStringQuery(filter?.lastName) };
//   const emailQuery = { email: getStringQuery(filter?.email) };
//   const phoneQuery = { phone: getStringQuery(filter?.phone) };

//   const query = {
//     ...idQuery,
//     ...createdAtQuery,
//     ...updatedAtQuery,
//     ...firstNameQuery,
//     ...lastNameQuery,
//     ...emailQuery,
//     ...phoneQuery,
//   };

//   return query;
// }

// export function getRoleQuery(filter: RoleFilter) {
//   const idQuery = { id: getIdQuery(filter?.id) };
//   const createdAtQuery = { createdAt: getDateQuery(filter?.createdAt) };
//   const updatedAtQuery = { updatedAt: getDateQuery(filter?.updatedAt) };
//   const titleQuery = { title: getStringQuery(filter?.title) };

//   const query = {
//     ...idQuery,
//     ...createdAtQuery,
//     ...updatedAtQuery,
//     ...titleQuery,
//   };

//   return query;
// }

// export function getTaskQuery(filter: TaskFilter) {
//   const idQuery = { id: getIdQuery(filter?.id) };
//   const createdAtQuery = { createdAt: getDateQuery(filter?.createdAt) };
//   const updatedAtQuery = { updatedAt: getDateQuery(filter?.updatedAt) };
//   const titleQuery = { title: getStringQuery(filter?.title) };
//   const descriptionQuery = { description: getStringQuery(filter?.description) };
//   const dueDateQuery = { dueDate: getDateQuery(filter?.dueDate) };
//   const priorityQuery = { priority: getStringQuery(filter?.priority) };
//   const statusQuery = { status: getStringQuery(filter?.status) };
//   const taskFromQuery = { taskFrom: getStringQuery(filter?.taskFrom) };
//   const typeQuery = { type: getStringQuery(filter?.type) };

//   const query = {
//     ...idQuery,
//     ...createdAtQuery,
//     ...updatedAtQuery,
//     ...titleQuery,
//     ...descriptionQuery,
//     ...dueDateQuery,
//     ...priorityQuery,
//     ...statusQuery,
//     ...taskFromQuery,
//     ...typeQuery,
//   };

//   return query;
// }
