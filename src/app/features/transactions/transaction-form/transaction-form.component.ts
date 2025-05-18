import { Component, inject } from '@angular/core';
import { TransactionService, Transaction } from '../../../core/services/transaction.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './transaction-form.component.html',
})
export class TransactionFormComponent {
  private readonly transactionService = inject(TransactionService);
  private readonly router = inject(Router);
  transaction: Transaction = {
    amount: 0,
    description: '',
    date: new Date().toISOString().split('T')[0], // ISO date (e.g., "2025-05-17")
    category: '',
    type: 'Expense' // Default to Expense
  };
  errorMessage: string | null = null;

  onSubmit() {
    this.errorMessage = null;
    // Ensure date is a valid ISO string
    const transactionToSend: Transaction = {
      ...this.transaction,
      date: new Date(this.transaction.date).toISOString().split('T')[0]
    };
    this.transactionService.createTransaction(transactionToSend).subscribe({
      next: () => {
        this.router.navigate(['/transactions']);
      },
      error: (err) => {
        console.error('Transaction error:', err);
        this.errorMessage = err.status === 401
          ? 'Please log in to create a transaction'
          : err.error?.message || 'Failed to create transaction';
      },
    });
  }
}