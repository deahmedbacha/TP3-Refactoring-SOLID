export class SmtpMailer {
  constructor({ host, port }) {
    this.host = host;
    this.port = port;
    this.outbox = [];
  }

  send({ to, subject, body }) {
    this.outbox.push({
      via: `${this.host}:${this.port}`,
      to,
      subject,
      body
    });
  }
}
