Feature: Login de usuário

    Scenario: Login com usuário ativo
        Given que o usuário acessa a tela de login
        When realiza login com usuário ativo
        Then o login deve ser realizado com sucesso

    Scenario Outline: Login inválido - <descricao>
        Given que o usuário acessa a tela de login
        When realiza login com usuário "<usuario>" e senha "<senha>"
        Then deve exibir mensagem de erro de login

        Examples:
            | descricao        | usuario         | senha          |
            | Usuário inválido | usuario_inativo | senha_invalida |
            | Senha inválida   | admin           | senha_invalida |


    Scenario: Sistema deve bloquear conta após 3 tentativas inválidas
        Given que o usuário acessa a tela de login
        When realiza login com usuário "admin" e senha "senha_invalida"
        And realiza login com usuário "admin" e senha "senha_invalida"
        And realiza login com usuário "admin" e senha "senha_invalida"
        Then o sistema deve bloquear a conta por 15 minutos
