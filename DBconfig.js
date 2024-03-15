import pkg from "pg";


const { Pool } = pkg;

const itemsPool = new Pool({
  connectionString:'postgres://newtodo_user:wm6WE4CeQOfVItqjjJiivH1pF8vgSlBP@dpg-cnq1tf21hbls738iifsg-a.oregon-postgres.render.com/newtodo',
   
  ssl: {
    rejectUnauthorized: false,
  },
});

export default itemsPool;
