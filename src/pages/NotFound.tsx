import { ArrowLeft } from 'lucide-react';
import { ButtonLink } from '../components/ui/Button';

export default function NotFound() {
  return (
    <section className="container-premium flex min-h-[72vh] items-center pt-32">
      <div className="max-w-2xl">
        <span className="eyebrow mb-6">404</span>
        <h1 className="heading-xl">Página não encontrada.</h1>
        <p className="body-lead mt-6">A rota solicitada não existe ou foi movida dentro da arquitetura do site.</p>
        <ButtonLink to="/" className="mt-8">
          <ArrowLeft className="h-4 w-4" />
          Voltar para Home
        </ButtonLink>
      </div>
    </section>
  );
}
