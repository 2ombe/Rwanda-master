// // upload files
// const express = require('express');
// const multer = require('multer');
// const app = express();

// // Set up file storage for multer
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname);
//     }
// });

// // Initialize multer middleware
// const upload = multer({ storage });

// // Route for file and image upload
// app.post('/upload', upload.single('file'), (req, res) => {
//     // Do something with the file or image here
//     res.send('File or image uploaded and saved to server.');
// });

// app.listen(3000, () => {
//     console.log('Server running on port 3000.');
// });
// // upload multiple file
// const express = require('express')
// const multer = require('multer')
// const mongoose = require('mongoose')
// const router = express.Router()

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/')
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now())
//   }
// })

// const upload = multer({ storage: storage }).array('file')

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/mydatabase', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })

// router.post('/upload', function (req, res) {
//   upload(req, res, function (err) {
//     if (err instanceof multer.MulterError) {
//       return res.status(500).json(err)
//     } else if (err) {
//       return res.status(500).json(err)
//     }
//     return res.status(200).send(req.files)
//   })
// })

// module.exports = router

// // write me code to down load file with nodejs, express and react
//  import React, { useState } from 'react'

// function DownloadFile() {
//   const [fileName, setFileName] = useState('')

//   const handleDownload = () => {
//     window.open(`/download/${fileName}`)
//   }

//   return (
//     <div>
//       <input type="text" onChange={e => setFileName(e.target.value)} />
//       <button onClick={handleDownload}>Download</button>
//     </div>
//   )
// }

// export default DownloadFile
// //node
// const express = require('express')
// const router = express.Router()
// const path = require('path')

// router.get('/download/:fileName', (req, res) => {
//   const file = `uploads/${req.params.fileName}`
//   res.download(file)
// })

// module.exports = router

// // send message
//fotnts
// import React, { useState } from 'react';
// import { Form, Button } from 'react-bootstrap';

// const TextForm = () => {
//   const [text, setText] = useState('');
//   const [bold, setBold] = useState(false);
//   const [italic, setItalic] = useState(false);
//   const [underline, setUnderline] = useState(false);

//   const handleTextChange = (e) => {
//     setText(e.target.value);
//   };

//   const handleBoldClick = () => {
//     setBold(!bold);
//   };

//   const handleItalicClick = () => {
//     setItalic(!italic);
//   };

//   const handleUnderlineClick = () => {
//     setUnderline(!underline);
//   };

//   return (
//     <Form>
//       <Form.Group>
//         <Form.Control
//           type="text"
//           value={text}
//           onChange={handleTextChange}
//         />
//       </Form.Group>
//       <Form.Group>
//         <Button variant="primary" onClick={handleBoldClick}>
//           Bold
//         </Button>
//         <Button variant="primary" onClick={handleItalicClick}>
//           Italic
//         </Button>
//         <Button variant="primary" onClick={handleUnderlineClick}>
//           Underline
//         </Button>
//       </Form.Group>
//       <Form.Group>
//         <p style={{ fontWeight: bold ? 'bold' : 'normal', fontStyle: italic ? 'italic' : 'normal', textDecoration: underline ? 'underline' : 'none' }}>
//           {text}
//         </p>
//       </Form.Group>
//     </Form>
//   );
// };

// export default TextForm;
