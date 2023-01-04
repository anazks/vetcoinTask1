const events = {};

const emitCallback = async (callbackFn, data ) => {
  if (callbackFn) {
    callbackFn(data);
  }
};

const EventEmitter = {
  emit(event, data) {
    const emitEvents = events[event];
    if (emitEvents) {
      emitEvents.forEach(callback => emitCallback(callback, data));
    }
  },
  subscribe(event, callback) {
    if (callback) {
      let emitEvents = events[event];
      if (!emitEvents) {
        emitEvents = [];
        events[event] = emitEvents;
      }

      emitEvents.push(callback);
    }
  },
  unsubscribe(event, callback) {
    const emitEvents = events[event];

    if (emitEvents) {
      for (let i = emitEvents.length; i >= 0; i -= 1) {
        if (emitEvents[i] === callback) {
          emitEvents.splice(i, 1);
        }
      }
    }
  }
}

export default EventEmitter;
