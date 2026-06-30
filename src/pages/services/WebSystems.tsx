import { ServiceDetailPage } from '../../components/service-pages/ServiceDetailPage';
import { useService } from '../../hooks/useContent';

export default function WebSystems() {
  return <ServiceDetailPage service={useService('web-systems')} />;
}
