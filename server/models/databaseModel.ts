import { Pool } from 'pg';

// TODO: hide db password
const PG_URI = 'postgresql://postgres:Haris185\$@db.rvxkoohfusyuxlfaclrc.supabase.co:5432/postgres';
// const PG_URI = 'postgresql://postgres:DfuI6ToEuN3eHHOY@db.ndjbnotdwdyqgpafgkgd.supabase.co:5432/postgres'; // Will's DB


const pool = new Pool({
    connectionString: PG_URI
});

export default {
    query: (text: string, params) => {
        console.log('executed query', text);
        return pool.query(text, params);
    }
};