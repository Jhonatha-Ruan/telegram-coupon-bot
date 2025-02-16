require("dotenv").config();
const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const { NewMessage } = require("telegram/events");
const input = require("input");
const fs = require("fs");
const clipboard = require("copy-paste");
const notifier = require("node-notifier");

const apiId = Number(process.env.API_ID);
const apiHash = process.env.API_HASH;
const sessionFile = "session.json";

const hasSession = fs.existsSync(sessionFile);
const sessionData = fs.existsSync(sessionFile) ? fs.readFileSync(sessionFile, "utf8") : "";
const session = new StringSession(sessionData);

(async () => {
    const client = new TelegramClient(session, apiId, apiHash, { connectionRetries: 5 });

    await client.start({
        phoneNumber: async () => await input.text("Digite seu número de telefone: "),
        password: async () => await input.text("Digite sua senha de verificação em duas etapas (se tiver): "),
        phoneCode: async () => {
            console.log("📩 Aguarde o código do Telegram...");
            await new Promise(resolve => setTimeout(resolve, 3000));
            return await input.text("Digite o código enviado pelo Telegram: ");
        },
        onError: (err) => console.log("❌ Erro ao conectar:", err),
    });

    console.log("✅ Login bem-sucedido!");

    if (!hasSession) {
        fs.writeFileSync(sessionFile, client.session.save());
        console.log("💾 Sessão salva!");
    }

    const chat = "@canaldotelegram";
    console.log(`📡 Monitorando novas mensagens do grupo: ${chat}`);

    client.addEventHandler(async (event) => {
        const message = event.message;
        const senderId = message.fromId?.userId?.value || "Desconhecido";
        const channelId = message.peerId?.channelId?.value || "Desconhecido";
        const text = message.message || "[Mensagem sem texto]";

        const regex = /\b[A-Z0-9]{8,}\b/;
        const match = text.match(regex);

        console.log("\n---------------------------------------");
        console.log(`🔔 Nova mensagem recebida (${new Date().toLocaleString()}):`);
        console.log(`👤 Remetente: ${senderId}`);
        console.log(`📌 Canal/Grupo: ${channelId}`);
        console.log("💬 Mensagem recebida:");
        console.log(`   ${text}`);
        console.log("---------------------------------------");

        if (match) {
            const couponCode = match[0];
            clipboard.copy(couponCode, () => {
                console.log(`🎟 Cupom copiado para a área de transferência: ${couponCode}`);
                console.log("---------------------------------------\n");
            });

            notifier.notify({
                title: 'Cupom Copiado!',
                message: `O cupom ${couponCode} foi copiado para a área de transferência.`,
                sound: true,
                wait: true,
            });
        } else {
            console.log("❌ Nenhum cupom encontrado na mensagem.");
            console.log("---------------------------------------\n");
        }
    }, new NewMessage({ chats: [chat] }));

})();
