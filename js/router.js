const Router = {
  routes: {},
  current: null,

  register(name, { render, title, onLeave, onRender }) {
    this.routes[name] = { render, title, onLeave, onRender };
  },

  _parseParams(name) {
    const idx = name.indexOf('?');
    if (idx === -1) return { route: name, params: {} };
    const qs = name.slice(idx + 1);
    const params = {};
    qs.split('&').forEach(pair => {
      const [k, v] = pair.split('=').map(decodeURIComponent);
      params[k] = v;
    });
    return { route: name.slice(0, idx), params };
  },

  getParams() {
    return this._params || {};
  },

  async go(name, params) {
    const { route: cleanName, params: parsedParams } = this._parseParams(name);
    if (this.current && this.routes[this.current]?.onLeave) {
      this.routes[this.current].onLeave();
    }
    this.current = cleanName;
    this._params = { ...parsedParams, ...(params || {}) };
    const route = this.routes[cleanName];
    if (!route) return;
    document.getElementById('app-title').textContent = route.title || (window.CONFIG ? CONFIG.brand.name : 'Tá Feito');
    const content = document.getElementById('app-content');
    content.innerHTML = '';
    const el = await route.render(this._params);
    if (typeof el === 'string') {
      content.innerHTML = el;
    } else {
      content.appendChild(el);
    }
    content.scrollTop = 0;
    if (route.onRender) {
      setTimeout(function () { route.onRender(); }, 50);
    }
    if (window.atualizarNav) {
      setTimeout(function () { window.atualizarNav(cleanName); }, 10);
    }
  }
};
