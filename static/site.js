(() => {
  const toast = (text) => {
    let el = document.getElementById('copyToast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'copyToast';
      el.style.cssText = 'position:fixed;left:50%;bottom:22px;transform:translateX(-50%);background:#0b0b0b;color:#fff;font-size:12px;padding:8px 14px;z-index:50;opacity:0;transition:opacity .16s';
      document.body.appendChild(el);
    }
    el.textContent = text;
    el.style.opacity = '1';
    clearTimeout(el._timer);
    el._timer = setTimeout(() => { el.style.opacity = '0'; }, 1600);
  };

  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      const area = document.createElement('textarea');
      area.value = text;
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      let ok = false;
      try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
      document.body.removeChild(area);
      return ok;
    }
  };

  document.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const target = document.querySelector(btn.getAttribute('data-copy'));
      if (!target) return;
      const ok = await copyText(target.textContent.trim());
      toast(ok ? '已复制' : '复制失败，请手动选择');
    });
  });
})();
