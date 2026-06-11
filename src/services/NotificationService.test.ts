import { describe, it, expect, vi } from 'vitest';
import { notificationService } from '../services/NotificationService';
import { LocalNotifications } from '@capacitor/local-notifications';

vi.mock('@capacitor/local-notifications', () => ({
  LocalNotifications: {
    requestPermissions: vi.fn().mockResolvedValue({ display: 'granted' }),
    schedule: vi.fn(),
  },
}));

describe('NotificationService', () => {
  it('should schedule a notification', async () => {
    await notificationService.schedule('Test', 'Body', new Date(), 1);
    expect(LocalNotifications.schedule).toHaveBeenCalled();
  });
});
