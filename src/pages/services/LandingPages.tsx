import { ServiceDetailPage } from '../../components/service-pages/ServiceDetailPage';
import { serviceMap } from '../../data/site';

export default function LandingPages() {
  return <ServiceDetailPage service={serviceMap['landing-pages']} />;
}
