import { Signal } from '@fyclabs/tools-fyc-react/signals';

export const $global = Signal({
  isLoading: true,
  isSignedIn: false,
});
export const $view = Signal({});
export const $auth = Signal({});
export const $user = Signal({});
export const $list = Signal({});
export const $detail = Signal({});
export const $form = Signal({});
export const $filter = Signal({ page: 1 });
export const $alert = Signal({});

export const $clients = Signal({
  list: [],
  selectedClient: null,
  isTableLoading: false,
  totalCount: 0,
});

export const $clientsFilter = Signal({
  page: 1,
  sortKey: undefined,
  sortDirection: undefined,
  searchTerm: '',
  clientType: '',
  kycStatus: '',
  riskRating: '',
});

export const $clientsView = Signal({
  isTableLoading: false,
  selectedItems: [],
  isSelectAllChecked: false,
  showAddModal: false,
  showEditModal: false,
  showViewModal: false,
  showDeleteModal: false,
  tableHeaders: [],
});

export const $clientsForm = Signal({
  id: '',
  client_id: '',
  name: '',
  client_type: 'Individual',
  primary_contact: '',
  email: '',
  phone_number: '',
  date_of_birth: '',
  street_address: '',
  city: '',
  state: '',
  zip_code: '',
  country: 'USA',
  tax_id: '',
  business_start_date: '',
  industry_type: '',
  relationship_manager_id: '',
  kyc_status: 'Pending',
  client_risk_rating: 'Medium',
  credit_score: '',
  notes: '',
});

export const $loans = Signal({
  list: [],
  selectedLoan: null,
  isTableLoading: false,
  totalCount: 0,
});

export const $loansFilter = Signal({
  page: 1,
  sortKey: undefined,
  sortDirection: undefined,
  searchTerm: '',
  loanType: '',
  status: '',
});

export const $loansView = Signal({
  isTableLoading: false,
  selectedItems: [],
  isSelectAllChecked: false,
  showAddModal: false,
  showEditModal: false,
  showDeleteModal: false,
  showContextMenu: false,
  tableHeaders: [],
});

export const $loansForm = Signal({
  id: '',
  loan_id: '',
  client_id: '',
  loan_name: '',
  loan_amount: '',
  loan_type: '',
  interest_rate: '',
  loan_term_months: '',
  loan_purpose: '',
  collateral_details: '',
  disbursement_date: '',
  maturity_date: '',
  status: 'Pending',
});

export const $documents = Signal({
  list: [],
  selectedDocument: null,
  isTableLoading: false,
  totalCount: 0,
});

export const $documentsFilter = Signal({
  page: 1,
  sortKey: undefined,
  sortDirection: undefined,
  searchTerm: '',
  documentType: '',
});

export const $documentsView = Signal({
  isTableLoading: false,
  selectedItems: [],
  showUploadModal: false,
  showDeleteModal: false,
  showPreviewModal: false,
  tableHeaders: [],
});

export const $transactions = Signal({
  list: [],
  selectedTransaction: null,
  isTableLoading: false,
  totalCount: 0,
});

export const $transactionsFilter = Signal({
  page: 1,
  sortKey: undefined,
  sortDirection: undefined,
  searchTerm: '',
  transactionType: '',
  status: '',
  startDate: '',
  endDate: '',
});

export const $transactionsView = Signal({
  isTableLoading: false,
  selectedItems: [],
  showDetailModal: false,
  tableHeaders: [],
});

export const $relationshipManagers = Signal({
  list: [],
  selectedManager: null,
  isTableLoading: false,
  totalCount: 0,
});

export const $relationshipManagersFilter = Signal({
  page: 1,
  sortKey: undefined,
  sortDirection: undefined,
  searchTerm: '',
  isActive: true,
});

export const $relationshipManagersView = Signal({
  isTableLoading: false,
  selectedItems: [],
  showDetailModal: false,
  tableHeaders: [],
});

export const $reports = Signal({
  list: [],
  selectedReport: null,
  isGenerating: false,
});

export const $reportsView = Signal({
  showGenerateModal: false,
  reportType: '',
  parameters: {},
});

export const $dashboard = Signal({
  metrics: {
    totalClients: 0,
    activeLoans: 0,
    portfolioValue: 0,
    atRiskLoans: 0,
  },
  recentActivity: [],
  upcomingTasks: [],
  isLoading: false,
});
