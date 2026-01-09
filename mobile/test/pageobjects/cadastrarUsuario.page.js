import { $ } from '@wdio/globals'

class CadastroUsuario {

    get novoCadastro() {
        return $('android=new UiSelector().text("Sign up")')
    }
    get nome() {
        return $('id:firstName')
    }
    get sobrenome() {
        return $('id:lastName')
    }
    get telefone() {
        return $('id:phone')
    }
    get email() {
        return $('id:email')
    }
    get senha() {
        return $('id:password')
    }
    get confirmaSenha() {
        return $('id:repassword')
    }

    get btnCadastrar() {
        return $('id:create')
    }

    async cadastrarUsuario(nome, sobrenome, telefone, email, senha, confirmaSenha) {
        await this.novoCadastro.click()
        await this.nome.setValue(nome)
        await this.sobrenome.setValue(sobrenome)
        await this.telefone.setValue(telefone)
        await this.email.setValue(email)
        await this.senha.setValue(senha)
        await this.confirmaSenha.setValue(confirmaSenha)
        await this.btnCadastrar.click()

    }


}

export default new CadastroUsuario();