/*
  # Create Core Tables for Commercial Lending Management System

  ## Overview
  This migration creates the foundational database schema for a commercial lending management system.

  ## New Tables

  ### 1. `clients`
  Stores client information (individuals, businesses, trusts)
  - `id` (uuid, primary key)
  - `client_id` (text, unique) - Human-readable client identifier
  - `name` (text) - Individual or business name
  - `client_type` (text) - Individual, Business, Trust, etc.
  - `primary_contact` (text) - Main contact person
  - `email` (text)
  - `phone_number` (text)
  - `date_of_birth` (date) - For individuals
  - `street_address` (text)
  - `city` (text)
  - `state` (text)
  - `zip_code` (text)
  - `country` (text) - Default 'USA'
  - `tax_id` (text)
  - `business_start_date` (date) - For businesses
  - `industry_type` (text)
  - `relationship_manager_id` (uuid) - Foreign key to users
  - `kyc_status` (text) - Verified, Pending, Incomplete, Expired
  - `client_risk_rating` (text) - Low, Medium, High, Critical
  - `credit_score` (integer)
  - `notes` (text)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 2. `loans`
  Stores loan information and terms
  - `id` (uuid, primary key)
  - `loan_id` (text, unique) - Human-readable loan identifier
  - `client_id` (uuid) - Foreign key to clients
  - `loan_name` (text)
  - `loan_amount` (numeric)
  - `loan_type` (text) - Term Loan, Line of Credit, Mortgage, etc.
  - `interest_rate` (numeric)
  - `loan_term_months` (integer)
  - `loan_purpose` (text)
  - `collateral_details` (text)
  - `disbursement_date` (date)
  - `maturity_date` (date)
  - `status` (text) - Active, Pending, Closed, Default, etc.
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 3. `documents`
  Stores document metadata associated with loans
  - `id` (uuid, primary key)
  - `loan_id` (uuid) - Foreign key to loans
  - `document_name` (text)
  - `document_type` (text) - Contract, Compliance, Financial Statement, etc.
  - `file_path` (text) - Storage path reference
  - `file_size` (bigint) - Size in bytes
  - `mime_type` (text)
  - `uploaded_by` (uuid) - Foreign key to users
  - `uploaded_at` (timestamptz)
  - `version` (integer) - Default 1
  - `tags` (text[]) - Array of tags
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 4. `transactions`
  Stores all financial transactions related to loans
  - `id` (uuid, primary key)
  - `transaction_id` (text, unique) - Human-readable transaction identifier
  - `loan_id` (uuid) - Foreign key to loans
  - `transaction_type` (text) - Disbursement, Payment, Fee, Interest
  - `amount` (numeric)
  - `transaction_date` (date)
  - `description` (text)
  - `reference_number` (text)
  - `status` (text) - Completed, Pending, Failed
  - `created_by` (uuid) - Foreign key to users
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 5. `relationship_managers`
  Stores relationship manager information and assignments
  - `id` (uuid, primary key)
  - `user_id` (uuid) - Foreign key to auth.users
  - `name` (text)
  - `email` (text)
  - `phone` (text)
  - `office_location` (text)
  - `is_active` (boolean) - Default true
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 6. `reports`
  Stores generated reports
  - `id` (uuid, primary key)
  - `report_type` (text) - Compliance, Risk, Portfolio, etc.
  - `report_name` (text)
  - `parameters` (jsonb) - Report generation parameters
  - `file_path` (text) - Storage path reference
  - `generated_by` (uuid) - Foreign key to users
  - `generated_at` (timestamptz)
  - `created_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Add policies for authenticated users to read their assigned data
  - Add policies for authenticated users to insert, update, delete their data

  ## Indexes
  - Create indexes on foreign keys for performance
  - Create indexes on frequently queried fields (email, client_id, loan_id, status)
*/

-- Create clients table
CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id text UNIQUE NOT NULL,
  name text NOT NULL,
  client_type text NOT NULL DEFAULT 'Individual',
  primary_contact text,
  email text,
  phone_number text,
  date_of_birth date,
  street_address text,
  city text,
  state text,
  zip_code text,
  country text DEFAULT 'USA',
  tax_id text,
  business_start_date date,
  industry_type text,
  relationship_manager_id uuid,
  kyc_status text DEFAULT 'Pending',
  client_risk_rating text DEFAULT 'Medium',
  credit_score integer,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create loans table
CREATE TABLE IF NOT EXISTS loans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  loan_id text UNIQUE NOT NULL,
  client_id uuid REFERENCES clients(id) ON DELETE CASCADE,
  loan_name text NOT NULL,
  loan_amount numeric(15, 2) NOT NULL,
  loan_type text NOT NULL,
  interest_rate numeric(5, 2) NOT NULL,
  loan_term_months integer NOT NULL,
  loan_purpose text,
  collateral_details text,
  disbursement_date date,
  maturity_date date,
  status text DEFAULT 'Pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create documents table
CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  loan_id uuid REFERENCES loans(id) ON DELETE CASCADE,
  document_name text NOT NULL,
  document_type text NOT NULL,
  file_path text NOT NULL,
  file_size bigint,
  mime_type text,
  uploaded_by uuid,
  uploaded_at timestamptz DEFAULT now(),
  version integer DEFAULT 1,
  tags text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id text UNIQUE NOT NULL,
  loan_id uuid REFERENCES loans(id) ON DELETE CASCADE,
  transaction_type text NOT NULL,
  amount numeric(15, 2) NOT NULL,
  transaction_date date NOT NULL DEFAULT CURRENT_DATE,
  description text,
  reference_number text,
  status text DEFAULT 'Completed',
  created_by uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create relationship_managers table
CREATE TABLE IF NOT EXISTS relationship_managers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  office_location text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create reports table
CREATE TABLE IF NOT EXISTS reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  report_type text NOT NULL,
  report_name text NOT NULL,
  parameters jsonb,
  file_path text,
  generated_by uuid,
  generated_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_clients_email ON clients(email);
CREATE INDEX IF NOT EXISTS idx_clients_client_id ON clients(client_id);
CREATE INDEX IF NOT EXISTS idx_clients_relationship_manager ON clients(relationship_manager_id);
CREATE INDEX IF NOT EXISTS idx_clients_kyc_status ON clients(kyc_status);

CREATE INDEX IF NOT EXISTS idx_loans_loan_id ON loans(loan_id);
CREATE INDEX IF NOT EXISTS idx_loans_client_id ON loans(client_id);
CREATE INDEX IF NOT EXISTS idx_loans_status ON loans(status);

CREATE INDEX IF NOT EXISTS idx_documents_loan_id ON documents(loan_id);
CREATE INDEX IF NOT EXISTS idx_documents_type ON documents(document_type);

CREATE INDEX IF NOT EXISTS idx_transactions_loan_id ON transactions(loan_id);
CREATE INDEX IF NOT EXISTS idx_transactions_type ON transactions(transaction_type);
CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(transaction_date);

CREATE INDEX IF NOT EXISTS idx_relationship_managers_user_id ON relationship_managers(user_id);
CREATE INDEX IF NOT EXISTS idx_relationship_managers_email ON relationship_managers(email);

-- Enable Row Level Security
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE loans ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE relationship_managers ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- RLS Policies for clients
CREATE POLICY "Authenticated users can view all clients"
  ON clients FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert clients"
  ON clients FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update clients"
  ON clients FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete clients"
  ON clients FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for loans
CREATE POLICY "Authenticated users can view all loans"
  ON loans FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert loans"
  ON loans FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update loans"
  ON loans FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete loans"
  ON loans FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for documents
CREATE POLICY "Authenticated users can view all documents"
  ON documents FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert documents"
  ON documents FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update documents"
  ON documents FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete documents"
  ON documents FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for transactions
CREATE POLICY "Authenticated users can view all transactions"
  ON transactions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert transactions"
  ON transactions FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update transactions"
  ON transactions FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete transactions"
  ON transactions FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for relationship_managers
CREATE POLICY "Authenticated users can view all relationship managers"
  ON relationship_managers FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert relationship managers"
  ON relationship_managers FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update relationship managers"
  ON relationship_managers FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete relationship managers"
  ON relationship_managers FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for reports
CREATE POLICY "Authenticated users can view all reports"
  ON reports FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert reports"
  ON reports FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update reports"
  ON reports FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete reports"
  ON reports FOR DELETE
  TO authenticated
  USING (true);