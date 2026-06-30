import { ServiceDetailPage } from '../../components/service-pages/ServiceDetailPage';
import { useService } from '../../hooks/useContent';

export default function Integrations() {
  return <ServiceDetailPage service={useService('integrations')} />;
}
