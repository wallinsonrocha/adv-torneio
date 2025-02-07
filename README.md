# Descrição

Este projeto utiliza **MirageJS** para simular requisições de API durante o desenvolvimento. Algumas rotas são dependentes de autenticação e, para melhor experiência, o usuário deve estar logado. No entanto, é importante observar que o **MirageJS** não funciona em ambiente de produção, portanto, essas funcionalidades estão disponíveis apenas no modo de desenvolvimento.

## Informações Importantes

- As rotas relacionadas à autenticação exigem que o usuário esteja logado para serem acessadas corretamente.
- Durante o desenvolvimento, o MirageJS simula o backend, mas, em produção, você precisará configurar uma API real.

## Processo de Instalação

1. **Clonar o repositório**:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
   ```

2. **Instalar dependências**:
   ```bash
   npm install
   ```

3. **Iniciar o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```

## Login dos Usuários

- **User: Usuário comum**
  ```
   email: user@email.com
   senha: @Senha123
  ```

- **Capitão: Capitão do time**
  ```
   email: captain@email.com
   senha: @Senha123
  ```

- **Admin: Administrador**
  ```
   email: admin@email.com
   senha: @Senha123
  ```

## Links Importantes

### Autenticação

Essas rotas estão relacionadas ao fluxo de autenticação e segurança do usuário:

- **/enter**: Página de login.
- **/verify-email**: Página de verificação de e-mail.
- **/change-password**: Página para alterar a senha.
- **/recover-password**: Página para recuperação de senha.

### Torneios e Times

Estas rotas são utilizadas para a gestão de torneios e times no sistema:

- **/torneios**: Lista todos os torneios.
- **/torneios/:id**: Detalhes de um torneio específico.
- **/times**: Lista todos os times.
- **/times/:id**: Detalhes de um time específico.

### Painel Administrativo

- **/admin**: Acesso ao painel administrativo para gerenciar torneios.

---

## Outras Considerações

- **Testes:** A simulação de dados e rotas no desenvolvimento pode ser útil para testes rápidos, mas é importante validar as funcionalidades.