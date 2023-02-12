// import { expect } from 'chai'
// import { sequelize, dataTypes, checkModelName, checkUniqueIndex, checkPropertyExists } from 'sequelize-test-helpers'
// import { User, Account, AuthUser } from './init-models'
// const SequelizeMock = require('sequelize-mock');

// describe('src/models/User', () => {
//   it("model name should be User", () => {
//     checkModelName(User)('User')
//   })

//   it("check properties", () => {
//     const properties: string[] = ["firstname", "lastname", "AuthUserId", "AccountId"]

//     properties.forEach(checkPropertyExists(User))
//   })


//   it('defined a belongsTo association with Account', () => {
//     expect(User.belongsTo).to.have.been.calledWith(Account)
//     expect(User.belongsTo).to.have.been.calledWith(AuthUser)
//   })
// })

// describe('scope/hooks....', () => {

// })