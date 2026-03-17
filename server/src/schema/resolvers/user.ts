export const userResolver = {
  User: {
    isOnline(parent: { lastSeen?: Date }) {
      if (!parent.lastSeen) return false;

      const now = new Date().getTime();
      const lastSeen = new Date(parent.lastSeen).getTime();
      return now - lastSeen < 0.5 * 60 * 1000; // онлайн, если был активен в последние 30 секунд
    },
  },
};
