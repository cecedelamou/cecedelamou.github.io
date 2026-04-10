document.addEventListener("DOMContentLoaded", () => {
      const shell = document.querySelector("#shell");
      const pills = document.querySelectorAll(".pill");
      const sections = document.querySelectorAll("section[data-section]");
      const EMAIL = "delamou.cece.cherif.x1@f.mail.nagoya-u.ac.jp"; 

      // 1. Initial animation
      requestAnimationFrame(() => document.body.classList.add("ready"));

      // 2. Navigation Tracking
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if(entry.isIntersecting){
            const id = entry.target.getAttribute("data-section");
            pills.forEach(p => p.classList.toggle("active", p.dataset.goto === id));
            entry.target.classList.add("inView");
          }
        });
      }, { root: shell, threshold: 0.5 });
      sections.forEach(s => obs.observe(s));

      // 3. Smooth Jump Links
      document.querySelectorAll("[data-jump]").forEach(a => {
        a.addEventListener("click", (e) => {
          e.preventDefault();
          const target = document.getElementById(a.dataset.jump);
          if(target) target.scrollIntoView({ behavior:"smooth" });
        });
      });

      // 4. Beautiful Toast Integrated Copy Email
      const toast = document.getElementById("toast");
      
      const showToast = (msg) => {
        if(!toast) return;
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 3000);
      };

      const handleCopyEmail = async () => {
        try {
          await navigator.clipboard.writeText(EMAIL);
          showToast();
        } catch (err) {
          console.error("Failed to copy!", err);
        }
      };

      // Attaching to all potential copy buttons (robust)
      document.querySelectorAll("#copyEmail").forEach(btn => {
        btn.addEventListener("click", handleCopyEmail);
      });

      // 5. Command Palette (Logic placeholder)
      const modal = document.querySelector("#modal");
      window.onkeydown = (e) => { 
        if((e.metaKey || e.ctrlKey) && e.key === 'k') { 
          e.preventDefault(); 
          modal?.classList.add("open"); 
        } 
      };
      window.onclick = (e) => { if(e.target === modal) modal.classList.remove("open"); };
    });
