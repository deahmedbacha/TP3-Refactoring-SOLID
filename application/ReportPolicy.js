export class ReportPolicy {
  constructor(plan = 'pro') {
    this.plan = plan;
  }

  verifier(format, recipient) {
    if (this.plan === 'free') {
      if (format !== 'csv') {
        throw new Error('Format réservé aux comptes Pro');
      }

      if (recipient) {
        throw new Error('Envoi par e-mail réservé aux comptes Pro');
      }
    }
  }
}