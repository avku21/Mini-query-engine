const MockDB = [
  {
    id: 1,
    model: "Toyota Camry",
    year: 2022,
    price: 26950
  },
  {
    id: 2,
    model: "Tesla Model 3",
    year: 2023,
    price: 40240
  },
  {
    id: 3,
    model: "Ford F-150",
    year: 2021,
    price: 32945
  },
  {
    id: 4,
    model: "Honda Civic",
    year: 2023,
    price: 23950
  },
  {
    id: 5,
    model: "BMW X5",
    year: 2022,
    price: 61750
  },
  {
    id: 6,
    model: "Jeep Wrangler",
    year: 2023,
    price: 32990
  },
  {
    id: 7,
    model: "Porsche 911",
    year: 2023,
    price: 107550
  },
  {
    id: 8,
    model: "Chevrolet Bolt EV",
    year: 2023,
    price: 26500
  }
];

const QUERY_PATTERNS = [
  {
      pattern: /(show|give|list).*(all|every).*car/i,
      sql: "SELECT * FROM MockDB"
  },
  {
      pattern: /(show|give|list).*cars?.*launched.*in.*(\d{4})/i,
      sql: "SELECT * FROM MockDB WHERE year = $2"
  },
  {
      pattern: /(show|give|list).*cars?.*from.*(\d{4})/i,
      sql: "SELECT * FROM MockDB WHERE year = $2"
  },
  {
      pattern: /(show|give|list).*cars?.*under.*\$?(\d+)/i,
      sql: "SELECT * FROM MockDB WHERE price < $2"
  },
  {
      pattern: /(show|give|list).*cars?.*over.*\$?(\d+)/i,
      sql: "SELECT * FROM MockDB WHERE price > $2"
  },
  {
      pattern: /(show|give|list).*models?/i,
      sql: "SELECT model FROM MockDB"
  }
];

export const processQuery = (req , res) => {
  console.log(req);
  try {
      const {query} = req.body;
      if(!query){
          return res.status(400).json({ error: "Query parameter is required" });
      }

      const sql = translateQuery(query);
      if (!sql) {
          return res.status(400).json({ error: "Could not understand your query" });
      }
      res.json({
          originalQuery: query,
          generatedSQL: sql,
      });

  } catch (error) {
      res.status(500).send("Internal Server Error")
  }
}

export const explainQuery = (req, res) => {
  console.log(req);
try {

    const { query } = req.body;
    
    if (!query) {
        return res.status(400).json({ error: "Query parameter is required" });
    }

    const sql = translateQuery(query);
    if (!sql) {
        return res.status(400).json({ error: "Could not understand your query" });
    }

    const results = executeQuery(sql);
    const explanation = getPatternExplanation(query);

    res.json({
        originalQuery: query,
        generatedSQL: sql,
        explanation: explanation,
        results: results
    });

} catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error processing your query" });
}
};

export const validateQuery = (req, res) => {
try {
    const { query } = req.body;
    
    if (!query) {
        return res.status(400).json({ error: "Query parameter is required" });
    }

    const isValid = QUERY_PATTERNS.some(pattern => 
        pattern.pattern.test(query.toLowerCase())
    );

    let sql = null;
    if (isValid) {
        sql = translateQuery(query);
    }

    res.json({
        valid: isValid,
        message: isValid ? "Valid query pattern" : "Unrecognized query format",
        sql: sql
    });

  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error validating query" });
}
};


function translateQuery(queryInput) {
const query = queryInput.toLowerCase();

for (const { pattern, sql } of QUERY_PATTERNS) {
    const match = query.match(pattern);
    if (match) {
        return sql.replace(/\$(\d+)/g, (_, index) => match[parseInt(index)]);
    }
}

return null;
}

function executeQuery(sql) {
const normalizedSQL = sql.toLowerCase();
let results = [...MockDB];

if (normalizedSQL.includes("select")) {
    if (!normalizedSQL.includes("select *")) {
        const columnsMatch = sql.match(/select\s+(.+?)\s+from/i);
        if (columnsMatch) {
            const columns = columnsMatch[1].split(',').map(col => col.trim());
            results = results.map(car => {
                const filteredCar = {};
                columns.forEach(col => {
                    if (car[col] !== undefined) {
                        filteredCar[col] = car[col];
                    }
                });
                return filteredCar;
            });
        }
    }


    if (normalizedSQL.includes("where")) {
        const whereClause = sql.split("where")[1].trim();
        
        if (whereClause.includes("year =")) {
            const year = parseInt(whereClause.match(/year\s*=\s*(\d+)/)[1]);
            results = results.filter(car => car.year === year);
        }
      
        if (whereClause.includes("price <")) {
            const price = parseInt(whereClause.match(/price\s*<\s*(\d+)/)[1]);
            results = results.filter(car => car.price < price);
        }
        else if (whereClause.includes("price >")) {
            const price = parseInt(whereClause.match(/price\s*>\s*(\d+)/)[1]);
            results = results.filter(car => car.price > price);
        }
    }
}

return results;
}

function getPatternExplanation(query) {
const queryLower = query.toLowerCase();

if (/(show|give|list).*(all|every).*car/i.test(queryLower)) {
    return "Showing all car records with complete details";
}
if (/(show|give|list).*cars?.*launched.*in.*\d{4}/i.test(queryLower)) {
    return "Showing cars by their model year";
}
if (/(show|give|list).*cars?.*from.*\d{4}/i.test(queryLower)) {
    return "Showing cars by their model year (alternative phrasing)";
}
if (/(show|give|list).*cars?.*under.*\$?\d+/i.test(queryLower)) {
    return "Showing cars below specified price";
}
if (/(show|give|list).*cars?.*over.*\$?\d+/i.test(queryLower)) {
    return "Showing cars above specified price";
}
if (/(show|give|list).*models?/i.test(queryLower)) {
    return "Listing only car model names";
}

return "Retrieving car information based on your query";
}