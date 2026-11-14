// Menú para celulares
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

menuBtn.addEventListener("click", () => {
  menu.classList.toggle("abierto");
});

menu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => menu.classList.remove("abierto"));
});

// Animación de la terminal (Typed.js)
const comando = document.getElementById("comando");

if (comando && typeof Typed !== "undefined") {
  new Typed("#comando", {
    strings: [
      "nmap -sV objetivo.com",
      "sudo apt install seguridad",
      "curl cyberruta.com/cursos",
      "chmod +x aprender.sh",
    ],
    typeSpeed: 60,
    backSpeed: 30,
    backDelay: 1800,
    loop: true,
  });
}

// Animaciones al hacer scroll (Animate.css)
const elementosAnimados = document.querySelectorAll("[data-anim]");

const observador = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        const animacion = entrada.target.dataset.anim;
        entrada.target.classList.add("animate__animated", `animate__${animacion}`);
        observador.unobserve(entrada.target);
      }
    });
  },
  { threshold: 0.15 }
);

elementosAnimados.forEach((el, i) => {
  el.style.setProperty("--animate-delay", `${(i % 3) * 0.12}s`);
  observador.observe(el);
});

// Chat de prueba (CyberBot)
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatLog = document.getElementById("chatLog");

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const texto = chatInput.value.trim();
  if (!texto) return;

  // Mensaje del usuario
  const mensajeUsuario = document.createElement("div");
  mensajeUsuario.className = "msg user";
  mensajeUsuario.textContent = texto;
  chatLog.appendChild(mensajeUsuario);

  chatInput.value = "";
  chatLog.scrollTop = chatLog.scrollHeight;

  // Respuesta simulada del bot
  setTimeout(() => {
    const respuesta = document.createElement("div");
    respuesta.className = "msg bot";
    respuesta.textContent =
      "Gracias por escribir. Pronto te conectaremos con un asesor por WhatsApp. Mientras tanto, revisa nuestros cursos arriba.";
    chatLog.appendChild(respuesta);
    chatLog.scrollTop = chatLog.scrollHeight;
  }, 800);
});