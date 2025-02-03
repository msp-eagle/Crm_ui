import { Component } from '@angular/core';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
@Component({
  selector: 'app-reports',
  standalone: false,

  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent {
  tickets = [
    {
      ticketId: 'T001',
      subject: 'Login Issue',
      status: 'Open',
      priority: 'High',
      assignedto: 'kannan',
      createdDateTime: new Date('2025-01-28T10:30:00')
    },
    {
      ticketId: 'T002',
      subject: 'Payment Failure',
      status: 'Resolved',
      priority: 'Medium',
      assignedto: 'magesh',
      createdDateTime: new Date('2025-01-25T12:00:00')
    },
    {
      ticketId: 'T003',
      subject: 'Bug in Dashboard',
      status: 'In Progress',
      priority: 'Low',
      assignedto: 'keerthana',
      createdDateTime: new Date('2025-01-27T15:20:00')
    },
    {
      ticketId: 'T001',
      subject: 'Login Issue',
      status: 'Open',
      priority: 'High',
      assignedto: 'kannan',
      createdDateTime: new Date('2025-01-28T10:30:00')
    },
    {
      ticketId: 'T002',
      subject: 'Payment Failure',
      status: 'Resolved',
      priority: 'Medium',
      assignedto: 'magesh',
      createdDateTime: new Date('2025-01-25T12:00:00')
    },
    {
      ticketId: 'T003',
      subject: 'Bug in Dashboard',
      status: 'In Progress',
      priority: 'Low',
      assignedto: 'keerthana',
      createdDateTime: new Date('2025-01-27T15:20:00')
    },
    {
      ticketId: 'T001',
      subject: 'Login Issue',
      status: 'Open',
      priority: 'High',
      assignedto: 'kannan',
      createdDateTime: new Date('2025-01-28T10:30:00')
    },
    {
      ticketId: 'T002',
      subject: 'Payment Failure',
      status: 'Resolved',
      priority: 'Medium',
      assignedto: 'magesh',
      createdDateTime: new Date('2025-01-25T12:00:00')
    },
    {
      ticketId: 'T003',
      subject: 'Bug in Dashboard',
      status: 'In Progress',
      priority: 'Low',
      assignedto: 'keerthana',
      createdDateTime: new Date('2025-01-27T15:20:00')
    },
    {
      ticketId: 'T001',
      subject: 'Login Issue',
      status: 'Open',
      priority: 'High',
      assignedto: 'kannan',
      createdDateTime: new Date('2025-01-28T10:30:00')
    },
    {
      ticketId: 'T002',
      subject: 'Payment Failure',
      status: 'Resolved',
      priority: 'Medium',
      assignedto: 'magesh',
      createdDateTime: new Date('2025-01-25T12:00:00')
    },
    {
      ticketId: 'T003',
      subject: 'Bug in Dashboard',
      status: 'In Progress',
      priority: 'Low',
      assignedto: 'keerthana',
      createdDateTime: new Date('2025-01-27T15:20:00')
    },
    {
      ticketId: 'T001',
      subject: 'Login Issue',
      status: 'Open',
      priority: 'High',
      assignedto: 'kannan',
      createdDateTime: new Date('2025-01-28T10:30:00')
    },
    {
      ticketId: 'T002',
      subject: 'Payment Failure',
      status: 'Resolved',
      priority: 'Medium',
      assignedto: 'magesh',
      createdDateTime: new Date('2025-01-25T12:00:00')
    },
    {
      ticketId: 'T003',
      subject: 'Bug in Dashboard',
      status: 'In Progress',
      priority: 'Low',
      assignedto: 'keerthana',
      createdDateTime: new Date('2025-01-27T15:20:00')
    }
  ];
  // Filter variables
  filterStatus = '';
  filterAssignedTo = '';
  filterPriority = '';
  filterFromDate: string | null = null;
  filterToDate: string | null = null;
  // Sorting variables
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  currentPage: number = 1;
  itemsPerPage: number = 5; // Default to 5 items per page

  totalPages: number = 10;
  paginatedTickets: any[] = [];
  pages: number[] = [];

  filteredTickets = [...this.tickets]; // Initialize with all tickets

  constructor() {}

  ngOnInit(): void {}
  // Apply filters to the tickets
  applyFilters(): void {
    this.filteredTickets = this.tickets.filter(ticket => {
      const statusMatch = this.filterStatus ? ticket.status === this.filterStatus : true;
      const assignedToMatch = this.filterAssignedTo ? ticket.assignedto.toLowerCase().includes(this.filterAssignedTo.toLowerCase()) : true;
      const priorityMatch = this.filterPriority ? ticket.priority === this.filterPriority : true;
      const fromDateMatch = this.filterFromDate ? new Date(ticket.createdDateTime) >= new Date(this.filterFromDate) : true;
      const toDateMatch = this.filterToDate ? new Date(ticket.createdDateTime) <= new Date(this.filterToDate) : true;

      return statusMatch && assignedToMatch && priorityMatch && fromDateMatch && toDateMatch;
    });
    this.updatePagination(); // Recalculate pagination after applying filters
  }

  // Update the pagination logic
  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredTickets.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);

    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedTickets = this.filteredTickets.slice(start, end);
  }

  // Change page
  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagination();
  }

  // Sorting method
  sortData(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.filteredTickets = this.filteredTickets.sort((a, b) => {

      // @ts-ignore
      let valueA = a[column];
      // @ts-ignore
      let valueB = b[column];

      if (column === 'createdDateTime') {
        valueA = new Date(valueA);
        valueB = new Date(valueB);
      }

      if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    this.updatePagination();
  }
  // Function to download filtered tickets as PDF
  downloadPDF(): void {
    const doc = new jsPDF('landscape');


    // Set page size to A4 (if it's not default)
    const pageWidth = 297;  // A4 width in mm
    const pageHeight = 210; // A4 height in mm

    // Create the document with A4 size
    doc.internal.pageSize.width = pageWidth;
    doc.internal.pageSize.height = pageHeight;
    doc.setFont("Arial", "normal");
    doc.setFontSize(12);

    // Add the title to the document
    doc.text("Filtered Ticket List", 14, 10);

    // Define the table columns and data
    const tableColumns = ["Sno", "Ticket ID", "Subject", "Status", "Priority", "Assigned To", "Created Date Time"];
    const tableData = this.filteredTickets.map((ticket, index) => [
      (index + 1).toString(),
      ticket.ticketId,
      ticket.subject,
      ticket.status,
      ticket.priority,
      ticket.assignedto,
      ticket.createdDateTime.toLocaleString()  // Format date
    ]);

    // Add the table to the PDF using autoTable
    autoTable(doc, {
      startY: 20, // Start Y position to prevent overlap with title
      head: [tableColumns],
      body: tableData,
      theme: 'grid',  // Add grid lines
      styles: {
        cellPadding: 5,
        fontSize: 10,
        lineWidth: 0.1
      },
      headStyles: {
        fillColor: [63, 81, 181],  // Blue color for header
        textColor: 255,  // White text in header
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [242, 242, 242]  // Light gray for alternate rows
      },
      columnStyles: {
        0: { cellWidth: 'auto' },
        1: { cellWidth: 'auto' },
        2: { cellWidth: 'auto' },
        3: { cellWidth: 'auto' },
        4: { cellWidth: 'auto' },
        5: { cellWidth: 'auto' },
        6: { cellWidth: 'auto' }
      }
    });

    // Save the PDF
    doc.save('filtered-tickets.pdf');
  }
}
