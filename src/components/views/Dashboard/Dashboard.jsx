import { useEffectAsync } from '@fyclabs/tools-fyc-react/utils';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faMoneyBillWave,
  faExclamationTriangle,
  faChartLine,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { $dashboard } from '@src/signals';
import { formatCurrency } from '@src/utils/formatCurrency';
import { clientsMock } from '@src/api/mocks/clients.mocks';
import { loansMock } from '@src/api/mocks/loans.mocks';

const Dashboard = () => {
  useEffectAsync(async () => {
    $dashboard.update({ isLoading: true });

    await new Promise((resolve) => setTimeout(resolve, 500));

    const activeLoans = loansMock.filter((loan) => loan.status === 'Active');
    const portfolioValue = activeLoans.reduce((sum, loan) => sum + parseFloat(loan.loan_amount), 0);
    const atRiskLoans = loansMock.filter((loan) => loan.status === 'Default' || loan.status === 'Restructured');

    $dashboard.update({
      metrics: {
        totalClients: clientsMock.length,
        activeLoans: activeLoans.length,
        portfolioValue,
        atRiskLoans: atRiskLoans.length,
      },
      isLoading: false,
    });
  });

  const { metrics } = $dashboard.value;

  return (
    <Container fluid className="py-24">
      <h2 className="mb-24">Dashboard</h2>

      <Row className="mb-32">
        <Col lg={3} md={6} className="mb-16">
          <Card className="h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <Card.Title className="text-dark-300 mb-8">Total Clients</Card.Title>
                  <h3 className="mb-0">{metrics.totalClients}</h3>
                </div>
                <FontAwesomeIcon icon={faUsers} size="2x" className="text-primary" />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={3} md={6} className="mb-16">
          <Card className="h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <Card.Title className="text-dark-300 mb-8">Active Loans</Card.Title>
                  <h3 className="mb-0">{metrics.activeLoans}</h3>
                </div>
                <FontAwesomeIcon icon={faMoneyBillWave} size="2x" className="text-success" />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={3} md={6} className="mb-16">
          <Card className="h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <Card.Title className="text-dark-300 mb-8">Portfolio Value</Card.Title>
                  <h3 className="mb-0">{formatCurrency(metrics.portfolioValue)}</h3>
                </div>
                <FontAwesomeIcon icon={faChartLine} size="2x" className="text-info" />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={3} md={6} className="mb-16">
          <Card className="h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <Card.Title className="text-dark-300 mb-8">At-Risk Loans</Card.Title>
                  <h3 className="mb-0">{metrics.atRiskLoans}</h3>
                </div>
                <FontAwesomeIcon icon={faExclamationTriangle} size="2x" className="text-danger" />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-24">
        <Col md={12}>
          <Card>
            <Card.Body>
              <Card.Title className="mb-16">Quick Actions</Card.Title>
              <div className="d-flex gap-16">
                <Button as={Link} to="/clients" variant="primary">
                  <FontAwesomeIcon icon={faPlus} className="me-8" />
                  Add Client
                </Button>
                <Button as={Link} to="/loans" variant="success">
                  <FontAwesomeIcon icon={faPlus} className="me-8" />
                  Create Loan
                </Button>
                <Button as={Link} to="/reports" variant="info">
                  <FontAwesomeIcon icon={faChartLine} className="me-8" />
                  Generate Report
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={6} className="mb-16">
          <Card>
            <Card.Body>
              <Card.Title className="mb-16">Recent Activity</Card.Title>
              <p className="text-dark-300">No recent activity to display</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} className="mb-16">
          <Card>
            <Card.Body>
              <Card.Title className="mb-16">Upcoming Tasks</Card.Title>
              <p className="text-dark-300">No upcoming tasks</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
