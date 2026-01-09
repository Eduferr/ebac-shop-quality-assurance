import { expect, driver } from '@wdio/globals'
import homePage from '../pageobjects/home.page'
import loginPage from '../pageobjects/login.page'
import profilePage from '../pageobjects/profile.page'


describe('Funcionalidade Login', () => {
    it('Deve logar com sucesso', async () => {
        // await é utilizado para manter a sequência de execução
        await homePage.openMenu('profile')// Acessando o campo de login pelo ID do elemento
        await loginPage.login('cliente@ebac.art.br','GD*peToHNJ1#c$sgk08EaYJQ')

        //Validar se foi logado
        await homePage.openMenu('profile')
        expect ((await profilePage.ProfileName('EBAC Cliente')).isDisplayed()).toBeTruthy()

        
    })
})