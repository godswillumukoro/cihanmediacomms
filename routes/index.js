const path = require("path");
const express = require("express");
const router = express.Router();
const { Resend } = require("resend");
const { requiresAuth } = require("express-openid-connect"); //for ptotected routes

// pagination middleware
function paginatedResults(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    //   query
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    //   next / prev
    const results = {};

    if (endIndex < (await model.countDocuments().exec())) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.prev = {
        page: page - 1,
        limit: limit,
      };
    }

    // results.results = model.slice(startIndex, endIndex);
    try {
      results.results = await model.find().limit(limit).skip(startIndex).exec();
      res.paginatedResults = results;
      next();
    } catch (error) {
      results.status(500).json({
        error: error.message,
      });
    }
  };
}

// resend email package
const resend = new Resend(process.env.RESEND_KEY);

// const uploadDestination = multer({ dest: "uploaded-documents/" });
const { connectToDatabase, getDatabase } = require("../database");
const multer = require("multer");

// Multer storage
multerStorage = multer.diskStorage({
  destination: "./public/uploadFiles/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Multer upload
const multerUpload = multer({
  storage: multerStorage,
  limits: { fileSize: 2000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("file");

// Multer filetype check
function checkFileType(file, cb) {
  // allowed file extensions
  const filetypes = /jpeg|jpg|png|gif|pdf/;
  // check extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // check mimetype
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Only Images and PDFs are allowed");
  }
}

// connect to db
let database;

connectToDatabase((error) => {
  // listen for requests after successfully connecting to DB
  if (!error) {
    database = getDatabase();
    console.log("MongoDB successfully connected");
  }
});

router.get("/", async (req, res) => {
  // try {
  //   const data = await resend.emails.send({
  //     from: "info@cihanmediacomms.com",
  //     to: "umukoro6@gmail.com",
  //     subject: "hello world",
  //     html: "<strong>it works!</strong>",
  //   });
  //   res.render("index", {
  //     title: "Home",
  //   });
  // } catch (error) {
  //   res.status(500).json({ error });
  // }
  console.log(req.oidc.isAuthenticated());

  res.render("index", {
    title: "Home",
  });
});

router.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
  });
});
router.get("/gallery", (req, res) => {
  res.render("gallery", {
    title: "Gallery",
  });
});

router.get("/services/marketing-pr", (req, res) => {
  res.render("services", {
    title: "Marketing PR",
  });
});
router.get("/services/influence-marketing", (req, res) => {
  res.render("services", {
    title: "Influence Marketing",
  });
});
router.get("/services/content-development", (req, res) => {
  res.render("services", {
    title: "Content development",
  });
});
router.get("/services/brand-storytelling", (req, res) => {
  res.render("services", {
    title: "Brand Storytelling",
  });
});
router.get("/services/online-reputation-management", (req, res) => {
  res.render("services", {
    title: "Online Reputation Management",
  });
});
router.get("/services/software-development-and-web-design", (req, res) => {
  res.render("services", {
    title: "Software Development and Web Design",
  });
});
router.get("/services/digital-academy", (req, res) => {
  res.render("services", {
    title: "Digital Academy",
  });
});

router.get("/solutions/cihan-meet", (req, res) => {
  res.redirect("https://cihanmeet.cihanmediacomms.com/");
});
router.get("/solutions/cihan-metricwire", (req, res) => {
  res.render("services", {
    title: "Cihan Metricwire",
  });
});

router.get("/solutions/media-intelligence", (req, res) => {
  res.render("services", {
    title: "Media Intelligence",
  });
});
router.get("/solutions/converged-live-streaming", (req, res) => {
  res.render("services", {
    title: "Converged Live Streaming",
  });
});
router.get("/new-insights", (req, res) => {
  res.render("new-insights", {
    title: "New Insights",
  });
});

router.get("/new-insights/unlocking-consumer-insights", (req, res) => {
  res.render("new-insights-details", {
    title: "Unlocking Consumer Insights",
  });
});
router.get(
  "/new-insights/the-power-of-collaboration-in-growth-pr",
  (req, res) => {
    res.render("new-insights-details", {
      title: "The Power of Collaboration in Growth PR",
    });
  }
);
router.get("/new-insights/how-pr-pros-can-navigate-tiktoks", (req, res) => {
  res.render("new-insights-details", {
    title: "How PR Pros Can Navigate TikTok’s",
  });
});
router.get("/new-insights/get-ready-for-a-digital-revolution", (req, res) => {
  res.render("new-insights-details", {
    title: "Get Ready for a Digital Revolution",
  });
});
router.get("/new-insights/the-future-of-mobile", (req, res) => {
  res.render("new-insights-details", {
    title: "The Future of Mobile",
  });
});

router.get("/contact", (req, res) => {
  res.render("contact", {
    title: "Contact us",
  });
});

router.get("/cihan-form", (req, res) => {
  res.render("cihan-form", {
    title: "Cihan Form",
  });
});

// post cihan-metricwire form
router.post("/cihan-form", (req, res) => {
  // cihanFormData.push(req.body);
  // cihanFormData.push((createdAt = new Date()));

  // Multer Starts
  multerUpload(req, res, (err) => {
    if (err) {
      console.log(err);
    } else {
      if (req.file == undefined) {
        console.log("No file selected");
      } else {
        // cihanFormData.push((uploadedDocumentInfo = req.file));
        const cihanFormData = req.body;
        cihanFormData.createdAt = new Date();
        cihanFormData.uploadedDocumentInfo = req.file;
        console.log(req.body, req.file);

        database
          .collection("cihanMetricwireForm")
          .insertOne(cihanFormData)
          .then((result) => {
            res.render("success", {
              title: "Success!!",
            });
          })
          .catch((erorr) => {
            res.status(500).json({
              status: "error",
              message: "Unable to submit contact form",
            });
          });

        res.render("success"),
          {
            title: "Success!!",
          };
      }
    }
  });
  // Multer Ends
});

//retriving data into dashboard
router.get("/cihan-form-submissions", requiresAuth(), (req, res) => {
  // pagination
  // const page = req.query.page || 0;
  // const messagesPerPage = 10;
  const page = parseInt(req.query.page);
  const messagesPerPage = parseInt(req.query.limit);

  let cihanMetricwireMessages = [];

  try {
    database
      .collection("cihanMetricwireForm")
      .find()
      .sort({ createdAt: -1 })
      .skip(page * messagesPerPage) //skip items per page
      .limit(messagesPerPage) //limit the number of items displayed per page
      .forEach((message) => cihanMetricwireMessages.push(message))
      .then(() => {
        // res.status(200).json(cihanMetricwireMessages);

        res.render("get-cihan-form-submissions", {
          title: "Cihan Form Submissions",
          cihanMetricwireMessages,
        });
      });
  } catch (error) {
    res.status(500).json(error);
  }
});

// post contact form
router.post("/contact-form", (req, res) => {
  const contactFormData = req.body;
  contactFormData.createdAt = new Date();

  database
    .collection("contactForm")
    .insertOne(contactFormData)
    .then((result) => {
      try {
        const data = resend.emails.send({
          from: "info@cihanmediacomms.com",
          to: "umukoro6@gmail.com",
          subject: "hello world",
          html: contactFormData,
        });
        res.render("success", {
          title: "Success!!",
        });
      } catch (error) {
        res.status(500).json({ error });
      }
    })
    .catch((erorr) => {
      res.status(500).json({
        status: "error",
        message: "Unable to submit contact form",
      });
    });
});

router.get("/dashboard", requiresAuth(), (req, res) => {
  res.render("dashboard", {
    title: "Dashboard - Form Submissions",
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user,
  });
});

router.get("/contact-form-submissions", requiresAuth(), (req, res) => {
  // pagination
  // const page = req.query.page || 0;
  // const messagesPerPage = 10;
  let contactMessages = [];

  try {
    database
      .collection("contactForm")
      .find()
      .sort({ createdAt: -1 })
      // .skip(page * messagesPerPage) //skip books per page
      // .limit(messagesPerPage) //limit the number of books displayed per page
      .forEach((message) => contactMessages.push(message))
      .then(() => {
        // res.status(200).json(contactMessages);
        res.render("get-contact-form-submissions", {
          title: "Contact Form Submissions",
          contactMessages,
        });
      });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/*", (req, res) => {
  res.render("404", {
    title: "404 | Page not found",
  });
});

module.exports = router;
