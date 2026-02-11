import { Link } from "react-router-dom";
import { ArrowLeft, Shield } from "lucide-react";

export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-200 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para o Login
        </Link>

        <div className="card">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand/20">
              <Shield className="h-6 w-6 text-brand" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Política de Privacidade</h1>
              <p className="text-sm text-gray-400">QualityGate</p>
            </div>
          </div>

          <div className="space-y-6 text-gray-300">
            <section>
              <p className="text-sm text-gray-400 mb-6">
                <strong>Data de vigência:</strong> 11 de fevereiro de 2026
              </p>
              <p>
                Esta Política de Privacidade descreve como o <strong>QualityGate</strong> ("nós", "nosso" ou "serviço") 
                coleta, usa, armazena e protege suas informações pessoais ao utilizar nossa plataforma de code review 
                automatizado com IA.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">1. Dados Coletados</h2>
              <p className="mb-3">Coletamos as seguintes informações quando você utiliza o QualityGate:</p>
              
              <h3 className="text-lg font-medium text-gray-200 mt-4 mb-2">1.1 Dados do Google OAuth</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Endereço de e-mail</li>
                <li>Nome completo</li>
                <li>Foto de perfil (avatar)</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-200 mt-4 mb-2">1.2 Dados do GitHub</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Repositórios vinculados à sua conta</li>
                <li>Pull requests (PRs) e suas informações (título, descrição, arquivos alterados)</li>
                <li>Código-fonte dos repositórios analisados</li>
                <li>Metadados de commits e histórico de versões</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-200 mt-4 mb-2">1.3 Dados de Uso</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Logs de acesso e interações com a plataforma</li>
                <li>Preferências de configuração</li>
                <li>Histórico de reviews solicitados</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">2. Como Utilizamos Seus Dados</h2>
              <p className="mb-2">Utilizamos as informações coletadas para:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Autenticar e identificar você na plataforma</li>
                <li>Realizar análise automatizada de code review nos seus repositórios e pull requests</li>
                <li>Exibir informações no dashboard e interface do usuário</li>
                <li>Gerar relatórios e estatísticas sobre a qualidade do código</li>
                <li>Melhorar nosso serviço e experiência do usuário</li>
                <li>Comunicar atualizações importantes sobre o serviço</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">3. Armazenamento de Dados</h2>
              <p className="mb-2">Seus dados são armazenados com as seguintes características:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Banco de dados:</strong> PostgreSQL hospedado na plataforma Railway</li>
                <li><strong>Localização:</strong> Servidores localizados nos Estados Unidos</li>
                <li><strong>Segurança:</strong> Utilizamos criptografia em trânsito (HTTPS/TLS) e boas práticas de segurança</li>
                <li><strong>Backup:</strong> Realizamos backups regulares para garantir a integridade dos dados</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">4. Compartilhamento com Terceiros</h2>
              <p className="mb-3">
                Para fornecer a funcionalidade de code review automatizado com IA, compartilhamos trechos do seu código 
                com os seguintes provedores de serviços de inteligência artificial:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>OpenAI:</strong> Para análise de código e geração de sugestões de melhoria</li>
                <li><strong>Anthropic:</strong> Para análise de código e geração de sugestões de melhoria</li>
              </ul>
              <p className="mt-3">
                <strong>Importante:</strong> O código enviado para análise é processado conforme as políticas de privacidade 
                desses provedores. Não vendemos, alugamos ou compartilhamos seus dados pessoais para fins de marketing ou 
                publicidade com terceiros.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">5. Cookies e Armazenamento Local</h2>
              <p className="mb-2">Utilizamos os seguintes mecanismos de armazenamento:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>
                  <strong>JSON Web Token (JWT):</strong> Armazenado no localStorage do navegador para manter sua sessão 
                  autenticada
                </li>
                <li>
                  <strong>Cookies funcionais:</strong> Utilizados para garantir o funcionamento adequado da autenticação 
                  via Google OAuth
                </li>
              </ul>
              <p className="mt-3">
                Não utilizamos cookies de rastreamento de terceiros para fins publicitários.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">6. Seus Direitos</h2>
              <p className="mb-2">Você tem os seguintes direitos em relação aos seus dados pessoais:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Acesso:</strong> Solicitar acesso aos dados que mantemos sobre você</li>
                <li><strong>Correção:</strong> Solicitar a correção de dados incorretos ou desatualizados</li>
                <li><strong>Exclusão:</strong> Solicitar a exclusão permanente da sua conta e dados associados</li>
                <li>
                  <strong>Portabilidade:</strong> Solicitar uma cópia dos seus dados em formato estruturado e legível por máquina
                </li>
                <li><strong>Revogação de consentimento:</strong> Revogar o acesso aos seus repositórios GitHub a qualquer momento</li>
              </ul>
              <p className="mt-3">
                Para exercer qualquer um desses direitos, entre em contato conosco através do e-mail:{" "}
                <a href="mailto:contato@qualitygate.space" className="text-brand hover:underline">
                  contato@qualitygate.space
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">7. Retenção de Dados</h2>
              <p>
                Mantemos seus dados pessoais pelo tempo necessário para fornecer nossos serviços. Quando você solicitar a 
                exclusão da sua conta, removeremos permanentemente todos os dados associados no prazo de 30 dias, exceto 
                quando a retenção for exigida por lei.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">8. Segurança</h2>
              <p>
                Implementamos medidas técnicas e organizacionais adequadas para proteger seus dados contra acesso não autorizado, 
                alteração, divulgação ou destruição. No entanto, nenhum método de transmissão pela internet ou armazenamento 
                eletrônico é 100% seguro, e não podemos garantir segurança absoluta.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">9. Alterações nesta Política</h2>
              <p>
                Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre mudanças significativas 
                através do e-mail cadastrado ou por meio de aviso destacado em nossa plataforma. A data de vigência no topo 
                deste documento indica quando a política foi atualizada pela última vez.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">10. Contato</h2>
              <p>
                Se você tiver dúvidas, preocupações ou solicitações relacionadas a esta Política de Privacidade, entre em 
                contato conosco:
              </p>
              <p className="mt-3">
                <strong>E-mail:</strong>{" "}
                <a href="mailto:contato@qualitygate.space" className="text-brand hover:underline">
                  contato@qualitygate.space
                </a>
              </p>
              <p className="mt-2">
                <strong>Website:</strong>{" "}
                <a href="https://qualitygate.space" className="text-brand hover:underline" target="_blank" rel="noopener noreferrer">
                  https://qualitygate.space
                </a>
              </p>
            </section>

            <section className="pt-6 border-t border-gray-800">
              <p className="text-sm text-gray-500 text-center">
                Ao utilizar o QualityGate, você concorda com os termos desta Política de Privacidade.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
