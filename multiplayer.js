(() => {
  // Replace both values with your Supabase information.
  const SUPABASE_URL = "PASTE_YOUR_PROJECT_URL_HERE";
  const SUPABASE_KEY = "PASTE_YOUR_PUBLISHABLE_KEY_HERE";

  function showStatus(message, color) {
    let status = document.getElementById("multiplayer-status");

    if (!status) {
      status = document.createElement("div");
      status.id = "multiplayer-status";

      Object.assign(status.style, {
        position: "fixed",
        top: "12px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: "99999",
        padding: "8px 14px",
        borderRadius: "8px",
        color: "white",
        fontFamily: "Arial, sans-serif",
        fontWeight: "bold",
        fontSize: "12px",
        letterSpacing: "1px"
      });

      document.body.appendChild(status);
    }

    status.textContent = message;
    status.style.background = color;
  }

  window.addEventListener("DOMContentLoaded", () => {
    if (!window.supabase) {
      showStatus("MULTIPLAYER LIBRARY MISSING", "#a83232");
      return;
    }

    if (
      SUPABASE_URL.includes("PASTE_") ||
      SUPABASE_KEY.includes("PASTE_")
    ) {
      showStatus("ADD SUPABASE SETTINGS", "#a86f16");
      return;
    }

    const client = window.supabase.createClient(
      SUPABASE_URL,
      SUPABASE_KEY
    );

    window.walkersSupabase = client;

    const testChannel = client.channel("walkers-connection-test");

    testChannel.subscribe((status) => {
      if (status === "SUBSCRIBED") {
        showStatus("ONLINE READY", "#287a45");
      }

      if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
        showStatus("MULTIPLAYER CONNECTION FAILED", "#a83232");
      }
    });

    window.addEventListener("beforeunload", () => {
      client.removeChannel(testChannel);
    });
  });
})();
https://hapnntzinjmqdoytvphn.supabase.co
sb_publishable_ByuHAeY_f6wPd_kDOMAcAA_OPEbWVoM