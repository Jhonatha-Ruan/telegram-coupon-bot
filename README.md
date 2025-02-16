# Telegram Coupon Bot

Este projeto é um bot desenvolvido em Node.js usando a API do Telegram para monitorar um grupo específico no Telegram e copiar automaticamente códigos de cupons para a área de transferência. Ele usa **TelegramClient** para se conectar ao Telegram, **copy-paste** para copiar os cupons, e **node-notifier** para enviar notificações do sistema.

### Funcionalidades

- Monitoramento de novas mensagens em um canal ou grupo do Telegram.
- Extração automática de códigos de cupons de mensagens.
- Cópia do código do cupom para a área de transferência.
- Notificação do sistema quando um cupom é copiado.

---

## Pré-requisitos

- Node.js (versão 14 ou superior).
- Conta de desenvolvedor no Telegram para criar uma **API_ID** e **API_HASH**.

### Como obter **API_ID** e **API_HASH**:
1. Acesse [Telegram API](https://my.telegram.org/auth).
2. Faça login com seu número de telefone.
3. Vá para "API development tools" e crie um aplicativo.
4. Obtenha o **API_ID** e **API_HASH** gerados.

---

## Instalação

### 1. Clone o repositório ou baixe o código-fonte:

```bash
git clone https://github.com/Jhonatha-Ruan/telegram-coupon-bot.git
cd telegram-coupon-bot
```

### 2. Instale as dependências do projeto:

```bash
npm install
```

### 3. Crie um arquivo `.env` na raiz do projeto e adicione suas credenciais da API do Telegram:

```env
API_ID=seu_api_id
API_HASH=seu_api_hash
```

---

## Como Rodar

1. **Inicie o bot**:

   Execute o seguinte comando para rodar o bot:

   ```bash
   node index.js
   ```

   Durante a execução, o bot pedirá que você insira seu número de telefone e o código de verificação enviado pelo Telegram.

2. **Monitoramento de Mensagens**:

   O bot começará a monitorar as mensagens do grupo ou canal especificado (no código, o grupo é `@canaldotelegram`). Ele verificará se há algum cupom na mensagem (com base no padrão de código de 8 ou mais caracteres alfanuméricos).

3. **Cópia do Cupom**:

   Quando um cupom for detectado, ele será automaticamente copiado para a área de transferência, e você será notificado.

---

## Tecnologias Usadas

- **TelegramClient** (API Telegram) - Para conectar e interagir com o Telegram.
- **copy-paste** - Para copiar o código do cupom para a área de transferência.
- **node-notifier** - Para enviar notificações do sistema.

---

## Personalizações

- **Grupo/Canal**: Altere o nome do grupo/canal para o desejado no código, modificando a linha:

  ```js
  const chat = "@canaldotelegram";
  ```

- **Regex**: O código usa um regex para identificar cupons no formato alfanumérico. Se o formato mudar, o regex pode ser ajustado para corresponder a outro padrão.

---

## Logs e Feedback Visual

Durante a execução, o bot exibe logs detalhados no console, incluindo:
- Informações sobre cada mensagem recebida.
- Feedback sobre o cupom copiado.
- Notificação de desktop informando o cupom copiado.

---

## Contribuições

Sinta-se à vontade para fazer contribuições para melhorar o bot. Basta criar um **fork** deste repositório e enviar um **pull request**.

---

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

## Problemas e Sugestões

Se você encontrar algum problema ou tiver sugestões, sinta-se à vontade para abrir um **issue**.