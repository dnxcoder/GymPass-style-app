# App

GymPass style app.

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possiivel obter o perfil de um usuário logado;
- [x] Deve ser possivel obter o número de check-ins pelo usuário logado;
- [x] Deve ser possivel o usuario obter seu histórico de check-ins;
- [x] Deve ser possível o usuario buscar academias próximas;
- [x] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [x] Deve ser possível validar o check-in de um usuário;
- [x] Deve ser possível cadastrar uma academia;

## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastar com um e-mail dublicado;
- [x] O usuário não pode fazer 2 check-ins no mesmo dia;
- [x] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [x] O check-in só pode ser validado até 20 minutos após criado;
- [ ] O check-in só pode ser validado por adminstradores;
- [ ] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos nāo-funcionais)

- [x] A senha do usuário precisa estar criptograda;
- [x] Os dados da aplicação precisam estar persistidos em um baco PostgreSQL;
- [x] Todas as listas de dados precisam estar paginadas com 20 itens por página.
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);
- [ ]# GymPass-style-app
