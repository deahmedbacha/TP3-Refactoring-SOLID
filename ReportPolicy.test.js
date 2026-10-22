import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildReportService } from './main.js';

test('offre gratuite accepte le CSV', () => {
  const { service } = buildReportService('free');

  const result = service.generate('2026-09', 'csv');

  assert.match(result, /TOTAL HT;551/);
});

test('offre gratuite refuse le HTML', () => {
  const { service } = buildReportService('free');

  assert.throws(
    () => service.generate('2026-09', 'html'),
    /Format réservé aux comptes Pro/
  );
});

test('offre gratuite refuse les emails', () => {
  const { service } = buildReportService('free');

  assert.throws(
    () => service.generate('2026-09', 'csv', 'test@shoplite.fr'),
    /Envoi par e-mail réservé aux comptes Pro/
  );
});

