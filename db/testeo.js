const mysql = require('mysql2/promise');

// Database configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'vmstore'
};

// List of tables to check
const tables = [
  'Nueva',
  'afiliados',
  'auth',
  'boas_vindas',
  'categoria',
  'categoria_cc',
  'contatos',
  'gifts',
  'grupos',
  'notas',
  'pagamentos',
  'pagamentos_bot',
  'produtos',
  'store',
  'textos'
];

async function checkDatabaseConnection() {
  let connection;
  try {
    // Establish connection
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Database connection successful');

    // Check each table
    for (const table of tables) {
      try {
        // Try to select one row from each table
        const [rows] = await connection.execute(`SELECT COUNT(*) as count FROM ${table}`);
        console.log(`✅ Table ${table.padEnd(15)} - OK (${rows[0].count} records)`);
      } catch (error) {
        console.error(`❌ Error checking table ${table}:`, error.message);
      }
    }

  } catch (error) {
    console.error('❌ Database connection error:', error.message);
  } finally {
    if (connection) {
      await connection.end();
      console.log('\n📝 Connection closed');
    }
  }
}

// Run the check
console.log('🔍 Starting database check...\n');
checkDatabaseConnection();
