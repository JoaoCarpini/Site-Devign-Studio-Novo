import { ServiceDetailPage } from '../../components/service-pages/ServiceDetailPage';
import { useService } from '../../hooks/useContent';

export default function Automation() {
  return <ServiceDetailPage service={useService('automation')} />;
}
