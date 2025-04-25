import { Pool } from 'pg';

const PG_URI = 'postgresql://postgres:DfuI6ToEuN3eHHOY@db.ndjbnotdwdyqgpafgkgd.supabase.co:5432/postgres';

const pool = new Pool({
    connectionString: PG_URI
});

export default {
    query: (text, params, callback) => {
        console.log('executed query', text);
        return pool.query(text, params, callback);
    }
};