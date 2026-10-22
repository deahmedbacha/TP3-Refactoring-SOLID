
# tp3 - violations solid

| # | Principe | Lignes | Problème | Conséquence |
|---|---|---|---|---|
| 1 | S - SRP | 15-73 | ReportService fait trop de choses comme lire les commandes calculer les ventes et envoyer les mails | si on change une fonctionnalite on risque de casser les autres |
| 2 | O - OCP | 43-54 | on utilise des if pour choisir le format du rapport | pour ajouter un format PDF il faut modifier ReportService |
| 3 | L - LSP | 77-82 | FreeReportService refuse des formats acceptes par ReportService | on ne peut pas remplacer le parent par cette sous classe sans probleme |
| 4 | D - DIP | 4-17 | ReportService depend directement du fichier JSON et de fs | difficile de tester avec une autre source de donnees |
| 5 | I - ISP | 10 | le mot de passe SMTP est ecrit directement dans le code | le mot de passe risque de se retrouver sur GitHub |