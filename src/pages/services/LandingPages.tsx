import { ServiceDetailPage } from '../../components/service-pages/ServiceDetailPage';
import { useService } from '../../hooks/useContent';

export default function LandingPages() {
  return <ServiceDetailPage service={useService('landing-pages')} />;
}
