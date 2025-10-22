/* eslint-disable implicit-arrow-linebreak */
import { Outlet, Navigate } from 'react-router-dom';
import { $global } from '@src/signals';
import ContentWrapper from '../ContentWrapper';

const PrivateRoutes = () =>
// if (!$global.value.isSignedIn && !$global.value.isLoading) {
//   return <Navigate to={`/?redirect=${window.location.pathname}`} />;
// }
(
  <ContentWrapper fluid>
    <Outlet />
  </ContentWrapper>
);
export default PrivateRoutes;
