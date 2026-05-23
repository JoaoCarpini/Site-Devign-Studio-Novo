import { ServiceDetailPage } from '../../components/service-pages/ServiceDetailPage';
import { serviceMap } from '../../data/site';

export default function APIs() {
  return <ServiceDetailPage service={serviceMap.apis} />;
}
