#language: pt

Funcionalidade: Login de usuário

    Cenário: Login com usuário ativo
        Dado que o usuário acessa a tela de login
        Quando realiza login com usuário ativo
        Então o login deve ser realizado com sucesso

    Esquema do Cenário: Login inválido - <descricao>
        Dado que o usuário acessa a tela de login
        Quando realiza login com usuário "<usuario>" e senha "<senha>"
        Então deve exibir mensagem de erro de login

        Exemplos:
            | descricao        | usuario         | senha          |
            | Usuário inválido | usuario_inativo | senha_invalida |
            | Senha inválida   | admin           | senha_invalida |

    Cenário: Sistema deve bloquear conta após 3 tentativas inválidas
        Dado que o usuário acessa a tela de login
        Quando realiza login com usuário "admin" e senha "senha_invalida"
        E realiza login com usuário "admin" e senha "senha_invalida"
        E realiza login com usuário "admin" e senha "senha_invalida"
        Então o sistema deve bloquear a conta por 15 minutos
