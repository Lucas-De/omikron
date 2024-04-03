const { MQ_USER, MQ_HOST, MQ_PORT, MQ_PASSWORD } = process.env;
export const brokerConfig = {
  hostname: MQ_HOST,
  port: +MQ_PORT,
  username: MQ_USER,
  password: MQ_PASSWORD,
};
