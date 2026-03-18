export const userResolver = {
  User: {
    isOnline(parent: { lastSeen?: Date }) {
      if (!parent.lastSeen) return false;

      const now = new Date().getTime();
      const lastSeen = new Date(parent.lastSeen).getTime();

      // онлайн, если был активен в последние 30 секунд
      return now - lastSeen < 0.5 * 60 * 1000;
    },
    lastSeen(parent: { lastSeen?: Date }) {
      if (!parent.lastSeen) return null;
      return new Date(parent.lastSeen).toISOString();
    }
  },
};
