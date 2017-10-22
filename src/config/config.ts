export let Config = (function () {
  let instance: any;
  function init() {
    return {
      apiKey: "Owen",
      listening_port: 3000,
      mongoDB: {
        host: "127.0.0.1",
        port: "27017",
        user: "owen",
        password: "ab1234cd",
        dbname: "addressbook",
        skipUserAuthentication: false
      },
      mysql: {

      }
    };
  }
  return {
    getInstance: () => {
      if (!instance) {
        instance = init();
      }
      return instance;
    }
  };
})();