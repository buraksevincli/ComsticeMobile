import {client, xml} from '@xmpp/client';

class XmppService {
  private xmppClient: any;

  constructor() {
    this.xmppClient = client({
      // service: 'wss://ppg1.comstice.com:5223/ws', // WebSocket
      // service: 'https://ppg1.comstice.com:5223/http-bind', // BOSH
      service: 'xmpps://ppg1.comstice.com:5222',
      domain: 'ppg1.comstice.com',
      username: '160114',
      password: 'Password1',
    });

    this.setupListeners();
  }

  private setupListeners() {
    this.xmppClient.on('error', (err: any) => {
      console.error('XMPP Error:', err);
    });

    this.xmppClient.on('online', (address: any) => {
      console.log('XMPP Online:', address.toString());
      this.sendPresence();
    });

    this.xmppClient.on('offline', () => {
      console.log('XMPP Offline');
      setTimeout(() => {
        this.start();
      }, 5000);
    });

    this.xmppClient.on('stanza', (stanza: any) => {
      console.log('Received stanza:', stanza.toString());
      if (stanza.is('message')) {
        const body = stanza.getChildText('body');
        if (body) {
          console.log('Message Body:', body);
        }
      }
    });
  }

  public async start() {
    try {
      console.log('Starting XMPP connection...');
      await this.xmppClient.start();
      console.log('XMPP Connection Started');
    } catch (error) {
      console.error('Error starting XMPP client:', error);
    }
  }

  public async stop() {
    try {
      await this.xmppClient.stop();
      console.log('XMPP Connection Stopped');
    } catch (error) {
      console.error('Error stopping XMPP client:', error);
    }
  }

  public sendMessage(to: string, message: string) {
    try {
      const messageStanza = xml(
        'message',
        {type: 'chat', to},
        xml('body', {}, message),
      );
      this.xmppClient.send(messageStanza);
      console.log('Message sent:', message);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }

  private sendPresence() {
    const presenceStanza = xml('presence', {}, xml('status', {}, 'Available'));
    this.xmppClient.send(presenceStanza);
    console.log('Presence sent');
  }
}

const xmppService = new XmppService();
export default xmppService;
