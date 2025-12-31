#language: pt

Funcionalidade: Login de usuário

    Contexto: 
        Dado que o usuário acessa a tela de login
        

    Cenário: Login com usuário ativo
        Quando realiza login com usuário Válido
        Então o login deve ser realizado com sucesso


    Esquema do Cenário: Login com <descricao>
        Quando realiza login com usuário "<usuario>" e senha "<senha>"
        Então deve exibir mensagem de erro de login para o usuário "<usuario>"

        Exemplos:
            | descricao        | usuario          | senha          |
            | usuário inválido | usuario_invalido | senha_invalida |
            | senha inválida   | admin            | senha_invalida |


    Cenário: Sistema deve bloquear conta após 3 tentativas inválidas
        Quando realiza 3 tentativas de login com usuário "admin" e senha "senha_invalida"
        E realiza login correto para testar o bloqueio
        Então deve exibir mensagem informando que a conta está bloqueada por 15 minutos

