import { FormData } from '../types';
import { saveSubmission } from './submissionStorage';


export const DISCORD_WEBHOOK_URL = import.meta.env.VITE_DISCORD_WEBHOOK_URL || 'https://discord.com/api/webhooks/your-webhook-url';

export const sendToDiscord = async (data: FormData): Promise<boolean> => {
  try {

    const submissionId = await saveSubmission(data);

    const baseUrl = 'https://www.agreement.ukrp.network/';
    const viewUrl = `${baseUrl}/submission/${submissionId}`;


    const formattedMessage = {
      embeds: [
        {
          title: 'New Command Agreement Submission',
          color: 3447003,
          author: {
            name: 'UKRP Command System',
            icon_url: 'https://cdn.discordapp.com/attachments/1309013763566866452/1370105336991711373/UKRP-LOGO-CAR-BG.png?ex=681e4987&is=681cf807&hm=400775f613fadb52e295ed8baf8aa80708f7719c23f8603e53ca52e2e6148ce2&'
          },
          fields: [
            {
              name: 'Discord ID',
              value: `<@${data.discordId}>`,
              inline: true
            },
            {
              name: 'Division',
              value: data.division,
              inline: true
            },
            {
              name: 'Command Tier',
              value: data.commandTier,
              inline: true
            },
            {
              name: 'View Full Submission',
              value: `[Click here to view the full submission](${viewUrl})`,
              inline: false
            }
          ],
          timestamp: new Date().toISOString(),
          footer: {
            text: 'UKRP Command Agreement System',
            icon_url: 'https://cdn.discordapp.com/attachments/1309013763566866452/1370105336991711373/UKRP-LOGO-CAR-BG.png?ex=681e4987&is=681cf807&hm=400775f613fadb52e295ed8baf8aa80708f7719c23f8603e53ca52e2e6148ce2&'
          },
          thumbnail: {
            url: 'https://cdn.discordapp.com/attachments/1309013763566866452/1370105336991711373/UKRP-LOGO-CAR-BG.png?ex=681e4987&is=681cf807&hm=400775f613fadb52e295ed8baf8aa80708f7719c23f8603e53ca52e2e6148ce2&'
          }
        }
      ]
    };

    const response1 = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formattedMessage)
    });


    const rolePingMessage = {
      content: `<@&1294051669855834154>`,
    };


    const response2 = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(rolePingMessage)
    });

    return response1.ok && response2.ok;
  } catch (error) {
    console.error('Error sending to Discord:', error);
    return false;
  }
};
