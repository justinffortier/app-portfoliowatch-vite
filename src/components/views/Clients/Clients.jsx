import { useEffectAsync } from '@fyclabs/tools-fyc-react/utils';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import PageHeader from '@src/components/global/PageHeader';
import SignalTable from '@src/components/global/SignalTable';
import Search from '@src/components/global/Inputs/Search';
import SelectInput from '@src/components/global/Inputs/SelectInput';
import StatusBadge from '@src/components/global/StatusBadge';
import ContextMenu from '@src/components/global/ContextMenu';
import {
  $clientsView,
  $clientsFilter,
  $clients,
} from '@src/signals';
import { fetchClients } from './_helpers/clients.events';
import {
  kycStatusOptions,
  clientTypeOptions,
  riskRatingOptions,
} from '@src/api/mocks/clients.mocks';
import { relationshipManagersMock } from '@src/api/mocks/relationshipManagers.mocks';
import AddClientModal from './_components/AddClientModal';
import EditClientModal from './_components/EditClientModal';
import ViewClientModal from './_components/ViewClientModal';
import DeleteClientModal from './_components/DeleteClientModal';

const Clients = () => {
  useEffectAsync(async () => {
    await fetchClients();
  }, [$clientsFilter.value]);

  const getManagerName = (managerId) => {
    const manager = relationshipManagersMock.find((m) => m.id === managerId);
    return manager ? manager.name : '-';
  };

  const headers = [
    { key: 'client_id', value: 'Client ID', sortKey: 'client_id' },
    { key: 'name', value: 'Name', sortKey: 'name' },
    { key: 'client_type', value: 'Type', sortKey: 'client_type' },
    { key: 'email', value: 'Email', sortKey: 'email' },
    { key: 'phone_number', value: 'Phone', sortKey: 'phone_number' },
    { key: 'kyc_status', value: 'KYC Status', sortKey: 'kyc_status' },
    { key: 'client_risk_rating', value: 'Risk Rating', sortKey: 'client_risk_rating' },
    { key: 'relationship_manager', value: 'Manager' },
    { key: 'actions', value: 'Actions' },
  ];

  const rows = $clients.value.list.map((client) => ({
    ...client,
    kyc_status: () => <StatusBadge status={client.kyc_status} type="kyc" />,
    client_risk_rating: () => <StatusBadge status={client.client_risk_rating} type="risk" />,
    relationship_manager: getManagerName(client.relationship_manager_id),
    actions: () => (
      <ContextMenu
        items={[
          { label: 'Edit', icon: faEdit, action: 'edit' },
          { label: 'View Contact', icon: faEye, action: 'view' },
          { label: 'Delete', icon: faTrash, action: 'delete' },
        ]}
        onItemClick={(item) => {
          if (item.action === 'edit') {
            $clients.update({ selectedClient: client });
            $clientsView.update({ showEditModal: true });
          } else if (item.action === 'view') {
            $clients.update({ selectedClient: client });
            $clientsView.update({ showViewModal: true });
          } else if (item.action === 'delete') {
            $clients.update({ selectedClient: client });
            $clientsView.update({ showDeleteModal: true });
          }
        }}
      />
    ),
  }));

  return (
    <>
      <Container fluid className="py-24">
        <PageHeader
          title="Clients"
          actionButton
          actionButtonText="Add Client"
          onActionClick={() => $clientsView.update({ showAddModal: true })}
        />

        <Row className="mb-24">
          <Col md={4}>
            <Search
              placeholder="Search clients..."
              value={$clientsFilter.value.searchTerm}
              onChange={(e) => $clientsFilter.update({ searchTerm: e.target.value, page: 1 })}
            />
          </Col>
          <Col md={2}>
            <SelectInput
              options={[{ value: '', label: 'All Types' }, ...clientTypeOptions]}
              value={$clientsFilter.value.clientType}
              onChange={(option) => $clientsFilter.update({ clientType: option?.value || '', page: 1 })}
              placeholder="Client Type"
            />
          </Col>
          <Col md={2}>
            <SelectInput
              options={[{ value: '', label: 'All Statuses' }, ...kycStatusOptions]}
              value={$clientsFilter.value.kycStatus}
              onChange={(option) => $clientsFilter.update({ kycStatus: option?.value || '', page: 1 })}
              placeholder="KYC Status"
            />
          </Col>
          <Col md={2}>
            <SelectInput
              options={[{ value: '', label: 'All Ratings' }, ...riskRatingOptions]}
              value={$clientsFilter.value.riskRating}
              onChange={(option) => $clientsFilter.update({ riskRating: option?.value || '', page: 1 })}
              placeholder="Risk Rating"
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <SignalTable
              $filter={$clientsFilter}
              $view={$clientsView}
              headers={headers}
              rows={rows}
              totalCount={$clients.value.totalCount}
              currentPage={$clientsFilter.value.page}
              itemsPerPageAmount={10}
            />
          </Col>
        </Row>
      </Container>

      <AddClientModal />
      <EditClientModal />
      <ViewClientModal />
      <DeleteClientModal />
    </>
  );
};

export default Clients;
