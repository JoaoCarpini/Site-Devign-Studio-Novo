import { ServiceDetailPage } from '../../components/service-pages/ServiceDetailPage';
import { useService } from '../../hooks/useContent';

export default function WebDevelopment() {
  return <ServiceDetailPage service={useService('web-development')} />;
}
