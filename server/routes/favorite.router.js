const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// return all favorite images
router.get('/', (req, res) => {
  const userId = req.query.userId;
  const queryText = `
    SELECT favorites.*, categories.name AS category_name
    FROM favorites
    LEFT JOIN categories
    ON favorites.category_id = categories.id
    WHERE favorites.user_id = $1
  `;
  const values = [userId];
  pool.query(queryText, values)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(`Error on query ${error}`);
      res.sendStatus(500);
    });
});
// router.get('/', (req, res) => {
//   const userId = req.query.userId; // assumes the user ID is passed as a query parameter
//   const queryText = `SELECT * FROM favorites WHERE user_id = $1`;
//   const values = [userId];
//   pool.query(queryText, values)
//     .then((result) => {
//       res.send(result.rows);
//     })
//     .catch((error) => {
//       console.log(`Error on query ${error}`);
//       res.sendStatus(500);
//     });
// });

// add a new favorite
router.post('/', (req, res) => {
  const queryText = `INSERT INTO favorites ("url") VALUES ($1);`;
  pool.query(queryText, [req.body]).then((result) => {
    res.sendStatus(200);
  }).catch(error => {
    console.log(`Error in POST /favorites: ${error}`);
    res.sendStatus(500);
  })
  
});

// update given favorite with a category id
router.put('/:favId', (req, res) => {
  const favId = req.params.favId;
  const categoryId = req.body.category_id;
  const validateCategoryQuery = `SELECT * FROM categories WHERE id = $1`;
  pool.query(validateCategoryQuery, [categoryId])
    .then((result) => {
      if (result.rows.length === 0) {
        res.status(400).send('Invalid category ID');
        return;
      }
      const updateFavoriteQuery = `UPDATE favorites SET category_id = $1 WHERE id = $2`;
      const values = [categoryId, favId];
      pool.query(updateFavoriteQuery, values)
        .then((result) => {
          res.sendStatus(200);
        })
        .catch((error) => {
          console.log(`Error on query ${error}`);
          res.sendStatus(500);
        });
    })
    .catch((error) => {
      console.log(`Error on query ${error}`);
      res.sendStatus(500);
    });
});


// delete a favorite
router.delete('/', (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
