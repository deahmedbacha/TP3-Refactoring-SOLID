import { ReportService } from './application/ReportService.js';

import { JsonFileOrderRepository } from './infrastructure/JsonFileOrderRepository.js';
import { SmtpMailer } from './infrastructure/SmtpMailer.js';
import { ConsoleLogger } from './infrastructure/ConsoleLogger.js';

import { FormatterRegistry } from './formatters/FormatterRegistry.js';
import { CsvFormatter } from './formatters/CsvFormatter.js';
import { HtmlFormatter } from './formatters/HtmlFormatter.js';
import { JsonFormatter } from './formatters/JsonFormatter.js';
import { ReportPolicy } from './application/ReportPolicy.js';
import { MarkdownFormatter } from './formatters/MarkdownFormatter.js';

// Creation des dependances
export function buildReportService(plan = 'pro') {
  const orders = new JsonFileOrderRepository(
    new URL('./orders.json', import.meta.url)
  );

  const mailer = new SmtpMailer({
    host: process.env.SMTP_HOST || 'smtp.shoplite.fr',
    port: Number(process.env.SMTP_PORT || 587)
  });

  const logger = new ConsoleLogger();

  const registry = new FormatterRegistry();
  registry.register('csv', new CsvFormatter());
  registry.register('html', new HtmlFormatter());
  registry.register('json', new JsonFormatter());
  registry.register('md', new MarkdownFormatter());

  const clock = {
    now: () => new Date().toISOString()
  };
  const policy = new ReportPolicy(plan);

  const service = new ReportService({
    orders,
    mailer,
    logger,
    registry,
    clock,
    policy
  });

  return { service, mailer, logger, registry };
}

