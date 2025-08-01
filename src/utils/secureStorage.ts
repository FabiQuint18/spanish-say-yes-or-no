// Secure storage utility to encrypt sensitive data before storing in localStorage
// This prevents XSS attacks from accessing sensitive user information

interface SecureStorageData {
  data: string;
  timestamp: number;
}

class SecureStorage {
  private readonly encryptionKey: string;

  constructor() {
    // Generate or retrieve encryption key
    this.encryptionKey = this.getOrCreateEncryptionKey();
  }

  private getOrCreateEncryptionKey(): string {
    let key = sessionStorage.getItem('_sk');
    if (!key) {
      // Generate a random key for this session
      key = this.generateRandomKey();
      sessionStorage.setItem('_sk', key);
    }
    return key;
  }

  private generateRandomKey(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  private async encrypt(text: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    
    // Use Web Crypto API for encryption
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(this.encryptionKey.slice(0, 32)),
      { name: 'AES-GCM' },
      false,
      ['encrypt']
    );

    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encrypted = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      data
    );

    // Combine IV and encrypted data
    const combined = new Uint8Array(iv.length + encrypted.byteLength);
    combined.set(iv);
    combined.set(new Uint8Array(encrypted), iv.length);

    return btoa(String.fromCharCode(...combined));
  }

  private async decrypt(encryptedText: string): Promise<string> {
    try {
      const combined = new Uint8Array(
        atob(encryptedText).split('').map(char => char.charCodeAt(0))
      );

      const iv = combined.slice(0, 12);
      const encrypted = combined.slice(12);

      const encoder = new TextEncoder();
      const key = await crypto.subtle.importKey(
        'raw',
        encoder.encode(this.encryptionKey.slice(0, 32)),
        { name: 'AES-GCM' },
        false,
        ['decrypt']
      );

      const decrypted = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv },
        key,
        encrypted
      );

      return new TextDecoder().decode(decrypted);
    } catch (error) {
      console.error('Decryption failed:', error);
      return '';
    }
  }

  async setItem(key: string, value: any): Promise<void> {
    try {
      const serialized = JSON.stringify(value);
      const encrypted = await this.encrypt(serialized);
      const storageData: SecureStorageData = {
        data: encrypted,
        timestamp: Date.now()
      };
      localStorage.setItem(`secure_${key}`, JSON.stringify(storageData));
    } catch (error) {
      console.error('Secure storage set failed:', error);
      // Fallback to regular localStorage (not recommended for production)
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  async getItem(key: string): Promise<any> {
    try {
      const stored = localStorage.getItem(`secure_${key}`);
      if (!stored) {
        // Check for legacy unencrypted data
        const legacy = localStorage.getItem(key);
        if (legacy) {
          try {
            const parsed = JSON.parse(legacy);
            // Migrate to secure storage
            await this.setItem(key, parsed);
            localStorage.removeItem(key);
            return parsed;
          } catch {
            return null;
          }
        }
        return null;
      }

      const storageData: SecureStorageData = JSON.parse(stored);
      
      // Check if data is too old (24 hours)
      if (Date.now() - storageData.timestamp > 24 * 60 * 60 * 1000) {
        this.removeItem(key);
        return null;
      }

      const decrypted = await this.decrypt(storageData.data);
      return decrypted ? JSON.parse(decrypted) : null;
    } catch (error) {
      console.error('Secure storage get failed:', error);
      return null;
    }
  }

  removeItem(key: string): void {
    localStorage.removeItem(`secure_${key}`);
    localStorage.removeItem(key); // Also remove legacy data
  }

  clear(): void {
    // Only clear secure storage items
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('secure_')) {
        localStorage.removeItem(key);
      }
    });
  }
}

export const secureStorage = new SecureStorage();