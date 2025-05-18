import { Component, inject } from '@angular/core';
import { TransactionService, Transaction } from '../../../core/services/transaction.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './transaction-list.component.html',
})
export class TransactionListComponent {
  private readonly transactionService = inject(TransactionService);
  transactions: Transaction[] = [];

  ngOnInit() {
    this.transactionService.getTransactions().subscribe((data) => {
      this.transactions = data;
    });
  }
}