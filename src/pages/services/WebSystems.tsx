import { ServiceDetailPage } from '../../components/service-pages/ServiceDetailPage';
import { serviceMap } from '../../data/site';

export default function WebSystems() {
  return <ServiceDetailPage service={serviceMap['web-systems']} />;
}
