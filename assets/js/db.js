/* ================================================
   Intranet HPS — Camada de dados (Supabase)
   ================================================ */

const { createClient } = supabase;
const db = createClient(window.HPS_CONFIG.supabaseUrl, window.HPS_CONFIG.supabaseKey);

/* ---- Auth ---------------------------------------- */
const Auth = {
  async signIn(email, password) {
    const { data, error } = await db.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  },

  async signOut() {
    const { error } = await db.auth.signOut();
    if (error) throw error;
  },

  async getUser() {
    const { data: { user } } = await db.auth.getUser();
    return user;
  },

  async isAdmin() {
    const user = await Auth.getUser();
    if (!user) return false;
    return user.app_metadata?.role === 'admin';
  },

  onAuthChange(callback) {
    return db.auth.onAuthStateChange((_event, session) => {
      callback(session?.user || null);
    });
  }
};

/* ---- Setores ------------------------------------- */
const Sectors = {
  async list() {
    const { data, error } = await db
      .from('sectors')
      .select('*')
      .order('sort_order');
    if (error) throw error;
    return data;
  },

  async get(slug) {
    const { data, error } = await db
      .from('sectors')
      .select('*')
      .eq('slug', slug)
      .single();
    if (error) throw error;
    return data;
  },

  async update(id, fields) {
    const { data, error } = await db
      .from('sectors')
      .update(fields)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async create(fields) {
    const { data, error } = await db
      .from('sectors')
      .insert(fields)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async remove(id) {
    const { error } = await db.from('sectors').delete().eq('id', id);
    if (error) throw error;
  }
};

/* ---- Posts --------------------------------------- */
const Posts = {
  async list(sectorId) {
    const { data, error } = await db
      .from('posts')
      .select('*')
      .eq('sector_id', sectorId)
      .eq('published', true)
      .order('post_date', { ascending: false })
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async create(sectorId, fields) {
    const { data, error } = await db
      .from('posts')
      .insert({ sector_id: sectorId, ...fields })
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id, fields) {
    const { data, error } = await db
      .from('posts')
      .update(fields)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async remove(id) {
    const { error } = await db.from('posts').delete().eq('id', id);
    if (error) throw error;
  },

  subscribeToChanges(sectorId, callback) {
    return db
      .channel(`posts:${sectorId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'posts', filter: `sector_id=eq.${sectorId}` },
        callback
      )
      .subscribe();
  }
};

/* ---- Links --------------------------------------- */
const Links = {
  async list(sectorId) {
    const { data, error } = await db
      .from('links')
      .select('*')
      .eq('sector_id', sectorId)
      .order('sort_order');
    if (error) throw error;
    return data;
  },

  async create(sectorId, fields) {
    const { data, error } = await db
      .from('links')
      .insert({ sector_id: sectorId, ...fields })
      .select().single();
    if (error) throw error;
    return data;
  },

  async update(id, fields) {
    const { data, error } = await db
      .from('links')
      .update(fields).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },

  async remove(id) {
    const { error } = await db.from('links').delete().eq('id', id);
    if (error) throw error;
  }
};

/* ---- Extensões (ramais) -------------------------- */
const Extensions = {
  async list(sectorId) {
    const { data, error } = await db
      .from('extensions')
      .select('*')
      .eq('sector_id', sectorId)
      .order('sort_order');
    if (error) throw error;
    return data;
  },
  async create(sectorId, fields) {
    const { data, error } = await db.from('extensions').insert({ sector_id: sectorId, ...fields }).select().single();
    if (error) throw error;
    return data;
  },
  async update(id, fields) {
    const { data, error } = await db.from('extensions').update(fields).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },
  async remove(id) {
    const { error } = await db.from('extensions').delete().eq('id', id);
    if (error) throw error;
  }
};

/* ---- Documentos ---------------------------------- */
const Documents = {
  async list(sectorId) {
    const { data, error } = await db
      .from('documents')
      .select('*')
      .eq('sector_id', sectorId)
      .order('sort_order');
    if (error) throw error;
    return data;
  },
  async create(sectorId, fields) {
    const { data, error } = await db.from('documents').insert({ sector_id: sectorId, ...fields }).select().single();
    if (error) throw error;
    return data;
  },
  async update(id, fields) {
    const { data, error } = await db.from('documents').update(fields).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },
  async remove(id) {
    const { error } = await db.from('documents').delete().eq('id', id);
    if (error) throw error;
  },

  /* Storage helpers */
  async upload(sectorId, file) {
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const path = `${sectorId}/${Date.now()}-${safeName}`;
    const { error } = await db.storage.from('documentos').upload(path, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type || 'application/pdf'
    });
    if (error) throw error;
    return path;
  },

  getPublicUrl(path) {
    const { data } = db.storage.from('documentos').getPublicUrl(path);
    return data.publicUrl;
  },

  async deleteFile(path) {
    const { error } = await db.storage.from('documentos').remove([path]);
    if (error) throw error;
  }
};

/* ---- FAQs ---------------------------------------- */
const FAQs = {
  async list(sectorId) {
    const { data, error } = await db
      .from('faqs')
      .select('*')
      .eq('sector_id', sectorId)
      .order('sort_order');
    if (error) throw error;
    return data;
  },
  async create(sectorId, fields) {
    const { data, error } = await db.from('faqs').insert({ sector_id: sectorId, ...fields }).select().single();
    if (error) throw error;
    return data;
  },
  async update(id, fields) {
    const { data, error } = await db.from('faqs').update(fields).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },
  async remove(id) {
    const { error } = await db.from('faqs').delete().eq('id', id);
    if (error) throw error;
  }
};
