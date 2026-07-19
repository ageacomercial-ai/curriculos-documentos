function escDoc(s) {
  if (s == null) return '';
  const d = document.createElement('div');
  d.textContent = String(s);
  return d.innerHTML;
}

function formatarData(d) {
  if (!d) return '';
  const partes = d.split('-');
  if (partes.length !== 3) return d;
  const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  return `${parseInt(partes[2])} de ${meses[parseInt(partes[1]) - 1]} de ${partes[0]}`;
}

function docHeader(titulo) {
  return `<div class="doc-header"><h1>${escDoc(titulo)}</h1></div>`;
}

function docFooter(local, data) {
  return `<div class="doc-footer"><p>${escDoc(local || '')}, ${formatarData(data) || '______'}</p></div>`;
}

function docSignature() {
  return `<div class="doc-signature"><div class="sig-line"></div><span>Assinatura</span></div>`;
}

function renderDeclaracaoResidencia(d) {
  return `<div class="documento declaracao-residencia">
    ${docHeader('DECLARAÇÃO DE RESIDÊNCIA')}
    <div class="doc-body">
      <p>Eu, <strong>${escDoc(d.declarante || '________________________')}</strong>, portador do BI/Passaporte nº <strong>${escDoc(d.bi || '________________________')}</strong>, declaro para os devidos efeitos que:</p>
      <p>Resido na morada <strong>${escDoc(d.morada || '________________________')}</strong> há aproximadamente <strong>${escDoc(d.tempo || '____')}</strong>.</p>
      ${d.finalidade ? `<p>A presente declaração destina-se a <strong>${escDoc(d.finalidade)}</strong>.</p>` : ''}
      <p>Por ser verdade e me ter sido solicitada, firmo a presente declaração.</p>
    </div>
    ${docFooter(d.local, d.data)}
    ${docSignature()}
  </div>`;
}

function renderDeclaracaoTrabalho(d) {
  return `<div class="documento declaracao-trabalho">
    ${docHeader('DECLARAÇÃO DE TRABALHO')}
    <div class="doc-body">
      <p>Declara-se para os devidos efeitos que <strong>${escDoc(d.funcionario || '________________________')}</strong>, portador do BI nº <strong>${escDoc(d.bi || '________________________')}</strong>, exerce o cargo de <strong>${escDoc(d.cargo || '________________________')}</strong> nesta empresa, <strong>${escDoc(d.empresa || '________________________')}</strong>, desde <strong>${escDoc(d.admissao || '________________________')}</strong>.</p>
      ${d.salario ? `<p>O seu salário atual é de <strong>${escDoc(d.salario)}</strong>.</p>` : ''}
      ${d.finalidade ? `<p>A presente declaração destina-se a <strong>${escDoc(d.finalidade)}</strong>.</p>` : ''}
      <p>Por ser verdade e nos ter sido solicitada, firmamos a presente declaração.</p>
    </div>
    ${docFooter(d.local, d.data)}
    ${docSignature()}
  </div>`;
}

function renderCartaApresentacao(d) {
  return `<div class="documento carta-apresentacao">
    <div class="doc-carta-header">
      <p class="doc-local-data">${escDoc(d.local || '')}, ${formatarData(d.data) || '______'}</p>
    </div>
    <div class="doc-body">
      ${d.destinatario ? `<p class="doc-destinatario">Exmo(a). Sr(a). <strong>${escDoc(d.destinatario)}</strong></p>` : ''}
      ${d.cargo ? `<p class="doc-assunto"><strong>Assunto:</strong> Candidatura ao cargo de ${escDoc(d.cargo)}</p>` : ''}
      <div class="doc-carta-corpo">
        ${escDoc(d.corpo || '________________________')}
      </div>
      <p>Atenciosamente,</p>
    </div>
    <div class="doc-signature-name">
      <p><strong>${escDoc(d.remetente || '________________________')}</strong></p>
      ${d.contacto ? `<p class="doc-contacto">${escDoc(d.contacto)}</p>` : ''}
    </div>
    ${docSignature()}
  </div>`;
}

function renderCartaRecomendacao(d) {
  return `<div class="documento carta-recomendacao">
    ${docHeader('CARTA DE RECOMENDAÇÃO')}
    <div class="doc-body">
      <p>Eu, <strong>${escDoc(d.recomendador || '________________________')}</strong>, ${d.cargo_rec ? `<strong>${escDoc(d.cargo_rec)}</strong>,` : ''} venho por meio desta recomendar <strong>${escDoc(d.recomendado || '________________________')}</strong>.</p>
      ${d.relacao ? `<p>A minha relação com ${escDoc(d.recomendado)} é de <strong>${escDoc(d.relacao)}</strong>.</p>` : ''}
      ${d.qualidades ? `<p>Durante o período em que trabalhei com ${escDoc(d.recomendado)}, destaco as seguintes qualidades:</p><div class="doc-qualidades">${escDoc(d.qualidades)}</div>` : ''}
      <p>Sem mais assunto, subscrevo-me.</p>
    </div>
    ${docFooter(d.local, d.data)}
    <div class="doc-signature-name">
      <p><strong>${escDoc(d.recomendador || '________________________')}</strong></p>
      ${d.contacto_rec ? `<p class="doc-contacto">${escDoc(d.contacto_rec)}</p>` : ''}
    </div>
    ${docSignature()}
  </div>`;
}

function renderContratoServicos(d) {
  return `<div class="documento contrato-servicos">
    ${docHeader('CONTRATO DE PRESTAÇÃO DE SERVIÇOS')}
    <div class="doc-body">
      <p>Entre as partes:</p>
      <p><strong>PRESTADOR:</strong> ${escDoc(d.prestador || '________________________')}, ${d.prestador_bi ? `BI/NIF ${escDoc(d.prestador_bi)}` : ''}</p>
      <p><strong>CONTRATANTE:</strong> ${escDoc(d.contratante || '________________________')}, ${d.contratante_bi ? `BI/NIF ${escDoc(d.contratante_bi)}` : ''}</p>
      <p>É celebrado o presente contrato de prestação de serviços, mediante as seguintes cláusulas:</p>
      <p><strong>1. Objeto:</strong> ${escDoc(d.objeto || '________________________')}</p>
      ${d.valor ? `<p><strong>2. Valor:</strong> ${escDoc(d.valor)}</p>` : '<p><strong>2. Valor:</strong> ________________________</p>'}
      ${d.prazo ? `<p><strong>3. Prazo:</strong> ${escDoc(d.prazo)}</p>` : '<p><strong>3. Prazo:</strong> ________________________</p>'}
      ${d.clausulas ? `<p><strong>4. Cláusulas adicionais:</strong></p><div class="doc-clausulas">${escDoc(d.clausulas)}</div>` : ''}
    </div>
    ${docFooter(d.local, d.data)}
    <div class="doc-assinaturas">
      <div class="doc-assinatura-col">
        <div class="sig-line"></div>
        <span>Prestador</span>
      </div>
      <div class="doc-assinatura-col">
        <div class="sig-line"></div>
        <span>Contratante</span>
      </div>
    </div>
  </div>`;
}

function renderRequerimento(d) {
  return `<div class="documento requerimento">
    ${docHeader('REQUERIMENTO')}
    <div class="doc-body">
      ${d.destinatario ? `<p>Exmo(a). Sr(a). <strong>${escDoc(d.destinatario)}</strong></p>` : ''}
      <p><strong>${escDoc(d.requerente || '________________________')}</strong>, ${d.bi ? `portador do BI nº ${escDoc(d.bi)},` : ''} vem requerer a V. Exª o seguinte:</p>
      ${d.assunto ? `<p><strong>Assunto:</strong> ${escDoc(d.assunto)}</p>` : ''}
      <div class="doc-requerimento-corpo">
        ${escDoc(d.corpo || '________________________')}
      </div>
      <p>Nestes termos,<br>Pede deferimento.</p>
    </div>
    ${docFooter(d.local, d.data)}
    ${docSignature()}
  </div>`;
}
