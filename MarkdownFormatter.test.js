import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildReportService } from './main.js';

test('un format Markdown s’ajoute sans modifier ReportService', () => {
  const { service } = buildReportService();

  const result = service.generate('2026-09', 'md');

  assert.match(result, /# Ventes 2026-09/);
  assert.match(result, /Total HT : 551 €/);
  assert.match(result, /Total TTC : 661.2 €/);
});
