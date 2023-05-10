const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
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
  res.redirect('https://cihanmeet.cihanmediacomms.com/');
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
router.get("/new-insights/the-power-of-collaboration-in-growth-pr", (req, res) => {
  res.render("new-insights-details", {
    title: "The Power of Collaboration in Growth PR",
  });
});
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

module.exports = router;
