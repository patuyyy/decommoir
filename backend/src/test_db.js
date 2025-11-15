const pool = require('./lib/db.pg.js'); // ganti dengan nama file pool.js kamu

async function testConnection() {
  try {
    const res = await pool.query('SELECT NOW()S');
    console.log('✅ Koneksi PostgreSQL berhasil!');
    console.log('Waktu server:', res.rows[0].s);
  } catch (err) {
    console.error('❌ Koneksi gagal:', err);
  } finally {
    await pool.end();
  }
}

testConnection();
