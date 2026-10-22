export class MarkdownFormatter {
  format(stats) {
    const { month, count, revenueHT, vat, revenueTTC, byCategory } = stats;

    let output = `# Ventes ${month}\n\n`;
    output += `Commandes : ${count}\n\n`;
    output += '| Categorie | Montant HT |\n';
    output += '|---|---|\n';

    for (const c of Object.keys(byCategory).sort()) {
      output += `| ${c} | ${byCategory[c]} € |\n`;
    }

    output += `\nTotal HT : ${revenueHT} €\n`;
    output += `TVA : ${vat} €\n`;
    output += `Total TTC : ${revenueTTC} €\n`;

    return output;
  }
}
