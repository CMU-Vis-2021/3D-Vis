// https://observablehq.com/@cmudig/duckdb@821
export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["duckdb_wasm.svg",new URL("./files/0ae4731de23b95622ee7cbb3895db25ceff764201b7a627b86663391a8b0fa874fb3de58170a8eab5fb7b18a2110df48fe4798060ceebbc5011b7c67183b73db",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["FileAttachment","db","md"], async function(FileAttachment,db,md){return(
md`# DuckDB in WebAssembly

<img src="${await FileAttachment("duckdb_wasm.svg").url()}" height="100">

Welcome to [DuckDB](https://duckdb.org/) running in your browser with [WebAssembly](https://webassembly.org/).
To use it, import an initialized DuckDB and the DuckDB library into your notebook.

\`\`\`js
import {db, duckdb} from '@cmudig/duckdb'
\`\`\`

You can then start running queries on the \`db\`. For example:

\`\`\`js
result = {
  const conn = await db.connect();
  const result = await conn.query(query);
  await conn.close();
  return result;
}
\`\`\`

A query result is an [Apache Arrow Table](https://arrow.apache.org/docs/js/classes/table.html).

The current version of DuckDB Web is ${await db.getVersion()}. We use the [\`@duckdb/duckdb-wasm\` NPM package](https://www.npmjs.com/package/@duckdb/duckdb-wasm).

## Observable Client

We provide a convenient database client for Observable: \`DuckDBClient\`. You can learn more about the client at [the documentation page](/@cmudig/duckdb-client).

\`\`\`js
import {DuckDBClient} from '@cmudig/duckdb'
\`\`\`

## Introduction to SQL

We published [an introduction to SQL with DuckDB](/@cmudig/introducing-sql-with-duckdb) running entirely in your browser.

## Peeking into the GAIA Star Catalog

To see DuckDB-wasm in action, check out [this notebook](/@cmudig/peeking-into-the-gaia-star-catalog) where we explore data from millions of stars.`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---`
)});
  main.variable(observer("duckdb")).define("duckdb", function(){return(
import("https://unpkg.com/@duckdb/duckdb-wasm@1.11.1-dev54.0/dist/duckdb-browser.mjs?module")
)});
  main.variable(observer("libraryVersion")).define("libraryVersion", ["duckdb"], function(duckdb){return(
duckdb.PACKAGE_VERSION
)});
  main.variable(observer("packageName")).define("packageName", function(){return(
'@duckdb/duckdb-wasm'
)});
  main.variable(observer("bundles")).define("bundles", ["duckdb"], function(duckdb){return(
duckdb.getJsDelivrBundles()
)});
  main.variable(observer("bundle")).define("bundle", ["duckdb","bundles"], function(duckdb,bundles){return(
duckdb.selectBundle(bundles)
)});
  main.variable(observer("makeDB")).define("makeDB", ["duckdb","bundle"], function(duckdb,bundle){return(
async function makeDB() {
  const logger = new duckdb.ConsoleLogger();
  const worker = await duckdb.createWorker(bundle.mainWorker);
  const db = new duckdb.AsyncDuckDB(logger, worker);
  await db.instantiate(bundle.mainModule);
  return db
}
)});
  main.variable(observer("db")).define("db", ["makeDB"], function(makeDB){return(
makeDB()
)});
  main.variable(observer()).define(["db"], function(db){return(
db.getVersion()
)});
  main.variable(observer("DuckDBClient")).define("DuckDBClient", ["makeDB","Inputs","element","text"], function(makeDB,Inputs,element,text){return(
class DuckDBClient {
  constructor(_db) {
    this._db = _db;
    this._counter = 0;
  }

  async db() {
    if (!this._db) {
      this._db = await makeDB();
    }
    return this._db;
  }

  async connection() {
    if (!this._conn) {
      const db = await this.db();
      this._conn = await db.connect();
    }
    return this._conn;
  }

  async reconnect() {
    if (this._conn) {
      this._conn.close();
    }
    delete this._conn;
  }
  
  async query(query, params) {
    const key = `Query ${this._counter++}: ${query}`;
    console.time(key)
    const conn = await this.connection();
    const result = await conn.query(query);
    console.timeEnd(key)
    return result;
  }

  async table(query, params, opts) {
    const result = await this.query(query, params);
    return Inputs.table(result, {layout: 'auto', ...(opts || {})});
  }

  // get the client after the query ran
  async client(query, params) {
    await this.query(query, params);
    return this;
  }

  // query a single row
  async queryRow(query, params) {
    const key = `Query ${this._counter++}: ${query}`;
    console.time(key)
    const conn = await this.connection();
    // use sendQuery as we can stop iterating after we get the first batch
    // XXX we cannot expose the async iterator of arrow today
    const result = await conn.query(query);
    console.timeEnd(key)
    return result.chunks[0].get(0);
  }
  
  async explain(query, params) {
    const row = await this.queryRow(`EXPLAIN ${query}`, params);
    return element("pre", {className: "observablehq--inspect"}, [
      text(row["explain_value"])
    ]);
  }

  // describe the database (no arg) or a table
  async describe(object) {
    const result = await (object === undefined
      ? this.query(`PRAGMA show_tables`)
      : this.query(`PRAGMA table_info('${object}')`));
    return Inputs.table(result)
  }

  // summzarize a query result
  async summarize(query) {
    const result = await this.query(`SUMMARIZE ${query}`);
    return Inputs.table(result)
  }

  async insertJSON(name, buffer, options) {
    const db = await this.db();
    await db.registerFileBuffer(name, new Uint8Array(buffer))
    const conn = await db.connect();
    await conn.insertJSONFromPath(name, {name, schema: 'main', ...options});
    await conn.close();
  }

  async insertCSV(name, buffer, options) {
    const db = await this.db();
    await db.registerFileBuffer(name, new Uint8Array(buffer))
    const conn = await db.connect();
    await conn.insertCSVFromPath(name, {name, schema: 'main', ...options});
    await conn.close();
  }
  
  // Create a database from FileArrachments
  static async of(files=[]) {
    const db = await makeDB();

    const toName = (file) => file.name.split('.').slice(0, -1).join('.')

    if (files.constructor.name === 'FileAttachment') {
      files = [[toName(files), files]];
    } else if (!Array.isArray(files)) {
      files = Object.entries(files);
    }

    // Add all files to the database. Import JSON and CSV. Create view for Parquet.
    await Promise.all(files.map(async (entry) => {
      let file, name;
      
      if (Array.isArray(entry)) {
        [name, file] = entry;
      } else {
        [name, file] = [toName(entry), entry];
      }
      
      // const buffer = await file.arrayBuffer();
      // await db.registerFileBuffer(file.name, new Uint8Array(buffer));

      const url = await file.url();
      await db.registerFileURL(file.name, url);

      const conn = await db.connect();
      if (file.name.endsWith('.csv')) {
        await conn.insertCSVFromPath(file.name, {name, schema: 'main'});
      } else if (file.name.endsWith('.json')) {
        await conn.insertJSONFromPath(file.name, {name, schema: 'main'});
      } else if (file.name.endsWith('.parquet')) {
        await conn.query(`CREATE VIEW '${name}' AS SELECT * FROM parquet_scan('${file.name}')`);
      } else {
        console.warn(`Don't know how to handle file type of ${file.name}`);
      }
      await conn.close();
    }));

    return new DuckDBClient(db);
  }
}
)});
  main.variable(observer("element")).define("element", function(){return(
function element(name, props, children) {
  if (arguments.length === 2) children = props, props = undefined;
  const element = document.createElement(name);
  if (props !== undefined) for (const p in props) element[p] = props[p];
  if (children !== undefined) for (const c of children) element.appendChild(c);
  return element;
}
)});
  main.variable(observer("text")).define("text", function(){return(
function text(value) {
  return document.createTextNode(value);
}
)});
  main.variable(observer()).define(["db"], async function(db)
{
  const conn = await db.connect();
  const result = await conn.query(`	SELECT
			v::INTEGER AS x,
			(sin(v/50.0) * 100 + 100)::INTEGER AS y
			FROM generate_series(0, 100) AS t(v)`);
  await conn.close();
  return result;
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`## Test Query

Just to make sure that we can connect to the database. `
)});
  main.variable(observer()).define(["db","Inputs"], async function(db,Inputs)
{
  const conn = await db.connect();
  const result = await conn.query(`SELECT 1 AS 'Result'
UNION SELECT 2
UNION SELECT 3`);
  await conn.close();
  return Inputs.table(result);
}
);
  return main;
}
