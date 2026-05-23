import { ServiceDetailPage } from '../../components/service-pages/ServiceDetailPage';
import { serviceMap } from '../../data/site';

export default function Automation() {
  return <ServiceDetailPage service={serviceMap.automation} />;
}
