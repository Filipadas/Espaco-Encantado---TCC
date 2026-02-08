(function() {
        const searchInput = document.querySelector('.nav-search input');
        const suggestions = document.getElementById('searchSuggestions');
        const overlay = document.getElementById('searchOverlay');
        const mockSuggestions = ['Brinquedos', 'Decorações', 'Kit de montagem', 'Festa infantil'];

        function openSearch() {
            suggestions.classList.add('active');
            overlay.classList.add('active');
            document.documentElement.style.overflow = 'hidden';
            document.body.style.overflow = 'hidden';
        }

        function closeSearch() {
            suggestions.classList.remove('active');
            overlay.classList.remove('active');
            searchInput.value = '';
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
        }

        function updateSuggestions(query) {
            if (!query.trim()) {
                suggestions.innerHTML = '';
                closeSearch();
                return;
            }

            const filtered = mockSuggestions.filter(s => s.toLowerCase().includes(query.toLowerCase()));
            
            if (filtered.length === 0) {
                suggestions.innerHTML = '<div style="padding:12px;color:#999;">Nenhum resultado encontrado</div>';
            } else {
                suggestions.innerHTML = filtered.map(s => `<div class="search-suggestions-item">${s}</div>`).join('');
            }
            openSearch();
        }

        searchInput.addEventListener('focus', openSearch);
        searchInput.addEventListener('input', (e) => updateSuggestions(e.target.value));
        searchInput.addEventListener('blur', () => {
            setTimeout(() => {
                const active = document.activeElement;
                if (!suggestions.contains(active) && active !== searchInput) closeSearch();
            }, 150);
        });

        suggestions.addEventListener('click', (e) => {
            const item = e.target.closest('.search-suggestions-item');
            if (item) {
                searchInput.value = item.textContent.trim();
                closeSearch();
            }
        });

        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeSearch(); });
        overlay.addEventListener('click', closeSearch);
    })();

    (function() {
        const container = document.querySelector('.decor-carousel');
        if (!container) return;

        const prev = document.querySelector('.carousel-nav.prev');
        const next = document.querySelector('.carousel-nav.next');
        const dotsWrap = document.querySelector('.carousel-dots');
        const slides = Array.from(container.querySelectorAll('.decor-slide'));

        slides.forEach((_, i) => {
            const d = document.createElement('button');
            d.className = 'carousel-dot';
            d.type = 'button';
            d.setAttribute('aria-label', 'Ir para o slide ' + (i+1));
            d.addEventListener('click', () => slides[i].scrollIntoView({behavior: 'smooth', inline: 'center'}));
            dotsWrap.appendChild(d);
        });

        const dots = Array.from(dotsWrap.children);

        function updateActive() {
            const cRect = container.getBoundingClientRect();
            let closest = 0, minDist = Infinity;
            slides.forEach((s, idx) => {
                const sRect = s.getBoundingClientRect();
                const dist = Math.abs((sRect.left + sRect.width/2) - (cRect.left + cRect.width/2));
                if (dist < minDist) { minDist = dist; closest = idx; }
            });
            dots.forEach((b, i) => b.classList.toggle('active', i === closest));
            container.setAttribute('data-index', closest);
        }

        function go(delta) {
            const idx = Number(container.getAttribute('data-index') || 0);
            const target = Math.max(0, Math.min(slides.length - 1, idx + delta));
            slides[target].scrollIntoView({behavior: 'smooth', inline: 'center'});
        }

        prev && prev.addEventListener('click', () => go(-1));
        next && next.addEventListener('click', () => go(1));
        container.addEventListener('keydown', (e) => { if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1); });

        let rafId = null;
        function onScroll() {
            if (rafId) cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => { updateActive(); rafId = null; });
        }

        container.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        slides[0].scrollIntoView({behavior: 'auto', inline: 'center'});
        updateActive();
    })();

    (function() {
        const navbar = document.querySelector('.navbar');
        let lastScrollY = 0;
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            navbar.classList.toggle('hidden', currentScrollY > lastScrollY + 100 && currentScrollY > 300);
            lastScrollY = currentScrollY;
        });
    })();