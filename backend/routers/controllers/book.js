const bookModel = require("../../db/models/book");

const CreatNewBook = (req, res) => {
  const userId = req.token.userId
  const { image, name, type, author, description, language, price, rating } =
    req.body;

  const Book = new bookModel({
    image,
    name,
    type,
    author,
    description,
    language,
    price,
    rating,
    userId:userId
  });
  Book.save()
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `Success book Added`,
        book: result,
      });
    })
    .catch((err) => {
      res.status(409).json({
        success: false,
        message: `book already exist `,
        err: err,
      });
    });
};

// this function return all books
const getAllBooks = (req, res) => {
  bookModel
    .find({})
    .then((books) => {
      res.status(200).json({
        success: true,
        message: `All the books `,
        books: books,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    });
};

const FindByCategory = (req, res) => {
  const type = req.params.type;
  bookModel.find({ type }).then((result) => {
    if(!result.length){
  return    res.json({
        success:false,
        message: "incorrect category"
      })
    }
    res.json({
      succes: true,
      book: result
    });
  }).catch((err)=>{
    res.json({
      success:false,
      message: "server error"
    })
  })
};

const getBookByName =(req,res)=>{
  const name = req.params.name;
  bookModel.find({ name }).then((result) => {
    if(!result.length){
    return  res.json({
        success:false,
        message: "incorrect  name of book"
      })}
    res.json({
      succes: true,
      book: result
    });
  }).catch((err)=>{
    res.json("server error")
  })
}

const getBookByAuthor = (req,res)=>{
  const author = req.params.author;
  bookModel
    .find({author })
    .then((result) => {
      if(!result.length){
       return res.json({
          success:false,
          message: "incorrect  name of Author"
        })
      }
      res.status(200);
      res.json({
        success: true,
        massage: `all the books by${author}`,
        book: result,
      });
    })
    .catch((err) => {
     res.json("server error")
    });
}
const getBookByUserId=(req,res)=>{
  const userId = req.token.userId
  bookModel
    .find({userId})
    .then((result) => {
      if(!result.length){
       return res.json({
          success:false,
          message: "incorrect userId"
        })
      }
      res.status(200);
      res.json({
        success: true,
        massage: `all the books by userId`,
        book: result,
      });
    })
    .catch((err) => {
     res.json("server error")
    });

}
const updateBook = (req, res) => {
  const id = req.params.id

  bookModel
    .findByIdAndUpdate(id, req.body, { new: true })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The book => not found`,
        });
      }
      res.status(202).json({
        success: true,
        message: ` Success book updated`,
        book: [result]
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        // err: err,
      });
    });
};

/// Get book by Id

const getBookById = (req ,res)=>{
  let id = req.params.id;

  bookModel.findById(id).then((result) => {
    if (!result) {
      return res.status(404).json({
        success: false,
        message: `The book => not found`,
      });
    }
    res.status(202).json({
      success: true,
      message: ` Success book got`,
      book: [result]
    });
  })
  .catch((err) => {
    res.status(500).json({
      success: false,
      message: `Server Error`,
      Error:err
     
    });
  });
}

module.exports = {
  CreatNewBook,
  getAllBooks,
  FindByCategory,
  getBookByName,
  getBookByAuthor,
  updateBook,
  getBookByUserId,
  getBookById
};
