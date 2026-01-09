import { expect, driver } from '@wdio/globals'
import homePage from '../pageobjects/home.page';
import cadastrarUsuarioPage from '../pageobjects/cadastrarUsuario.page';
import { faker } from '@faker-js/faker';

describe('Funcionalidade Cadastrar Usuário', () => {

    let nome = faker.person.firstName()
    let sobrenome = faker.person.lastName()
    let telefone = '61987654321'
    let email = nome + sobrenome + "@teste.com.br"
    let senha = '123456'
    let confirmaSenha = senha
    it('Deve cadastrar novo usuário com sucesso', async () => {

        await homePage.openMenu('profile')
        await cadastrarUsuarioPage.cadastrarUsuario(nome, sobrenome, telefone, email, senha, confirmaSenha)

        //Validar se o usuário foi cadastrado
        await homePage.openMenu('profile')
        expect((await profilePage.ProfileName(email)).isDisplayed()).toBeTruthy()
    });
});