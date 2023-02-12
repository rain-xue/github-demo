// import { Feature, PermissionLevel } from '@prisma/client';
// import { Section } from '../generated/graphql-types';
// export type PermissionsMap = { [key in Feature]: PermissionLevel };
// export const DefaultPermissions: PermissionsMap = {
//   inbox: PermissionLevel.read,
//   requests: PermissionLevel.read,
//   tasks: PermissionLevel.read,
//   templates: PermissionLevel.read,
//   alerts: PermissionLevel.read,
//   documents: PermissionLevel.read,
//   surveys: PermissionLevel.read,
//   information_items: PermissionLevel.read,
//   information_contacts: PermissionLevel.read,
//   app_section: PermissionLevel.read,
//   logs: PermissionLevel.read,
//   sites: PermissionLevel.read,
//   lots: PermissionLevel.read,
//   users: PermissionLevel.read,
//   groups: PermissionLevel.read,
//   bookings: PermissionLevel.read,
//   deliveries: PermissionLevel.read,
//   event_log: PermissionLevel.read,
//   events: PermissionLevel.read,
//   clubs: PermissionLevel.read,
//   community_wall: PermissionLevel.read,
//   committee_hub: PermissionLevel.read,
//   your_local: PermissionLevel.read,
//   request_reports: PermissionLevel.read,
//   correspondence_reports: PermissionLevel.read,
//   engagement_reports: PermissionLevel.read,
// };
// const serviceHubFeatures: Feature[] = [
//   Feature.inbox,
//   Feature.requests,
//   Feature.tasks,
//   Feature.templates,
// ];
// const outboundFeatures: Feature[] = [
//   Feature.alerts,
//   Feature.documents,
//   Feature.surveys,
//   Feature.information_items,
//   Feature.information_contacts,
//   Feature.app_section,
//   Feature.logs,
// ];
// const manageFeatures: Feature[] = [
//   Feature.sites,
//   Feature.lots,
//   Feature.users,
//   Feature.groups,
//   Feature.bookings,
//   Feature.deliveries,
//   Feature.event_log,
// ];
// const engageFeatures: Feature[] = [
//   Feature.events,
//   Feature.clubs,
//   Feature.community_wall,
//   Feature.committee_hub,
//   Feature.your_local,
// ];
// const reportsFeatures: Feature[] = [
//   Feature.request_reports,
//   Feature.correspondence_reports,
//   Feature.engagement_reports,
// ];
// const conciergeFeatures: Feature[] = [
//   Feature.bookings,
//   Feature.deliveries,
//   Feature.event_log,
// ];
// const residentHubFeatures: Feature[] = [
//   Feature.events,
//   Feature.clubs,
//   Feature.community_wall,
// ];
// const informationFeatures: Feature[] = [
//   Feature.information_items,
//   Feature.information_contacts,
// ];
// export function getPermissionsListFromMap(permissionsMap: PermissionsMap) {
//   return Object.keys(permissionsMap).map((key) => ({
//     feature: key as Feature,
//     level: permissionsMap[key] as PermissionLevel,
//   }));
// }
// export function getPermissionsMapFromList(
//   permissionsList: {
//     feature: Feature;
//     level: PermissionLevel;
//   }[]
// ): PermissionsMap {
//   return permissionsList?.reduce((prev, curr) => {
//     prev[curr.feature] = curr.level;
//     return prev;
//   }, DefaultPermissions);
// }
// export function getInactiveSections(permissionsMap: PermissionsMap) {
//   const activeFeatures = getPermissionsListFromMap(permissionsMap)
//     .filter((permission) => permission.level !== PermissionLevel.none)
//     .map((permission) => permission.feature);
//   const inactiveSections: Section[] = [];
//   if (!activeFeatures.some((feature) => serviceHubFeatures.includes(feature))) {
//     inactiveSections.push(Section.ServiceHub);
//   }
//   if (!activeFeatures.some((feature) => outboundFeatures.includes(feature))) {
//     inactiveSections.push(Section.Outbound);
//   }
//   if (!activeFeatures.some((feature) => manageFeatures.includes(feature))) {
//     inactiveSections.push(Section.Manage);
//   }
//   if (!activeFeatures.some((feature) => engageFeatures.includes(feature))) {
//     inactiveSections.push(Section.Engage);
//   }
//   if (!activeFeatures.some((feature) => reportsFeatures.includes(feature))) {
//     inactiveSections.push(Section.Reports);
//   }
//   if (!activeFeatures.some((feature) => conciergeFeatures.includes(feature))) {
//     inactiveSections.push(Section.Concierge);
//   }
//   if (
//     !activeFeatures.some((feature) => residentHubFeatures.includes(feature))
//   ) {
//     inactiveSections.push(Section.ResidentHub);
//   }
//   if (
//     !activeFeatures.some((feature) => informationFeatures.includes(feature))
//   ) {
//     inactiveSections.push(Section.Information);
//   }
//   return inactiveSections;
// }
//# sourceMappingURL=permissions-helpers.js.map