// 🧹 Fix for ENOSPC / temp overflow in hosted panels
const fs = require('fs');
const path = require('path');

// Redirect temp storage away from system /tmp
const customTemp = path.join(process.cwd(), 'temp');
if (!fs.existsSync(customTemp)) fs.mkdirSync(customTemp, { recursive: true });
process.env.TMPDIR = customTemp;
process.env.TEMP = customTemp;
process.env.TMP = customTemp;

// Auto-cleaner every 3 hours
setInterval(() => {
  fs.readdir(customTemp, (err, files) => {
    if (err) return;
    for (const file of files) {
      const filePath = path.join(customTemp, file);
      fs.stat(filePath, (err, stats) => {
        if (!err && Date.now() - stats.mtimeMs > 3 * 60 * 60 * 1000) {
          fs.unlink(filePath, () => {});
        }
      });
    }
  });
  console.log('🧹 Temp folder auto-cleaned');
}, 3 * 60 * 60 * 1000);

const settings = require('./settings');
require('./config.js');
const { isBanned } = require('./lib/isBanned');
const yts = require('yt-search');
const { fetchBuffer } = require('./lib/myfunc');
const fetch = require('node-fetch');
const ytdl = require('ytdl-core');
const axios = require('axios');
const ffmpeg = require('fluent-ffmpeg');
const { isSudo } = require('./lib/index');
const isOwnerOrSudo = require('./lib/isOwner');
const { autotypingCommand, isAutotypingEnabled, handleAutotypingForMessage, handleAutotypingForCommand, showTypingAfterCommand } = require('./commands/autotyping');
const { autoreadCommand, isAutoreadEnabled, handleAutoread } = require('./commands/autoread');

// Command imports
const tagAllCommand = require('./commands/tagall');
const helpCommand = require('./commands/help');
const banCommand = require('./commands/ban');
const { promoteCommand } = require('./commands/promote');
const { demoteCommand } = require('./commands/demote');
const muteCommand = require('./commands/mute');
const unmuteCommand = require('./commands/unmute');
const stickerCommand = require('./commands/sticker');
const isAdmin = require('./lib/isAdmin');
const warnCommand = require('./commands/warn');
const warningsCommand = require('./commands/warnings');
const ttsCommand = require('./commands/tts');
const { tictactoeCommand, handleTicTacToeMove } = require('./commands/tictactoe');
const { incrementMessageCount, topMembers } = require('./commands/topmembers');
const ownerCommand = require('./commands/owner');
const deleteCommand = require('./commands/delete');
const { handleAntilinkCommand, handleLinkDetection } = require('./commands/antilink');
const { handleAntitagCommand, handleTagDetection } = require('./commands/antitag');
const { Antilink } = require('./lib/antilink');
const { handleMentionDetection, mentionToggleCommand, setMentionCommand } = require('./commands/mention');
const memeCommand = require('./commands/meme');
const tagCommand = require('./commands/tag');
const tagNotAdminCommand = require('./commands/tagnotadmin');
const hideTagCommand = require('./commands/hidetag');
const jokeCommand = require('./commands/joke');
const quoteCommand = require('./commands/quote');
const factCommand = require('./commands/fact');
const weatherCommand = require('./commands/weather');
const newsCommand = require('./commands/news');
const kickCommand = require('./commands/kick');
const simageCommand = require('./commands/simage');
const attpCommand = require('./commands/attp');
const { startHangman, guessLetter } = require('./commands/hangman');
const { startTrivia, answerTrivia } = require('./commands/trivia');
const { complimentCommand } = require('./commands/compliment');
const { insultCommand } = require('./commands/insult');
const { eightBallCommand } = require('./commands/eightball');
const { lyricsCommand } = require('./commands/lyrics');
const { dareCommand } = require('./commands/dare');
const { truthCommand } = require('./commands/truth');
const { clearCommand } = require('./commands/clear');
const pingCommand = require('./commands/ping');
const aliveCommand = require('./commands/alive');
const blurCommand = require('./commands/img-blur');
const { welcomeCommand, handleJoinEvent } = require('./commands/welcome');
const { goodbyeCommand, handleLeaveEvent } = require('./commands/goodbye');
const githubCommand = require('./commands/github');
const { handleAntiBadwordCommand, handleBadwordDetection } = require('./lib/antibadword');
const antibadwordCommand = require('./commands/antibadword');
const { handleChatbotCommand, handleChatbotResponse } = require('./commands/chatbot');
const takeCommand = require('./commands/take');
const { flirtCommand } = require('./commands/flirt');
const characterCommand = require('./commands/character');
const wastedCommand = require('./commands/wasted');
const shipCommand = require('./commands/ship');
const groupInfoCommand = require('./commands/groupinfo');
const resetlinkCommand = require('./commands/resetlink');
const staffCommand = require('./commands/staff');
const unbanCommand = require('./commands/unban');
const emojimixCommand = require('./commands/emojimix');
const { handlePromotionEvent } = require('./commands/promote');
const { handleDemotionEvent } = require('./commands/demote');
const viewOnceCommand = require('./commands/viewonce');
const clearSessionCommand = require('./commands/clearsession');
const { autoStatusCommand, handleStatusUpdate } = require('./commands/autostatus');
const { simpCommand } = require('./commands/simp');
const { stupidCommand } = require('./commands/stupid');
const stickerTelegramCommand = require('./commands/stickertelegram');
const textmakerCommand = require('./commands/textmaker');
const { handleAntideleteCommand, handleMessageRevocation, storeMessage } = require('./commands/antidelete');
const clearTmpCommand = require('./commands/cleartmp');
const setProfilePicture = require('./commands/setpp');
const { setGroupDescription, setGroupName, setGroupPhoto } = require('./commands/groupmanage');
const instagramCommand = require('./commands/instagram');
const facebookCommand = require('./commands/facebook');
const spotifyCommand = require('./commands/spotify');
const playCommand = require('./commands/play');
const tiktokCommand = require('./commands/tiktok');
const songCommand = require('./commands/song');
const aiCommand = require('./commands/ai');
const urlCommand = require('./commands/url');
const { handleTranslateCommand } = require('./commands/translate');
const { handleSsCommand } = require('./commands/ss');
const { addCommandReaction, handleAreactCommand } = require('./lib/reactions');
const { goodnightCommand } = require('./commands/goodnight');
const { shayariCommand } = require('./commands/shayari');
const { rosedayCommand } = require('./commands/roseday');
const imagineCommand = require('./commands/imagine');
const videoCommand = require('./commands/video');
const sudoCommand = require('./commands/sudo');
const { miscCommand, handleHeart } = require('./commands/misc');
const { animeCommand } = require('./commands/anime');
const { piesCommand, piesAlias } = require('./commands/pies');
const stickercropCommand = require('./commands/stickercrop');
const updateCommand = require('./commands/update');
const removebgCommand = require('./commands/removebg');
const { reminiCommand } = require('./commands/remini');
const { igsCommand } = require('./commands/igs');
const { anticallCommand, readState: readAnticallState } = require('./commands/anticall');
const { pmblockerCommand, readState: readPmBlockerState } = require('./commands/pmblocker');
const settingsCommand = require('./commands/settings');
const soraCommand = require('./commands/sora');

// Global settings
global.packname = settings.packname;
global.author = settings.author;
global.channelLink = "";
global.ytch = "";

const channelInfo = {
    contextInfo: {
        forwardingScore: 1,
        isForwarded: false,
        forwardedNewsletterMessageInfo: {
            newsletterJid: '',
            newsletterName: '',
            serverMessageId: -1
        }
    }
};
async function handleMessages(sock, messageUpdate, printLog) {
    try {
        const { messages, type } = messageUpdate;
        if (type !== 'notify') return;

        const message = messages[0];
        if (!message?.message) return;

        // --- SAFE GUARD: Autoread ---
        try {
            await handleAutoread(sock, message);
        } catch (e) {
            console.error('DEBUG: Autoread Error (Ignored):', e.message);
        }

        // --- SAFE GUARD: Antidelete Storage ---
        try {
            if (message.message) storeMessage(sock, message);
            if (message.message?.protocolMessage?.type === 0) {
                await handleMessageRevocation(sock, message);
                return;
            }
        } catch (e) {}

        const chatId = message.key.remoteJid;
        const senderId = message.key.participant || message.key.remoteJid;
        const isGroup = chatId.endsWith('@g.us');
        
        // --- SAFE GUARD: Owner/Sudo Checks ---
        let senderIsSudo = false;
        let senderIsOwnerOrSudo = false;
        try {
            senderIsSudo = await isSudo(senderId);
            senderIsOwnerOrSudo = await isOwnerOrSudo(senderId, sock, chatId);
        } catch (e) {
            console.error('DEBUG: Owner Check Error (Ignored):', e.message);
            // If check fails, fallback: If message is from me, I am owner.
            if (message.key.fromMe) senderIsOwnerOrSudo = true;
        }

        const userMessage = (
            message.message?.conversation?.trim() ||
            message.message?.extendedTextMessage?.text?.trim() ||
            message.message?.imageMessage?.caption?.trim() ||
            message.message?.videoMessage?.caption?.trim() ||
            message.message?.buttonsResponseMessage?.selectedButtonId?.trim() ||
            ''
        ).toLowerCase().replace(/\.\s+/g, '.').trim();

        const rawText = message.message?.conversation?.trim() ||
            message.message?.extendedTextMessage?.text?.trim() ||
            message.message?.imageMessage?.caption?.trim() ||
            message.message?.videoMessage?.caption?.trim() ||
            '';

        if (userMessage.startsWith('.')) {
            console.log(`📝 Command used in ${isGroup ? 'group' : 'private'}: ${userMessage}`);
        }

        let isPublic = true;
        try {
            const data = JSON.parse(fs.readFileSync('./data/messageCount.json'));
            if (typeof data.isPublic === 'boolean') isPublic = data.isPublic;
        } catch (error) {}

        const isOwnerOrSudoCheck = message.key.fromMe || senderIsOwnerOrSudo;

        // --- SAFE GUARD: Ban Check ---
        try {
            if (isBanned(senderId) && !userMessage.startsWith('.unban')) {
                if (Math.random() < 0.1) {
                    await sock.sendMessage(chatId, { text: '❌ You are banned from using the bot.' });
                }
                return;
            }
        } catch (e) {}

        if (/^[1-9]$/.test(userMessage) || userMessage.toLowerCase() === 'surrender') {
            await handleTicTacToeMove(sock, chatId, senderId, userMessage);
            return;
        }

        if (!message.key.fromMe) incrementMessageCount(chatId, senderId);

        if (isGroup) {
            if (userMessage) await handleBadwordDetection(sock, chatId, message, userMessage, senderId);
            await Antilink(message, sock);
        }

        if (!isGroup && !message.key.fromMe && !senderIsSudo) {
            try {
                const pmState = readPmBlockerState();
                if (pmState.enabled) {
                    await sock.sendMessage(chatId, { text: pmState.message || 'Private messages are blocked.' });
                    try { await sock.updateBlockStatus(chatId, 'block'); } catch (e) { }
                    return;
                }
            } catch (e) { }
        }

        if (!userMessage.startsWith('.')) {
            await handleAutotypingForMessage(sock, chatId, userMessage);
            if (isGroup) {
                await handleTagDetection(sock, chatId, message, senderId);
                await handleMentionDetection(sock, chatId, message);
                if (isPublic || isOwnerOrSudoCheck) {
                    await handleChatbotResponse(sock, chatId, message, userMessage, senderId);
                }
            }
            return;
        }

        // --- CRITICAL FIX: Allow owner to use commands even in private mode ---
        if (!isPublic && !isOwnerOrSudoCheck) {
            return;
        }

        const adminCommands = ['.mute', '.unmute', '.ban', '.unban', '.promote', '.demote', '.kick', '.tagall', '.tagnotadmin', '.hidetag', '.antilink', '.antitag', '.setgdesc', '.setgname', '.setgpp'];
        const isAdminCommand = adminCommands.some(cmd => userMessage.startsWith(cmd));
        const ownerCommands = ['.mode', '.autostatus', '.antidelete', '.cleartmp', '.setpp', '.clearsession', '.areact', '.autoreact', '.autotyping', '.autoread', '.pmblocker'];
        const isOwnerCommand = ownerCommands.some(cmd => userMessage.startsWith(cmd));

        let isSenderAdmin = false;
        let isBotAdmin = false;

        if (isGroup && isAdminCommand) {
            const adminStatus = await isAdmin(sock, chatId, senderId);
            isSenderAdmin = adminStatus.isSenderAdmin;
            isBotAdmin = adminStatus.isBotAdmin;

            if (!isBotAdmin) {
                await sock.sendMessage(chatId, { text: 'Please make the bot an admin to use admin commands.', ...channelInfo }, { quoted: message });
                return;
            }
            if (['.mute', '.unmute', '.ban', '.unban', '.promote', '.demote'].some(c => userMessage.startsWith(c))) {
                if (!isSenderAdmin && !message.key.fromMe) {
                    await sock.sendMessage(chatId, { text: 'Sorry, only group admins can use this command.', ...channelInfo }, { quoted: message });
                    return;
                }
            }
        }

        if (isOwnerCommand) {
            if (!message.key.fromMe && !senderIsOwnerOrSudo) {
                await sock.sendMessage(chatId, { text: '❌ This command is only available for the owner or sudo!' }, { quoted: message });
                return;
            }
        }

        let commandExecuted = false;
          switch (true) {
            case userMessage === '.simage':
                const quotedMessage = message.message?.extendedTextMessage?.contextInfo?.quotedMessage;
                if (quotedMessage?.stickerMessage) {
                    await simageCommand(sock, quotedMessage, chatId);
                } else {
                    await sock.sendMessage(chatId, { text: 'Please reply to a sticker with the .simage command.', ...channelInfo }, { quoted: message });
                }
                commandExecuted = true;
                break;
            case userMessage.startsWith('.kick'):
                const mentionedJidListKick = message.message.extendedTextMessage?.contextInfo?.mentionedJid || [];
                await kickCommand(sock, chatId, senderId, mentionedJidListKick, message);
                break;
            case userMessage.startsWith('.mute'):
                const muteParts = userMessage.trim().split(/\s+/);
                const muteDuration = muteParts[1] !== undefined ? parseInt(muteParts[1], 10) : undefined;
                await muteCommand(sock, chatId, senderId, message, muteDuration);
                break;
            case userMessage === '.unmute':
                await unmuteCommand(sock, chatId, senderId);
                break;
            case userMessage.startsWith('.ban'):
                await banCommand(sock, chatId, message);
                break;
            case userMessage.startsWith('.unban'):
                await unbanCommand(sock, chatId, message);
                break;
            case userMessage === '.help' || userMessage === '.menu' || userMessage === '.bot' || userMessage === '.list':
                await helpCommand(sock, chatId, message, global.channelLink);
                commandExecuted = true;
                break;
            case userMessage === '.sticker' || userMessage === '.s':
                await stickerCommand(sock, chatId, message);
                commandExecuted = true;
                break;
            case userMessage.startsWith('.warnings'):
                await warningsCommand(sock, chatId, message.message.extendedTextMessage?.contextInfo?.mentionedJid || []);
                break;
            case userMessage.startsWith('.warn'):
                await warnCommand(sock, chatId, senderId, message.message.extendedTextMessage?.contextInfo?.mentionedJid || [], message);
                break;
            case userMessage.startsWith('.tts'):
                await ttsCommand(sock, chatId, userMessage.slice(4).trim(), message);
                break;
            case userMessage.startsWith('.delete') || userMessage.startsWith('.del'):
                await deleteCommand(sock, chatId, message, senderId);
                break;
            case userMessage.startsWith('.attp'):
                await attpCommand(sock, chatId, message);
                break;
            case userMessage === '.settings':
                await settingsCommand(sock, chatId, message);
                break;
            case userMessage.startsWith('.mode'):
                if (!isOwnerOrSudoCheck) {
                    await sock.sendMessage(chatId, { text: 'Only bot owner can use this command!' }, { quoted: message });
                    return;
                }
                const action = userMessage.split(' ')[1]?.toLowerCase();
                if (!action) {
                    const d = JSON.parse(fs.readFileSync('./data/messageCount.json'));
                    await sock.sendMessage(chatId, { text: `Current mode: *${d.isPublic ? 'public' : 'private'}*` });
                } else if (action === 'public' || action === 'private') {
                    const d = JSON.parse(fs.readFileSync('./data/messageCount.json'));
                    d.isPublic = action === 'public';
                    fs.writeFileSync('./data/messageCount.json', JSON.stringify(d, null, 2));
                    await sock.sendMessage(chatId, { text: `Bot is now in *${action}* mode` });
                }
                break;
            case userMessage.startsWith('.anticall'):
                if (isOwnerOrSudoCheck) await anticallCommand(sock, chatId, message, userMessage.split(' ').slice(1).join(' '));
                break;
            case userMessage.startsWith('.pmblocker'):
                await pmblockerCommand(sock, chatId, message, userMessage.split(' ').slice(1).join(' '));
                commandExecuted = true;
                break;
            case userMessage === '.owner':
                await ownerCommand(sock, chatId);
                break;
            case userMessage === '.tagall':
                await tagAllCommand(sock, chatId, senderId, message);
                break;
            case userMessage === '.tagnotadmin':
                await tagNotAdminCommand(sock, chatId, senderId, message);
                break;
            case userMessage.startsWith('.hidetag'):
                await hideTagCommand(sock, chatId, senderId, rawText.slice(8).trim(), message.message?.extendedTextMessage?.contextInfo?.quotedMessage || null, message);
                break;
            case userMessage.startsWith('.tag'):
                await tagCommand(sock, chatId, senderId, rawText.slice(4).trim(), message.message?.extendedTextMessage?.contextInfo?.quotedMessage || null, message);
                break;
            case userMessage.startsWith('.antilink'):
                if (isGroup && isBotAdmin) await handleAntilinkCommand(sock, chatId, userMessage, senderId, isSenderAdmin, message);
                break;
            case userMessage.startsWith('.antitag'):
                if (isGroup && isBotAdmin) await handleAntitagCommand(sock, chatId, userMessage, senderId, isSenderAdmin, message);
                break;
            case userMessage === '.meme': await memeCommand(sock, chatId, message); break;
            case userMessage === '.joke': await jokeCommand(sock, chatId, message); break;
            case userMessage === '.quote': await quoteCommand(sock, chatId, message); break;
            case userMessage === '.fact': await factCommand(sock, chatId, message, message); break;
            case userMessage.startsWith('.weather'):
                const city = userMessage.slice(9).trim();
                if(city) await weatherCommand(sock, chatId, message, city);
                break;
            case userMessage === '.news': await newsCommand(sock, chatId); break;
            case userMessage.startsWith('.ttt') || userMessage.startsWith('.tictactoe'):
                await tictactoeCommand(sock, chatId, senderId, userMessage.split(' ').slice(1).join(' '));
                break;
            case userMessage === '.topmembers': topMembers(sock, chatId, isGroup); break;
            case userMessage.startsWith('.hangman'): startHangman(sock, chatId); break;
            case userMessage.startsWith('.guess'):
                if(userMessage.split(' ')[1]) guessLetter(sock, chatId, userMessage.split(' ')[1]);
                break;
            case userMessage.startsWith('.trivia'): startTrivia(sock, chatId); break;
            case userMessage.startsWith('.answer'):
                if(userMessage.split(' ')[1]) answerTrivia(sock, chatId, userMessage.split(' ').slice(1).join(' '));
                break;
            case userMessage.startsWith('.compliment'): await complimentCommand(sock, chatId, message); break;
            case userMessage.startsWith('.insult'): await insultCommand(sock, chatId, message); break;
            case userMessage.startsWith('.8ball'): await eightBallCommand(sock, chatId, userMessage.split(' ').slice(1).join(' ')); break;
            case userMessage.startsWith('.lyrics'): await lyricsCommand(sock, chatId, userMessage.split(' ').slice(1).join(' '), message); break;
                      case userMessage.startsWith('.simp'):
                await simpCommand(sock, chatId, message.message?.extendedTextMessage?.contextInfo?.quotedMessage, message.message?.extendedTextMessage?.contextInfo?.mentionedJid || [], senderId);
                break;
            case userMessage.startsWith('.stupid') || userMessage.startsWith('.iss'):
                await stupidCommand(sock, chatId, message.message?.extendedTextMessage?.contextInfo?.quotedMessage, message.message?.extendedTextMessage?.contextInfo?.mentionedJid || [], senderId, userMessage.split(' ').slice(1));
                break;
            case userMessage === '.dare': await dareCommand(sock, chatId, message); break;
            case userMessage === '.truth': await truthCommand(sock, chatId, message); break;
            case userMessage === '.clear': if(isGroup) await clearCommand(sock, chatId); break;
            case userMessage.startsWith('.promote'): await promoteCommand(sock, chatId, message.message.extendedTextMessage?.contextInfo?.mentionedJid || [], message); break;
            case userMessage.startsWith('.demote'): await demoteCommand(sock, chatId, message.message.extendedTextMessage?.contextInfo?.mentionedJid || [], message); break;
            case userMessage === '.ping': await pingCommand(sock, chatId, message); break;
            case userMessage === '.alive': await aliveCommand(sock, chatId, message); break;
            case userMessage.startsWith('.mention '): await mentionToggleCommand(sock, chatId, message, userMessage.split(' ').slice(1).join(' '), isOwnerOrSudoCheck); break;
            case userMessage === '.setmention': await setMentionCommand(sock, chatId, message, isOwnerOrSudoCheck); break;
            case userMessage.startsWith('.blur'): await blurCommand(sock, chatId, message, message.message?.extendedTextMessage?.contextInfo?.quotedMessage); break;
            case userMessage.startsWith('.welcome'): if(isGroup && (isSenderAdmin || message.key.fromMe)) await welcomeCommand(sock, chatId, message); break;
            case userMessage.startsWith('.goodbye'): if(isGroup && (isSenderAdmin || message.key.fromMe)) await goodbyeCommand(sock, chatId, message); break;
            case userMessage === '.git' || userMessage === '.repo': await githubCommand(sock, chatId, message); break;
            case userMessage.startsWith('.antibadword'): if(isGroup && isBotAdmin) await antibadwordCommand(sock, chatId, message, senderId, isSenderAdmin); break;
            case userMessage.startsWith('.chatbot'): if(isGroup) await handleChatbotCommand(sock, chatId, message, userMessage.slice(8).trim()); break;
            case userMessage.startsWith('.take') || userMessage.startsWith('.steal'): await takeCommand(sock, chatId, message, rawText.split(' ').slice(1)); break;
            case userMessage === '.flirt': await flirtCommand(sock, chatId, message); break;
            case userMessage.startsWith('.character'): await characterCommand(sock, chatId, message); break;
            case userMessage.startsWith('.waste'): await wastedCommand(sock, chatId, message); break;
            case userMessage === '.ship': if(isGroup) await shipCommand(sock, chatId, message); break;
            case userMessage === '.groupinfo': if(isGroup) await groupInfoCommand(sock, chatId, message); break;
            case userMessage === '.resetlink': if(isGroup) await resetlinkCommand(sock, chatId, senderId); break;
            case userMessage === '.staff': if(isGroup) await staffCommand(sock, chatId, message); break;
            case userMessage.startsWith('.url'): await urlCommand(sock, chatId, message); break;
            case userMessage.startsWith('.emojimix'): await emojimixCommand(sock, chatId, message); break;
            case userMessage.startsWith('.tg'): await stickerTelegramCommand(sock, chatId, message); break;
            case userMessage === '.vv': await viewOnceCommand(sock, chatId, message); break;
            case userMessage === '.clearsession': await clearSessionCommand(sock, chatId, message); break;
            case userMessage.startsWith('.autostatus'): await autoStatusCommand(sock, chatId, message, userMessage.split(' ').slice(1)); break;
            case userMessage.startsWith('.text'): await textmakerCommand(sock, chatId, message, userMessage, 'metallic'); break; // Catch-all for textmakers
            case userMessage.startsWith('.antidelete'): await handleAntideleteCommand(sock, chatId, message, userMessage.slice(11).trim()); break;
            case userMessage === '.surrender': await handleTicTacToeMove(sock, chatId, senderId, 'surrender'); break;
            case userMessage === '.cleartmp': await clearTmpCommand(sock, chatId, message); break;
            case userMessage === '.setpp': await setProfilePicture(sock, chatId, message); break;
            case userMessage.startsWith('.setgdesc'): await setGroupDescription(sock, chatId, senderId, rawText.slice(9).trim(), message); break;
            case userMessage.startsWith('.setgname'): await setGroupName(sock, chatId, senderId, rawText.slice(9).trim(), message); break;
            case userMessage.startsWith('.setgpp'): await setGroupPhoto(sock, chatId, senderId, message); break;
            case userMessage.startsWith('.insta'): await instagramCommand(sock, chatId, message); break;
            case userMessage.startsWith('.fb'): await facebookCommand(sock, chatId, message); break;
            case userMessage.startsWith('.play'): await songCommand(sock, chatId, message); break;
            case userMessage.startsWith('.video'): await videoCommand(sock, chatId, message); break;
            case userMessage.startsWith('.tiktok'): await tiktokCommand(sock, chatId, message); break;
            case userMessage.startsWith('.ai'): await aiCommand(sock, chatId, message); break;
            case userMessage.startsWith('.translate'): await handleTranslateCommand(sock, chatId, message, userMessage.slice(10)); break;
            case userMessage.startsWith('.ss'): await handleSsCommand(sock, chatId, message, userMessage.split(' ').slice(1).join(' ')); break;
            case userMessage.startsWith('.areact'): await handleAreactCommand(sock, chatId, message, isOwnerOrSudoCheck); break;
            case userMessage.startsWith('.sudo'): await sudoCommand(sock, chatId, message); break;
            case userMessage === '.goodnight': await goodnightCommand(sock, chatId, message); break;
            case userMessage === '.shayari': await shayariCommand(sock, chatId, message); break;
            case userMessage.startsWith('.imagine'): await imagineCommand(sock, chatId, message); break;
            case userMessage === '.jid': await sock.sendMessage(chatId, { text: `JID: ${chatId}` }, { quoted: message }); break;
            case userMessage.startsWith('.autotyping'): await autotypingCommand(sock, chatId, message); commandExecuted = true; break;
            case userMessage.startsWith('.autoread'): await autoreadCommand(sock, chatId, message); commandExecuted = true; break;
            case userMessage.startsWith('.sora'): await soraCommand(sock, chatId, message); break;
            case userMessage.startsWith('.update'): await updateCommand(sock, chatId, message, rawText.split(' ')[1]); break;
            default:
                if (isGroup) {
                    await handleTagDetection(sock, chatId, message, senderId);
                    await handleMentionDetection(sock, chatId, message);
                }
                commandExecuted = false;
                break;
        }

        if (commandExecuted) {
            await showTypingAfterCommand(sock, chatId);
            await addCommandReaction(sock, message);
        }
    } catch (error) {
        console.error('❌ Error in message handler:', error.message);
        if (printLog) console.log('Message content that failed:', messageUpdate.messages[0]?.message);
    }
}

async function handleGroupParticipantUpdate(sock, update) {
    try {
        const { id, participants, action, author } = update;
        if (!id.endsWith('@g.us')) return;

        let isPublic = true;
        try {
            const modeData = JSON.parse(fs.readFileSync('./data/messageCount.json'));
            if (typeof modeData.isPublic === 'boolean') isPublic = modeData.isPublic;
        } catch (e) {}

        if (action === 'promote' && isPublic) await handlePromotionEvent(sock, id, participants, author);
        if (action === 'demote' && isPublic) await handleDemotionEvent(sock, id, participants, author);
        if (action === 'add') await handleJoinEvent(sock, id, participants);
        if (action === 'remove') await handleLeaveEvent(sock, id, participants);
    } catch (error) {
        console.error('Error in handleGroupParticipantUpdate:', error);
    }
}

module.exports = {
    handleMessages,
    handleGroupParticipantUpdate,
    handleStatus: async (sock, status) => {
        await handleStatusUpdate(sock, status);
    }
};
              
