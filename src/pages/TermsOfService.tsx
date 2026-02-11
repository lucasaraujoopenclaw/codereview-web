import { Link } from "react-router-dom";
import { ArrowLeft, FileText } from "lucide-react";

export function TermsOfService() {
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
              <FileText className="h-6 w-6 text-brand" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Termos de Uso</h1>
              <p className="text-sm text-gray-400">QualityGate</p>
            </div>
          </div>

          <div className="space-y-6 text-gray-300">
            <section>
              <p className="text-sm text-gray-400 mb-6">
                <strong>Data de vigência:</strong> 11 de fevereiro de 2026
              </p>
              <p>
                Estes Termos de Uso ("Termos") regem o acesso e uso da plataforma <strong>QualityGate</strong> ("Serviço", 
                "plataforma" ou "nós"). Ao acessar ou utilizar o QualityGate, você ("Usuário" ou "você") concorda em 
                cumprir estes Termos. Se você não concordar com alguma parte destes Termos, não utilize o Serviço.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">1. Descrição do Serviço</h2>
              <p>
                O QualityGate é uma plataforma de code review automatizado com inteligência artificial que analisa 
                repositórios e pull requests do GitHub. O serviço fornece:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                <li>Análise automatizada de código-fonte</li>
                <li>Sugestões de melhorias e identificação de problemas</li>
                <li>Dashboard com métricas e estatísticas de qualidade</li>
                <li>Integração com repositórios GitHub</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">2. Elegibilidade e Requisitos</h2>
              <p className="mb-2">Para utilizar o QualityGate, você deve:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Possuir uma conta ativa do Google para autenticação</li>
                <li>Possuir uma conta do GitHub com repositórios para análise</li>
                <li>Ter idade mínima de 18 anos ou consentimento de responsável legal</li>
                <li>Fornecer informações precisas e completas durante o cadastro</li>
                <li>Não estar proibido de utilizar o serviço por lei ou decisão judicial</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">3. Conta e Autenticação</h2>
              <p className="mb-2">
                Ao criar uma conta no QualityGate:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Você é responsável por manter a segurança da sua conta Google e GitHub</li>
                <li>Você é responsável por todas as atividades realizadas através da sua conta</li>
                <li>Você deve notificar-nos imediatamente sobre qualquer uso não autorizado da sua conta</li>
                <li>Não é permitido compartilhar credenciais de acesso com terceiros</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">4. Responsabilidades do Usuário</h2>
              <p className="mb-2">Ao utilizar o QualityGate, você concorda em:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Usar o serviço apenas para fins legais e de acordo com estes Termos</li>
                <li>Não tentar acessar, modificar ou interferir nos sistemas ou dados da plataforma</li>
                <li>Não utilizar o serviço para transmitir código malicioso, vírus ou qualquer conteúdo prejudicial</li>
                <li>Não fazer engenharia reversa, descompilar ou tentar extrair o código-fonte da plataforma</li>
                <li>Não utilizar o serviço de forma que possa sobrecarregar ou danificar nossa infraestrutura</li>
                <li>Respeitar os direitos de propriedade intelectual de terceiros</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">5. Propriedade Intelectual</h2>
              
              <h3 className="text-lg font-medium text-gray-200 mt-4 mb-2">5.1 Seu Código</h3>
              <p>
                Você mantém todos os direitos de propriedade intelectual sobre o código-fonte que submete para análise. 
                O QualityGate não reivindica propriedade sobre seu código.
              </p>

              <h3 className="text-lg font-medium text-gray-200 mt-4 mb-2">5.2 Nossa Plataforma</h3>
              <p>
                Todo o conteúdo, recursos, funcionalidades, design e implementação do QualityGate são de propriedade 
                exclusiva da plataforma e estão protegidos por leis de propriedade intelectual.
              </p>

              <h3 className="text-lg font-medium text-gray-200 mt-4 mb-2">5.3 Licença de Uso</h3>
              <p>
                Ao submeter código para análise, você concede ao QualityGate uma licença limitada, não exclusiva e 
                temporária para processar, analisar e gerar relatórios sobre o código, exclusivamente para fornecer 
                o serviço contratado.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">6. Uso da Inteligência Artificial</h2>
              <p className="mb-2">
                O QualityGate utiliza modelos de inteligência artificial de terceiros (OpenAI e Anthropic) para análise 
                de código. É importante compreender que:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>
                  <strong>As análises são sugestões:</strong> Os reviews gerados pela IA são recomendações e não garantias 
                  de correção ou qualidade
                </li>
                <li>
                  <strong>Não substituem revisão humana:</strong> A análise automatizada não substitui a revisão por 
                  desenvolvedores experientes
                </li>
                <li>
                  <strong>Possibilidade de erros:</strong> A IA pode ocasionalmente produzir resultados imprecisos ou 
                  inadequados
                </li>
                <li>
                  <strong>Responsabilidade final:</strong> Você é o único responsável por decidir quais sugestões 
                  implementar no seu código
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">7. Disponibilidade do Serviço</h2>
              <p className="mb-2">
                Embora nos esforcemos para manter o QualityGate disponível continuamente:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Não garantimos disponibilidade ininterrupta ou livre de erros (uptime)</li>
                <li>Podemos realizar manutenções programadas ou emergenciais que temporariamente interrompam o serviço</li>
                <li>Não nos responsabilizamos por perdas decorrentes de indisponibilidade temporária</li>
                <li>Reservamos o direito de modificar, suspender ou descontinuar funcionalidades a qualquer momento</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">8. Limitação de Responsabilidade</h2>
              <p className="mb-3">
                Na extensão máxima permitida pela lei aplicável:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>
                  O serviço é fornecido "como está" e "conforme disponível", sem garantias de qualquer tipo, 
                  expressas ou implícitas
                </li>
                <li>
                  Não nos responsabilizamos por danos diretos, indiretos, incidentais, especiais ou consequenciais 
                  resultantes do uso ou incapacidade de usar o serviço
                </li>
                <li>
                  Não garantimos que o serviço atenderá suas necessidades específicas ou que será livre de erros, 
                  seguro ou ininterrupto
                </li>
                <li>
                  Não nos responsabilizamos por decisões tomadas com base nas análises geradas pela IA
                </li>
                <li>
                  Você é o único responsável pela implementação de backups e proteção do seu código
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">9. Indenização</h2>
              <p>
                Você concorda em indenizar e isentar o QualityGate, seus desenvolvedores, parceiros e afiliados de 
                quaisquer reclamações, danos, obrigações, perdas, responsabilidades, custos ou dívidas resultantes de:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                <li>Seu uso do serviço em violação destes Termos</li>
                <li>Violação de direitos de terceiros, incluindo propriedade intelectual</li>
                <li>Qualquer conteúdo que você submeta à plataforma</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">10. Cancelamento e Exclusão de Conta</h2>
              
              <h3 className="text-lg font-medium text-gray-200 mt-4 mb-2">10.1 Cancelamento pelo Usuário</h3>
              <p>
                Você pode cancelar sua conta a qualquer momento através das configurações da plataforma ou enviando 
                solicitação para <a href="mailto:contato@qualitygate.space" className="text-brand hover:underline">contato@qualitygate.space</a>. 
                A exclusão da conta resultará na remoção permanente de todos os seus dados no prazo de 30 dias.
              </p>

              <h3 className="text-lg font-medium text-gray-200 mt-4 mb-2">10.2 Suspensão pelo QualityGate</h3>
              <p>
                Reservamos o direito de suspender ou encerrar sua conta, a nosso critério, se você violar estes Termos 
                ou se determinarmos que seu uso do serviço é prejudicial à plataforma ou a outros usuários.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">11. Modificações nos Termos</h2>
              <p>
                Podemos modificar estes Termos de Uso a qualquer momento. Notificaremos você sobre mudanças significativas 
                através do e-mail cadastrado ou por meio de aviso na plataforma. O uso continuado do serviço após as 
                alterações constitui aceitação dos novos Termos. Se você não concordar com as mudanças, deverá encerrar 
                sua conta.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">12. Lei Aplicável e Resolução de Disputas</h2>
              <p>
                Estes Termos serão regidos e interpretados de acordo com as leis do Brasil. Quaisquer disputas 
                relacionadas a estes Termos ou ao uso do serviço serão resolvidas preferencialmente por negociação 
                amigável. Caso não haja resolução, o foro competente será o da comarca da sede do QualityGate.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">13. Disposições Gerais</h2>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>
                  <strong>Integralidade:</strong> Estes Termos constituem o acordo completo entre você e o QualityGate
                </li>
                <li>
                  <strong>Divisibilidade:</strong> Se qualquer disposição destes Termos for considerada inválida, 
                  as demais permanecem em vigor
                </li>
                <li>
                  <strong>Renúncia:</strong> A não aplicação de qualquer direito não constitui renúncia a esse direito
                </li>
                <li>
                  <strong>Cessão:</strong> Você não pode transferir seus direitos sob estes Termos sem nosso consentimento
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">14. Contato</h2>
              <p>
                Para questões, dúvidas ou solicitações relacionadas a estes Termos de Uso, entre em contato:
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
                Ao utilizar o QualityGate, você confirma que leu, compreendeu e concorda com estes Termos de Uso.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
