import { ServiceDetailPage } from '../../components/service-pages/ServiceDetailPage';
import { useService } from '../../hooks/useContent';

export default function AI() {
  return <ServiceDetailPage service={useService('ai')} />;
}
