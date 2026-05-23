import { ServiceDetailPage } from '../../components/service-pages/ServiceDetailPage';
import { serviceMap } from '../../data/site';

export default function WebDevelopment() {
  return <ServiceDetailPage service={serviceMap['web-development']} />;
}
