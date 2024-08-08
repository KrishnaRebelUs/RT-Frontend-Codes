const eventEmitter = {
    events: {},
    on: function (event, listener) {
      if (!this.events[event]) {
        this.events[event] = [];
      }
      this.events[event].push(listener);
    },
    emit: function (event, ...args) {
      if (this.events[event]) {
        this.events[event].forEach((listener) => listener(...args));
      }
    },
    off: function (event, listenerToRemove) {
      if (!this.events[event]) {
        return;
      }
      this.events[event] = this.events[event].filter(
        (listener) => listener !== listenerToRemove
      );
    },
  };
  
  export default eventEmitter;
  