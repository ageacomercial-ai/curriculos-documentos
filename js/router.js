const Router = {
  routes: {},
  current: null,

  register(name, { render, title, onLeave }) {
    this.routes[name] = { render, title, onLeave };
  },

  async go(name, params) {
    if (this.current && this.routes[this.current]?.onLeave) {
      this.routes[this.current].onLeave();
    }
    this.current = name;
    const route = this.routes[name];
    if (!route) return;
    document.getElementById('app-title').textContent = route.title || 'Currículos & Documentos';
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
  }
};
