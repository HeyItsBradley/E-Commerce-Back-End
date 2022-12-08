const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint
//http://localhost/api/tags/
router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [
        {
          model: Product,
          attributes: ["product_name"],
        },
      ],
    });
    if (!tagData) {
      res.status(404).json("Could not find tags");
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});
//http://localhost/api/tags/:id
router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          attributes: ["product_name"],
        },
      ],
    });
    if (!tagData) {
      res.status(404).json("Could not find tags with that ID");
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});
//http://localhost/api/tags/
router.post("/", async (req, res) => {
  // create a new tag
  /* req.body should look like this
  {
    tag_name: "Shiny"
  }
  */

  try {
    const newTag = await Tag.create(req.body);

    if (!newTag) {
      res.status(404).json("You didnt enter a tag name");
    }
    res.status(200).json(newTag);
  } catch (err) {
    res.status(500).json(err);
  }
});
//http://localhost/api/tags/:id
router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  /* req.body should look like this
  {
    tag_name: "SuperShiny"
  }
  */
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!req.body) {
      res.status(404).json("No tag was entered");
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});
//http://localhost/api/tags/
router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagData) {
      res.status(404).json("no tag with that id");
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
