// TP 3 · CODE DE DÉPART (à refactorer). Rapport mensuel des ventes de ShopLite.
// Ce code fonctionne, mais il viole plusieurs principes SOLID. Ne le réécrivez pas d'un bloc :
// figez d'abord son comportement par des tests, puis extrayez les responsabilités une par une.

import fs from 'node:fs';
import { computeStats } from './domain/salesStats.js';

import { FormatterRegistry } from './formatters/FormatterRegistry.js';
import { CsvFormatter } from './formatters/CsvFormatter.js';
import { HtmlFormatter } from './formatters/HtmlFormatter.js';
import { JsonFormatter } from './formatters/JsonFormatter.js';

export class ReportService {
  constructor() {
    this.dbFile = new URL('./orders.json', import.meta.url);

    this.smtp = {
      host: 'smtp.shoplite.fr',
      port: 587,
      user: 'reports',
      password: 'Sh0pL1te!'
    };

    this.outbox = [];
    this.history = [];

    // Les formats disponibles
    this.registry = new FormatterRegistry();
    this.registry.register('csv', new CsvFormatter());
    this.registry.register('html', new HtmlFormatter());
    this.registry.register('json', new JsonFormatter());
  }

  loadOrders() {
    const raw = fs.readFileSync(this.dbFile, 'utf8');
    return JSON.parse(raw);
  }

  generate(month, format, recipient) {
    // Recuperer les commandes et calculer les statistiques
    const orders = this.loadOrders();
    const stats = computeStats(orders, month);

    // Generer le rapport selon le format choisi
    const output = this.registry.get(format).format(stats);

    // Journalisation
    const line = `[${new Date().toISOString()}] rapport ${month} (${format}) : ${stats.count} commande(s)`;

    console.log(line);
    this.history.push(line);

    // Envoi par e-mail
    if (recipient) {
      if (!recipient.includes('@')) {
        throw new Error(`Adresse invalide : ${recipient}`);
      }

      this.outbox.push({
        via: `${this.smtp.host}:${this.smtp.port}`,
        to: recipient,
        subject: `Rapport des ventes ${month}`,
        body: output
      });
    }

    return output;
  }
}

// Version gratuite
export class FreeReportService extends ReportService {
  generate(month, format, recipient) {
    if (format !== 'csv') {
      throw new Error('Format réservé aux comptes Pro');
    }

    if (recipient) {
      throw new Error('Envoi par e-mail réservé aux comptes Pro');
    }

    return super.generate(month, format);
  }
}
