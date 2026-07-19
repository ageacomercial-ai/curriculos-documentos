(function () {
  const STORAGE_PREFIX = 'chave_';

  const KEYS = {
    CV: STORAGE_PREFIX + 'cv',
    CV_LIST: STORAGE_PREFIX + 'cv_list',
    DOC: STORAGE_PREFIX + 'doc',
    DOC_TYPE: STORAGE_PREFIX + 'doc_type',
    PAYMENT: STORAGE_PREFIX + 'payment',
    SETTINGS: STORAGE_PREFIX + 'settings'
  };

  function get(key) {
    try { return JSON.parse(localStorage.getItem(key)) || null; }
    catch { return null; }
  }

  function set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function remove(key) {
    localStorage.removeItem(key);
  }

  // Migrate old keys to new prefix
  function migrate() {
    const oldCV = localStorage.getItem('curriculo_dados');
    if (oldCV && !localStorage.getItem(KEYS.CV)) {
      localStorage.setItem(KEYS.CV, oldCV);
    }
    const oldDoc = localStorage.getItem('documento_dados');
    if (oldDoc && !localStorage.getItem(KEYS.DOC)) {
      localStorage.setItem(KEYS.DOC, oldDoc);
    }
    const oldDocType = localStorage.getItem('documento_tipo');
    if (oldDocType && !localStorage.getItem(KEYS.DOC_TYPE)) {
      localStorage.setItem(KEYS.DOC_TYPE, oldDocType);
    }
  }

  const Storage = {
    KEYS: KEYS,
    get: get,
    set: set,
    remove: remove,
    migrate: migrate,

    // CV-specific
    loadCV: function () { return get(KEYS.CV) || {}; },
    saveCV: function (d) { set(KEYS.CV, d); },
    listCVs: function () { return get(KEYS.CV_LIST) || []; },
    saveCVList: function (list) { set(KEYS.CV_LIST, list); },

    // Doc-specific
    loadDoc: function () { return get(KEYS.DOC) || {}; },
    saveDoc: function (d) { set(KEYS.DOC, d); },
    getDocType: function () { return get(KEYS.DOC_TYPE) || ''; },
    setDocType: function (t) { set(KEYS.DOC_TYPE, t); },

    // Payment
    isPaid: function () {
      const p = get(KEYS.PAYMENT);
      return p && p.confirmed === true;
    },
    setPaid: function (ref) {
      set(KEYS.PAYMENT, { ref: ref, confirmed: true, date: new Date().toISOString() });
    },
    getPayment: function () { return get(KEYS.PAYMENT); },
    clearPayment: function () { remove(KEYS.PAYMENT); }
  };

  window.Storage = Storage;
  Storage.migrate();
})();
