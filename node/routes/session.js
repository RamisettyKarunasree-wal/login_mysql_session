const express = require('express');
const router = express.Router();
const fs = require('fs');
// router.get('/setSession', (req, res) => {
//   req.session['name'] = 'karunasree';
//   res.json('Session with name username,value as karunasree is set');
// });
router.post('/setFourCookie', (req, res) => {
  const obj = req.body;
  const keys = Object.keys(obj);
  keys.forEach((key) => {
    res.cookie(key, obj[key]);
  });
  res.json(`cookie with names ${keys} are set`);
});

const custommidleware = require('../middlewares/custommiddleware');
router.get('/setCookie/:name/:value', [
  custommidleware,
  (req, res) => {
    res.cookie(req.params.name, req.params.value);
    res.json(
      `cookie with name ${req.params.name} and value ${req.params.value} is set`
    );
  },
]);
router.get('/getCookies', (req, res) => {
  res.send(req.cookies);
});
// router.get('/getSession', (req, res) => {
//   res.send(req.session);
// });
router.get('/createFile', (req, res) => {
  fs.writeFile(
    'example.txt',
    'Creating a file and contents into the file',
    (err) => {
      if (err) {
        res.json(err);
      } else {
        res.send('created/modified the file successfully');
      }
    }
  );
});
router.get('/appendFile', (req, res) => {
  fs.appendFile(
    'example.txt',
    '\n adding new line one\n adding line two\n adding line three\n adding line four\n adding line five',
    (err) => {
      if (err) {
        res.json(err);
      } else {
        res.send('appended 5 line to the file');
      }
    }
  );
});
router.post('/setfourcookies', function (req, res) {
  let obj = req.body;
  console.log(obj);
  let keys = Object.keys(obj);
  let values = Object.values(obj);
  for (let i = 0; i <= keys.length; i++) {
    res.cookie(keys[i], values[i]);
  }
  res.send('four cookies set');
});

module.exports = router;
// router.get('/deleteFile/:filename', (req, res) => {
//   fs.unlink(req.params.filename, (err) => {
//     if (err) {
//       res.json(err);
//     } else {
//       res.send(`${req.params.filename} deleted successfully`);
//     }
//   });
// });
// router.get('/showAllFiles/:dir', (req, res) => {
//   fs.readdir(req.params.dir, (err, content) => {
//     if (err) {
//       res.json(err);
//     } else {
//       res.send(content);
//     }
//   });
// });
router.get('/deleteSession/:name', (req, res) => {
  const name = req.params.name;
  delete req.session[name];
  res.send(`deleted session with name ${name}`);
});
router.get('/deleteSession', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.json(err);
    } else {
      res.send('destroyed the session');
    }
  });
});
module.exports = router;
