const Router = {
  routes: {},
  current: null,

  register(name, { render, title, onLeave, onRender }) {
    this.routes[name] = { render, title, onLeave, onRender };
  },

  async go(name, params) {
    if (this.current && this.routes[this.current]?.onLeave) {
      this.routes[this.current].onLeave();
    }
    this.current = name;
    const route = this.routes[name];
    if (!route) return;
    document.getElementById('app-title').textContent = route.title || 'Chave';
    const content = document.getElementById('app-content');
    content.innerHTML = '';
    const el = await route.render(params);
    if (typeof el === 'string') {
      content.innerHTML = el;
    } else {
      content.appendChild(el);
    }
    content.scrollTop = 0;
    const backBtn = document.getElementById('btn-back');
    backBtn.style.display = name === 'home' ? 'none' : 'flex';
    if (route.onRender) {
      setTimeout(function () { route.onRender(); }, 50);
    }
    if (window.atualizarNav) {
      setTimeout(function () { window.atualizarNav(name); }, 10);
    }
  }
};
