import { ServiceDetailPage } from '../../components/service-pages/ServiceDetailPage';
import { serviceMap } from '../../data/site';

export default function Integrations() {
  return <ServiceDetailPage service={serviceMap.integrations} />;
}
