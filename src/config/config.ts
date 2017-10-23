export let Config = (function () {
  let instance: any;
  function init() {
    return {
      apiKey: "Owen",
      listening_port: 3000,
      mongoDB: {
        host: "127.0.0.1",
        port: "27017",
        dbname: "addressbook"
      },
      mysql: {
        database: "addressbook",
        username: "root",
        password: "ab1234cd",
        host: "localhost",
        port: 3306

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