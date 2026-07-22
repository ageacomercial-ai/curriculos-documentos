(function () {
  var PREFIX = 'chave_';

  var KEYS = {
    PROFILE: PREFIX + 'profile',
    DOCS: PREFIX + 'docs',
    ACTIVE_DOC: PREFIX + 'active_doc',
    PAYMENT: PREFIX + 'payment',
    SETTINGS: PREFIX + 'settings'
  };

  function get(key) {
    try { return JSON.parse(localStorage.getItem(key)) || null; }
    catch (e) { return null; }
  }

  function set(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  }

  function remove(key) {
    localStorage.removeItem(key);
  }

  function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  }

  function timeAgo(dateStr) {
    var now = new Date();
    var d = new Date(dateStr);
    var diff = Math.floor((now - d) / 1000);
    if (diff < 10) return 'agora';
    if (diff < 60) return 'há ' + diff + 's';
    var min = Math.floor(diff / 60);
    if (min < 60) return 'há ' + min + 'min';
    var h = Math.floor(min / 60);
    if (h < 24) return 'há ' + h + 'h';
    return 'há ' + Math.floor(h / 24) + 'd';
  }

  function formatDate(dateStr) {
    var d = new Date(dateStr);
    var meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    return d.getDate() + ' ' + meses[d.getMonth()] + ' ' + d.getFullYear();
  }

  function migrate() {
    if (!get(KEYS.PROFILE)) {
      var oldCV = get('curriculo_dados') || get(PREFIX + 'cv');
      if (oldCV) {
        var profile = {
          nome: oldCV.nome || '',
          cargo: oldCV.cargo || '',
          email: oldCV.email || '',
          telefone: oldCV.telefone || '',
          morada: oldCV.morada || '',
          social: oldCV.social || '',
          foto: oldCV.foto || '',
          resumo: oldCV.resumo || '',
          experiencias: oldCV.experiencias || [],
          formacoes: oldCV.formacoes || [],
          competencias: oldCV.competencias || [],
          idiomas: oldCV.idiomas || [],
          certificacoes: [],
          cursos: [],
          projetos: []
        };
        set(KEYS.PROFILE, profile);
        set(KEYS.ACTIVE_DOC, { id: 'cv-principal', type: 'cv', name: 'CV Principal', model: oldCV.modelo || 'classico', updatedAt: new Date().toISOString(), data: profile });
        var docs = [
          { id: 'cv-principal', type: 'cv', name: 'CV Principal', model: oldCV.modelo || 'classico', updatedAt: new Date().toISOString() }
        ];
        set(KEYS.DOCS, docs);
      }
    }
    // Clean old keys (incl. legacy payment system)
    ['curriculo_dados', 'documento_dados', 'documento_tipo', PREFIX + 'cv', PREFIX + 'doc', PREFIX + 'doc_type', PREFIX + 'payment'].forEach(function (k) {
      try { localStorage.removeItem(k); } catch (e) {}
    });
  }

  var Storage = {
    KEYS: KEYS,
    get: get,
    set: set,
    remove: remove,
    generateId: generateId,
    timeAgo: timeAgo,
    formatDate: formatDate,
    migrate: migrate,

    // ─── PERFIL CENTRAL ───

    getProfile: function () {
      return get(KEYS.PROFILE) || {
        nome: '', cargo: '', email: '', telefone: '', morada: '', social: '', foto: '', resumo: '',
        experiencias: [], formacoes: [], competencias: [], idiomas: [], certificacoes: [], cursos: [], projetos: []
      };
    },

    saveProfile: function (p) {
      set(KEYS.PROFILE, p);
    },

    profileCompletion: function () {
      var p = this.getProfile();
      var total = 0, done = 0;
      if (p.nome && p.nome.trim()) done++; total++;
      if (p.email && p.email.trim()) done++; total++;
      if (p.telefone && p.telefone.trim()) done++; total++;
      if (p.cargo && p.cargo.trim()) done++; total++;
      if (p.resumo && p.resumo.trim()) done++; total++;
      if (p.morada && p.morada.trim()) done++; total++;
      if ((p.experiencias || []).filter(function (e) { return e.cargo; }).length > 0) done++; total++;
      if ((p.formacoes || []).filter(function (f) { return f.curso; }).length > 0) done++; total++;
      if ((p.competencias || []).filter(function (s) { return s.nome; }).length > 0) done++; total++;
      if ((p.idiomas || []).filter(function (l) { return l.idioma; }).length > 0 && total) done++; total++;
      return { pct: Math.round((done / total) * 100), done: done, total: total };
    },

    getNome: function () {
      var p = this.getProfile();
      return p.nome || 'Utilizador';
    },

    // ─── DOCUMENTOS ───

    listDocs: function () {
      return get(KEYS.DOCS) || [];
    },

    saveDocList: function (list) {
      set(KEYS.DOCS, list);
    },

    getDocData: function (docId) {
      var all = get(PREFIX + 'docdata') || {};
      return all[docId] || null;
    },

    saveDocData: function (docId, data) {
      var all = get(PREFIX + 'docdata') || {};
      all[docId] = data;
      set(PREFIX + 'docdata', all);
    },

    removeDocData: function (docId) {
      var all = get(PREFIX + 'docdata') || {};
      delete all[docId];
      set(PREFIX + 'docdata', all);
    },

    createDoc: function (type, name, model) {
      var id = this.generateId();
      var now = new Date().toISOString();
      var docs = this.listDocs();
      docs.unshift({ id: id, type: type, name: name, model: model || 'classico', updatedAt: now });
      this.saveDocList(docs);
      return id;
    },

    updateDoc: function (id, updates) {
      var docs = this.listDocs();
      var found = false;
      docs.forEach(function (d) {
        if (d.id === id) {
          for (var k in updates) d[k] = updates[k];
          d.updatedAt = new Date().toISOString();
          found = true;
        }
      });
      if (found) this.saveDocList(docs);
      return found;
    },

    deleteDoc: function (id) {
      var docs = this.listDocs().filter(function (d) { return d.id !== id; });
      this.saveDocList(docs);
      this.removeDocData(id);
    },

    duplicateDoc: function (id) {
      var docs = this.listDocs();
      var orig = null;
      docs.forEach(function (d) { if (d.id === id) orig = d; });
      if (!orig) return null;
      var data = this.getDocData(id);
      var newId = this.generateId();
      var now = new Date().toISOString();
      docs.unshift({ id: newId, type: orig.type, name: orig.name + ' (cópia)', model: orig.model, updatedAt: now });
      this.saveDocList(docs);
      if (data) this.saveDocData(newId, JSON.parse(JSON.stringify(data)));
      return newId;
    },

    getActiveDoc: function () {
      return get(KEYS.ACTIVE_DOC) || null;
    },

    setActiveDoc: function (doc) {
      set(KEYS.ACTIVE_DOC, doc);
    },

    // ─── PLAN / PAYMENT ───

    isPaid: function () {
      var plan = localStorage.getItem('tf_plan');
      return plan && plan.trim() !== '';
    },

    getPayment: function () { return get(KEYS.PAYMENT); },
    clearPayment: function () { remove(KEYS.PAYMENT); }
  };

  window.Storage = Storage;
  Storage.migrate();
})();
