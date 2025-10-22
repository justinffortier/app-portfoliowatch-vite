import { $clients, $clientsView, $clientsFilter, $clientsForm } from '@src/signals';
import { clientsMock } from '@src/api/mocks/clients.mocks';

export const fetchClients = async () => {
  try {
    $clientsView.update({ isTableLoading: true });

    await new Promise((resolve) => setTimeout(resolve, 500));

    let filteredClients = [...clientsMock];

    const { searchTerm, clientType, kycStatus, riskRating } = $clientsFilter.value;

    if (searchTerm) {
      filteredClients = filteredClients.filter(
        (client) => client.name.toLowerCase().includes(searchTerm.toLowerCase())
          || client.email.toLowerCase().includes(searchTerm.toLowerCase())
          || client.client_id.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (clientType) {
      filteredClients = filteredClients.filter((client) => client.client_type === clientType);
    }

    if (kycStatus) {
      filteredClients = filteredClients.filter((client) => client.kyc_status === kycStatus);
    }

    if (riskRating) {
      filteredClients = filteredClients.filter((client) => client.client_risk_rating === riskRating);
    }

    $clients.update({
      list: filteredClients,
      totalCount: filteredClients.length,
    });
  } catch (error) {
    console.error('Error fetching clients:', error);
  } finally {
    $clientsView.update({ isTableLoading: false });
  }
};

export const handleAddClient = async () => {
  try {
    const formData = $clientsForm.value;

    await new Promise((resolve) => setTimeout(resolve, 500));

    const newClient = {
      ...formData,
      id: `${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    $clients.update({
      list: [...$clients.value.list, newClient],
      totalCount: $clients.value.totalCount + 1,
    });

    $clientsView.update({ showAddModal: false });
    $clientsForm.reset();

    await fetchClients();
  } catch (error) {
    console.error('Error adding client:', error);
  }
};

export const handleEditClient = async () => {
  try {
    const formData = $clientsForm.value;

    await new Promise((resolve) => setTimeout(resolve, 500));

    const updatedClient = {
      ...formData,
      updated_at: new Date().toISOString(),
    };

    const updatedList = $clients.value.list.map((client) => (client.id === formData.id ? updatedClient : client));

    $clients.update({
      list: updatedList,
    });

    $clientsView.update({ showEditModal: false });
    $clientsForm.reset();

    await fetchClients();
  } catch (error) {
    console.error('Error editing client:', error);
  }
};

export const handleDeleteClient = async (clientId) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const updatedList = $clients.value.list.filter((client) => client.id !== clientId);

    $clients.update({
      list: updatedList,
      totalCount: $clients.value.totalCount - 1,
    });

    $clientsView.update({ showDeleteModal: false });

    await fetchClients();
  } catch (error) {
    console.error('Error deleting client:', error);
  }
};
