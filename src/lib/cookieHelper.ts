'use client';

export function forceRefreshUserInfo() {
  // Force a page reload to get fresh cookies
  window.location.reload();
}

export function getUserInfoFromCookie() {
  try {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'user_info') {
        return JSON.parse(decodeURIComponent(value));
      }
    }
    return null;
  } catch (error) {
    console.error('Error parsing user cookie:', error);
    return null;
  }
}