import { Component, inject, AfterViewInit } from '@angular/core';
import { TransactionService } from '../../../core/services/transaction.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-spending-chart',
  standalone: true,
  templateUrl: './spending-chart.component.html',
})
export class SpendingChartComponent implements AfterViewInit {
  private readonly transactionService = inject(TransactionService);

  ngAfterViewInit() {
    this.transactionService.getTransactions().subscribe((transactions) => {
      const categories = [...new Set(transactions.map((t) => t.category))];
      const amounts = categories.map((cat) =>
        transactions
          .filter((t) => t.category === cat && t.type === 'Expense')
          .reduce((sum, t) => sum + t.amount, 0)
      );
      new Chart('spendingChart', {
        type: 'bar',
        data: {
          labels: categories,
          datasets: [
            {
              label: 'Spending by Category',
              data: amounts,
              backgroundColor: '#bbc4c2', // Pewter
              borderColor: '#7e7c73', // Gray
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: { beginAtZero: true, ticks: { color: '#bbc4c2' } },
            x: { ticks: { color: '#bbc4c2' } },
          },
          plugins: {
            legend: { labels: { color: '#bbc4c2' } },
          },
        },
      });
    });
  }
}