import { LocalNotifications } from '@capacitor/local-notifications';

export class NotificationService {
  async requestPermissions() {
    return await LocalNotifications.requestPermissions();
  }

  async schedule(title: string, body: string, date: Date, id: number) {
    const hasPermission = await this.requestPermissions();
    if (hasPermission.display !== 'granted') return;

    await LocalNotifications.schedule({
      notifications: [{
        title,
        body,
        id,
        schedule: { at: date }
      }]
    });
  }
}

export const notificationService = new NotificationService();
