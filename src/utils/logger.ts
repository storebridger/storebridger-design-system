/* eslint-disable no-console */

class Logger {
  info(...args) {
    console.info(' ℹ ', ...args);
  }

  success(...args) {
    console.log(' ✓ ', ...args);
  }

  error(...args) {
    console.error(' ✗ ', ...args);
  }

  // warn(...args) {
  //   logger.warn(' ⚠ ', ...args);
  // }

  warn(...args) {
    console.warn(' ⚠ ', ...args);
  }
}

export const logger = new Logger();
