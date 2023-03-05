import Connexion, {login} from './Pages/Connexion'
import {postRegister} from './Pages/Inscription'
import React from 'react';
import {expect, jest, test} from '@jest/globals';
import {render, screen} from "@testing-library/react";
test("Connection", async () => {
  await expect(login("test-user2@supinfo.com", "n3wP4ss!")).resolves.not.toThrowError();
});

/*
test("Inscription", async () => {
  await expect(postRegister("test", "test-user2@supinfo.com", "0nly_F4NS!")).resolves.toThrowError();
});
it('testing connection render', async () => {
  render(<Connexion />);
  const linkElement = screen.getByText(/Valider/i);
  expect(linkElement).toBeDefined();

});*/