(function () {
  const config = window.PORTAL_CONFIG || { useDemoData: true };
  let supabaseClient = null;

  function isConfigured() {
    return Boolean(
      config.supabaseUrl &&
      config.supabaseAnonKey &&
      !config.supabaseUrl.includes("YOUR-PROJECT") &&
      !config.supabaseAnonKey.includes("YOUR-SUPABASE")
    );
  }

  function backendMode() {
    if (config.useDemoData || !isConfigured()) return "demo";
    return "supabase";
  }

  async function loadSupabaseLibrary() {
    if (window.supabase) return window.supabase;

    await new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });

    return window.supabase;
  }

  async function getClient() {
    if (backendMode() === "demo") return null;
    if (supabaseClient) return supabaseClient;

    const supabaseLibrary = await loadSupabaseLibrary();
    supabaseClient = supabaseLibrary.createClient(config.supabaseUrl, config.supabaseAnonKey);
    return supabaseClient;
  }

  async function signInWithEmail(email, password) {
    const client = await getClient();
    if (!client) return { demo: true };
    return client.auth.signInWithPassword({ email, password });
  }

  async function signUpWithEmail(email, password, role) {
    const client = await getClient();
    if (!client) return { demo: true };
    return client.auth.signUp({
      email,
      password,
      options: {
        data: { role }
      }
    });
  }

  async function getPortalData() {
    const client = await getClient();
    if (!client) return { demo: true };

    // These calls are protected by the database row-level security policies in
    // database/supabase-schema.sql. Landlords and renters receive different rows.
    const [properties, tenants, payments, maintenanceRequests, applications, documents] = await Promise.all([
      client.from("properties").select("*"),
      client.from("tenancies").select("*"),
      client.from("rent_payments").select("*"),
      client.from("maintenance_requests").select("*"),
      client.from("rental_applications").select("*"),
      client.from("legal_documents").select("*")
    ]);

    return { properties, tenants, payments, maintenanceRequests, applications, documents };
  }

  async function createMaintenanceRequest(request) {
    const client = await getClient();
    if (!client) return { demo: true };
    return client.from("maintenance_requests").insert(request).select().single();
  }

  async function recordRentPayment(payment) {
    const client = await getClient();
    if (!client) return { demo: true };
    return client.from("rent_payments").insert(payment).select().single();
  }

  window.PortalBackend = {
    backendMode,
    createMaintenanceRequest,
    getPortalData,
    recordRentPayment,
    signInWithEmail,
    signUpWithEmail
  };
})();
