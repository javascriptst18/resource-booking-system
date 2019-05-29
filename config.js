const env = process.env.NODE_ENV;

const gcloud ={
  app:{
    port:3000
  },
  db:{
    host: 'mongodb',
    port: '27017',
    name: 'rbs'
  }
}
const local_test = {
  app: {
    port: 3000
  },
  db: {
    host: 'localhost',
    port: '27017',
    name: 'rbs'
  }
};

const dev = {
  app: {
    port: 3001
  },
  db: {
    host: 'localhost',
    port: 27017,
    name: 'rbs'
  }
};

const config = {
  local_test,
  gcloud,
  dev
};

module.exports = config[env];
