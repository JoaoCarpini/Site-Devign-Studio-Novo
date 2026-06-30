import { ServiceDetailPage } from '../../components/service-pages/ServiceDetailPage';
import { useService } from '../../hooks/useContent';

export default function APIs() {
  return <ServiceDetailPage service={useService('apis')} />;
}
