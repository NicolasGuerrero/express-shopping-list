const express = require("express");
const router = new express.Router();
const ExpressError = require("./expressError");

router.get("/", function(req, res) {
  // rendering list of shopping items
  
  return res.json(items);
});

router.post("/", function(req, res) {
  
  items.push(req.body)
  return res.json({ "added": req.body })
});

router.get("/:name", function(req, res, next){
  let item = items.find(obj => obj.name === req.params.name);
  try {
    if (item !== undefined) {
      return res.json(item);
    } else {
      throw new ExpressError("Item not found", 400);
    }
  } catch (err) {
    return next(err);
  }
});

router.patch("/:name", function(req, res, next) {
  let item = items.find(obj => obj.name === req.params.name);
  
  try {
    if (item !== undefined) {
      if (req.body.name !== undefined) {
        item["name"] = req.body.name 
      }
      if (req.body.price !== undefined) {
        item["price"] = req.body.price 
      }
      return res.json({ "updated": item });
    } else {
      throw new ExpressError("Item not found", 400);
    }
  } catch (err) {
    return next(err);
  } 
    
});

router.delete("/:name", function(req, res, next){
  
  let itemIndex = items.findIndex(obj => obj.name === req.params.name);
  try {
    if (itemIndex !== -1) {
      items.splice(itemIndex, 1);
      return res.json({ "message": "Deleted" });
    } else {
      throw new ExpressError("Item not found", 400);
    }
  } catch (err) {
    return next(err);
  } 
});


module.exports = router;