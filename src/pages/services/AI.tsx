import { ServiceDetailPage } from '../../components/service-pages/ServiceDetailPage';
import { serviceMap } from '../../data/site';

export default function AI() {
  return <ServiceDetailPage service={serviceMap.ai} />;
}
