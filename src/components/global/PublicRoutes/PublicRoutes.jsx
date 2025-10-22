import { Navigate, Outlet } from 'react-router-dom';
import { $global } from '@src/signals';
import ContentWrapper from '../ContentWrapper';

const PublicRoutes = () => {
  if ($global.value.isSignedIn && !$global.value.isLoading) {
    return <Navigate to={`/?redirect=${window.location.pathname}`} />;
  }
  return (
    <ContentWrapper>
      <Outlet />
    </ContentWrapper>
  );
};

export default PublicRoutes;
