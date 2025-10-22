import { useEffect } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import UniversalModal from '@src/components/global/UniversalModal';
import UniversalInput from '@src/components/global/Inputs/UniversalInput';
import SelectInput from '@src/components/global/Inputs/SelectInput';
import { $clientsView, $clientsForm, $clients } from '@src/signals';
import { handleEditClient } from '../_helpers/clients.events';
import {
  clientTypeOptions,
  kycStatusOptions,
  riskRatingOptions,
} from '@src/api/mocks/clients.mocks';
import { relationshipManagersMock } from '@src/api/mocks/relationshipManagers.mocks';

const EditClientModal = () => {
  useEffect(() => {
    if ($clientsView.value.showEditModal && $clients.value.selectedClient) {
      $clientsForm.update($clients.value.selectedClient);
    }
  }, [$clientsView.value.showEditModal]);

  const managerOptions = relationshipManagersMock.map((m) => ({
    value: m.id,
    label: m.name,
  }));

  const modalBody = (
    <Form>
      <Row>
        <Col md={12} className="mb-16">
          <UniversalInput
            label="Name"
            type="text"
            value={$clientsForm.value.name}
            onChange={(e) => $clientsForm.update({ name: e.target.value })}
          />
        </Col>
      </Row>
      <Row>
        <Col md={6} className="mb-16">
          <UniversalInput
            label="Email"
            type="email"
            value={$clientsForm.value.email}
            onChange={(e) => $clientsForm.update({ email: e.target.value })}
          />
        </Col>
        <Col md={6} className="mb-16">
          <UniversalInput
            label="Phone"
            type="text"
            value={$clientsForm.value.phone_number}
            onChange={(e) => $clientsForm.update({ phone_number: e.target.value })}
          />
        </Col>
      </Row>
      <Row>
        <Col md={6} className="mb-16">
          <Form.Label>KYC Status</Form.Label>
          <SelectInput
            options={kycStatusOptions}
            value={$clientsForm.value.kyc_status}
            onChange={(option) => $clientsForm.update({ kyc_status: option?.value })}
          />
        </Col>
        <Col md={6} className="mb-16">
          <Form.Label>Risk Rating</Form.Label>
          <SelectInput
            options={riskRatingOptions}
            value={$clientsForm.value.client_risk_rating}
            onChange={(option) => $clientsForm.update({ client_risk_rating: option?.value })}
          />
        </Col>
      </Row>
    </Form>
  );

  return (
    <UniversalModal
      show={$clientsView.value.showEditModal}
      onHide={() => {
        $clientsView.update({ showEditModal: false });
        $clientsForm.reset();
      }}
      headerText="Edit Client"
      body={modalBody}
      leftBtnText="Cancel"
      rightBtnText="Save Changes"
      rightBtnOnClick={handleEditClient}
    />
  );
};

export default EditClientModal;
