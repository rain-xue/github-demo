import { gql } from "graphql-modules";
import { testServer } from "../../../test/testServer";
import { AuthUser, initModels } from "../../models";
import db from "../../db/db";
import { CustomRequest } from "../../middleware";

let testUser: AuthUser;

beforeAll(() => {
  initModels(db);
});

beforeEach(async () => {
  testUser = await AuthUser.create({
    email: "test@test.com",
    password: "testpassword",
  });
});

afterEach(async () => {
  await testUser.destroy();
});

describe("signin", () => {
  it("should return correct token and uid if email and password are correct", async () => {
    const res = await testServer.executeOperation({
      query: gql`
        mutation signIn($signInInput: SignInInput!) {
          signIn(input: $signInInput) {
            token
            uid
          }
        }
      `,
      variables: {
        signInInput: {
          email: "test@test.com",
          password: "testpassword",
        },
      },
    });

    let result: any = res?.body;
    expect(result?.singleResult?.data?.signIn).toBeTruthy;
    expect(result?.singleResult?.data?.signIn?.token).toBeTruthy;
    expect(result?.singleResult?.data?.signIn?.uid).toBe(
      testUser.id.toString()
    );
  });

  it("should throw error if email incorrect", async () => {
    const res = await testServer.executeOperation({
      query: gql`
        mutation signIn($signInInput: SignInInput!) {
          signIn(input: $signInInput) {
            token
            uid
          }
        }
      `,
      variables: {
        signInInput: {
          email: "wrong@test.com",
          password: "testpassword",
        },
      },
    });

    let result: any = res?.body;
    expect(result?.singleResult?.data).toBeFalsy;
    expect(result?.singleResult?.errors).toBeTruthy;
  });
  it("should throw error if email is correct but password is incorrect", async () => {
    const res = await testServer.executeOperation({
      query: gql`
        mutation signIn($signInInput: SignInInput!) {
          signIn(input: $signInInput) {
            token
            uid
          }
        }
      `,
      variables: {
        signInInput: {
          email: "test@test.com",
          password: "wrong password",
        },
      },
    });

    let result: any = res?.body;
    expect(result?.singleResult?.data).toBeFalsy;
    expect(result?.singleResult?.errors).toBeTruthy;
  });
});

describe("sign out", () => {
  it("should delete user specific tokens if token exists", async () => {
    await testUser.update({ tokens: ["token1", "token2"] });
    testUser = await testUser.reload();
    console.log(testUser.tokens);
    expect(testUser.tokens?.sort()).toEqual(["token1", "token2"].sort());
    const res = await testServer.executeOperation(
      {
        query: gql`
          mutation {
            signOut
          }
        `,
      },
      {
        contextValue: {
          authUser: testUser,
          req: {
            headers: {
              token: "token1",
            },
          } as CustomRequest,
        },
      }
    );

    let result: any = res?.body;
    expect(result?.singleResult?.data?.signOut).toBeTruthy;
    expect(result?.singleResult?.data?.signOut).toBe(true);

    testUser = await testUser.reload();
    expect(testUser.tokens).toEqual(["token2"]);
  });
});
