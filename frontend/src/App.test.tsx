import {login} from './Pages/Connexion'
import {expect, jest, test} from '@jest/globals';

test("Connection", async () => {
  await expect(login("test-user2@supinfo.com", "0nly_F4NS!")).resolves.not.toThrowError();
});


/*test("Inscription", async () => {
  await expect(login("test-user2@supinfo.com", "0nly_F4NS!")).resolves.not.toThrowError();
});*/


