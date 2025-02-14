import {client, xml, Client} from '@xmpp/client';
import debug from '@xmpp/debug';

class XmppService {
  private static instance: XmppService;
  private xmppClient: Client | null = null;
  private isConnected = false;

  private constructor() {}

  public static getInstance(): XmppService {
    if (!XmppService.instance) {
      XmppService.instance = new XmppService();
    }
    return XmppService.instance;
  }

  public async startXmppConnection(): Promise<void> {
    if (this.isConnected) {
      console.log('XMPP already connected.');
      return;
    }

    try {
      this.xmppClient = client({
        service: 'wss://uccx12.comsticeeu.local:5280/ws',
        domain: 'uccx12.comsticeeu.local',
        username: 'burakmobile',
        password: '12345',
      });

      debug(this.xmppClient, true);

      this.setupListeners();

      await this.xmppClient.start();
      this.isConnected = true;

      console.log('✅ XMPP Connection started successfully!');
    } catch (error) {
      console.error('❌ Error initializing XMPP client:', error);
    }
  }

  private setupListeners(): void {
    if (!this.xmppClient) return;

    this.xmppClient.on('error', err => console.error('❌ XMPP Error:', err));
    this.xmppClient.on('offline', () => console.log('🔴 XMPP is offline'));
    this.xmppClient.on('online', async address => {
      console.log('✅ Connected as', address.toString());
    });

    this.xmppClient.on('stanza', async stanza => {
      console.log('📩 Received stanza:', stanza.toString());
    });
  }

  public async stopXmppConnection(): Promise<void> {
    if (!this.isConnected || !this.xmppClient) {
      console.log('XMPP is not connected.');
      return;
    }
    try {
      await this.xmppClient.stop();
      this.isConnected = false;
      console.log('🔴 XMPP Connection stopped.');
    } catch (error) {
      console.error('❌ Error stopping XMPP client:', error);
    }
  }
}

export default XmppService.getInstance();
