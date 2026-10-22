import { computeStats } from '../domain/salesStats.js';

export class ReportService {
  constructor({ orders, mailer, logger, registry, clock, policy }) {
    this.orders = orders;
    this.mailer = mailer;
    this.logger = logger;
    this.registry = registry;
    this.clock = clock;
    this.policy = policy;
  }

  generate(month, format, recipient) {
    this.policy.verifier(format, recipient);
    const stats = computeStats(this.orders.all(), month);

    const output = this.registry.get(format).format(stats);

    const line = `[${this.clock.now()}] rapport ${month} (${format}) : ${stats.count} commande(s)`;
    this.logger.info(line);

    if (recipient) {
      if (!recipient.includes('@')) {
        throw new Error(`Adresse invalide : ${recipient}`);
      }

      this.mailer.send({
        to: recipient,
        subject: `Rapport des ventes ${month}`,
        body: output
      });
    }

    return output;
  }
}
