
// Logic of deciding what to reply based on conversation step / message

const User = require('../models/user');
const Conversation = require('../models/conversation');

async function handleUserMessage(userId, message) {
    let convo = await Conversation.getConversationByUser(userId);

    if (!convo) {
        // new conversation
        const convId = await Conversation.createConversation(userId);
        convo = {
            id: convId,
            user_id: userId,
            step: 1,
            last_message: '',
        };
    }

    switch (convo.step) {
        case 1:
            // expecting name
            const name = message.trim();
            await User.updateUser(userId, { name });
            await Conversation.updateConversation(convo.id, { step: 2, last_message: message });
            return `Hi! ${name}\nPlease provide your email id.`;

        case 2:
            // expecting email
            const email = message.trim();
            // Optional: validate email format here
            await User.updateUser(userId, { email });
            await Conversation.updateConversation(convo.id, { step: 3, last_message: message });
            return `Thank you ${(await User.getUserById(userId)).name} for sharing your email id.\nPlease provide your contact number.`;

        case 3:
            // expecting phone number
            const phone = message.trim();
            const digits = phone.replace(/\D/g, '');

            if (digits.length !== 10) {
                return `Seems like an incorrect number, not a problem. Please provide a 10 digit number.`;
            }

            await User.updateUser(userId, { phone: digits });
            await Conversation.updateConversation(convo.id, { step: 5, last_message: message });

            // Return multiple bot messages
            return [
                { from: 'bot', text: `Thank you ${digits} for sharing your contact number.` },
                { from: 'bot', text: `How may I assist you today?` },
                {
                    from: 'bot',
                    text: `a. crushbarriers information\nb. gfrp rebars information\nc. thermoplastic paint information\nd. path recharge information\ne. path logistic information\nf. path india ltd highway information`
                }
            ];

        case 5:
    const opt = message.trim().toLowerCase();
    let reply = '';
    let file = '';

    if (['a', 'crushbarriers'].includes(opt)) {
        reply = `You selected Crush Barriers.`;
        file = 'crushbarriers.pdf';
    } else if (['b', 'gfrp rebars'].includes(opt)) {
        reply = `You selected GFRP Rebars.`;
        file = 'gfrp-rebars.pdf';
    } else if (['c', 'thermoplastic paint'].includes(opt)) {
        reply = `You selected Thermoplastic Paint.`;
        file = 'thermoplastic-paint.pdf';
    } else if (['d', 'path recharge'].includes(opt)) {
        reply = `You selected Path Recharge.`;
        file = 'path-recharge.pdf';
    } else if (['e', 'path logistic'].includes(opt)) {
        reply = `You selected Path Logistic.`;
        file = 'path-logistic.pdf';
    } else if (['f', 'path india ltd highway'].includes(opt)) {
        reply = `You selected Path India Ltd Highway.`;
        file = 'path-india-ltd-highway.pdf';
    } else {
        reply = `Sorry, I didn't understand. Please choose a, b, c, d, e or f.`;
        await Conversation.updateConversation(convo.id, { last_message: message });
        return reply;
    }

    await Conversation.updateConversation(convo.id, { step: 6, last_message: message });

    // Return a list of bot messages including a download link
    return [
        { from: 'bot', text: reply },
        { from: 'bot', text: `📄 [Download Brochure](http://localhost:5000/brochures/${file})` },
        { from: 'bot', text: `☎️ Sales & marketing number: 986532741` }
    ];


        default:
            return `Thank you for contacting us!`;
    }
}

module.exports = {
    handleUserMessage,
};
