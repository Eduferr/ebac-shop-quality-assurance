Feature: Serviço de Cupons - EBAC SHOP

    Como admin da EBAC-SHOP
    Quero listar os cupons cadastrados
    Para validar o serviço de cupons via API

    Scenario: Listar todos os cupons cadastrados
        Given que o admin está autenticado na API
        When realizar a requisição de listagem de cupons
        Then a API deve retornar a lista de cupons com sucesso


