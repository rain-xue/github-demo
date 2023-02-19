import { Sequelize } from 'sequelize';
import db from '../db/db';
import { AuthUser, initModels } from './init-models';

beforeAll(() => {
  initModels(db);
});

let testUser1: AuthUser;
let testUser2: AuthUser;

beforeEach(async () => {
  testUser1 = await AuthUser.create({
    email: 'test1@test.com',
    password: 'testpassword1',
  });
  testUser2 = await AuthUser.create({
    email: 'test2@test.com',
    password: 'testpassword2',
  });
});

afterEach(async () => {
  await testUser1.destroy();
  await testUser2.destroy();
});

describe('user model fields', () => {
  it('validate email field', async () => {
    let error = null;
    try {
      await testUser1.validate();
    } catch (err) {
      error = err;
    }

    expect(error).toBeFalsy;

    try {
      testUser1.email = '';
      await testUser1.validate();
    } catch (e) {
      error = e;
    }

    expect(error).toBeTruthy;

    error = null;

    await testUser1.reload();

    try {
      testUser1.email = null as unknown as string;
      await testUser1.validate();
    } catch (e) {
      error = e;
    }

    expect(error).toBeTruthy;

    error = null;

    await testUser1.reload();

    try {
      testUser1.email = 'I AM NOT EMAIL';
      await testUser1.validate();
    } catch (e) {
      error = e;
    }

    expect(error).toBeTruthy;
  });
});

describe('authenticate', () => {
  it('should return authUser if token and uid are correct', async () => {
    await testUser1.update({ tokens: ['token1', 'token2'] });
    await testUser2.update({ tokens: ['token2', 'token3'] });
    expect((await AuthUser.authenticate('token2', testUser1.id)).id).toBe(
      testUser1.id
    );
    expect((await AuthUser.authenticate('token3', testUser2.id)).id).toBe(
      testUser2.id
    );
  });

  it('should not return any authUser if token or uid are correct', async () => {
    await testUser1.update({ tokens: ['token1', 'token2'] });
    await testUser2.update({ tokens: ['token2', 'token3'] });
    expect(await AuthUser.authenticate('token2', testUser2.id)).toBeFalsy;
    expect(await AuthUser.authenticate('token3', testUser1.id)).toBeFalsy;
  });
});

describe('authenticateByPassword', () => {
  it('should return authUser if password and email matches', async () => {
    expect(
      (await AuthUser.authenticateByPassword(testUser1.email, 'testpassword1'))
        .id
    ).toBe(testUser1.id);
    expect(
      (await AuthUser.authenticateByPassword(testUser2.email, 'testpassword2'))
        .id
    ).toBe(testUser2.id);
  });

  it("should raise error if password and email don't matches", async () => {
    try {
      await AuthUser.authenticateByPassword(testUser2.email, 'testpassword1');
    } catch (e) {
      expect(e.message).toEqual('Email or password is invalid');
    }

    try {
      await AuthUser.authenticateByPassword(testUser1.email, 'testpassword2');
    } catch (e) {
      expect(e.message).toEqual('Email or password is invalid');
    }
  });
});
