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

// CHAT CONECTADO IA REAL (Backend local)
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatLog = document.getElementById("chatLog");

if (chatForm) {
  chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const texto = chatInput.value.trim();
    if (!texto) return;

    // Mostrar mensaje del usuario
    const mensajeUsuario = document.createElement("div");
    mensajeUsuario.className = "msg user";
    mensajeUsuario.textContent = texto;
    chatLog.appendChild(mensajeUsuario);

    chatInput.value = "";
    chatInput.disabled = true; // Bloquea input mientras piensa
    chatLog.scrollTop = chatLog.scrollHeight;

    // Mostrar mensaje de "Escribiendo..."
    const escribiendo = document.createElement("div");
    escribiendo.className = "msg bot";
    escribiendo.textContent = "CyberBot está pensando...";
    chatLog.appendChild(escribiendo);
    chatLog.scrollTop = chatLog.scrollHeight;

    try {
      // petición a nuestro servidor en Node.js
      const respuesta = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mensaje: texto }),
      });

      const datos = await respuesta.json();
      
      // Validación para evitar burbujas vacías
      if (datos && datos.respuesta && datos.respuesta.trim() !== "") {
        escribiendo.textContent = datos.respuesta;
      } else {
        escribiendo.textContent = "Lo siento, no pude procesar tu mensaje. Intenta de nuevo.";
        escribiendo.style.color = "#ff4c4c"; // Color rojo
      }

    } catch (error) {
      console.error("Error al conectar con la IA:", error);
      escribiendo.textContent = "Error de conexión. Asegúrate de que el servidor esté encendido.";
      escribiendo.style.color = "#ff4c4c"; // Color rojo para el error
    } finally {
      chatInput.disabled = false; // Volver a activar el input
      chatInput.focus(); // Poner el cursor en la cajita otra vez
      chatLog.scrollTop = chatLog.scrollHeight;
    }
  });
}

// Envío del formulario de contacto (Web3Forms)
const formContacto = document.getElementById("formularioContacto");

if (formContacto) {
  formContacto.addEventListener("submit", async (e) => {
    e.preventDefault();
    const btnEnviar = document.getElementById("btnEnviar");
    const mensajeEstado = document.getElementById("mensajeEstado");

    btnEnviar.textContent = "Enviando...";
    btnEnviar.disabled = true;

    const datos = new FormData(formContacto);

    try {
      const respuesta = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: datos,
      });

      const resultado = await respuesta.json();

      if (resultado.success) {
        mensajeEstado.textContent = "¡Mensaje enviado con éxito! Te contactaremos pronto.";
        mensajeEstado.style.color = "#00ff9c"; // Verde neón
        formContacto.reset(); // Limpia los campos
      } else {
        mensajeEstado.textContent = "Hubo un error. Intenta de nuevo.";
        mensajeEstado.style.color = "#ff4c4c"; // Rojo
      }
    } catch (error) {
      mensajeEstado.textContent = "Error de conexión. Revisa tu internet.";
      mensajeEstado.style.color = "#ff4c4c";
    } finally {
      btnEnviar.textContent = "Enviar mensaje";
      btnEnviar.disabled = false;
    }
  });
}