const Photo = require("../models/gallerymodels");
const fs = require("fs");
const path = require("path");

exports.addPhoto = async (req, res) => {
  try {
    const { title } = req.body;
    const file = req.file;

    if (!title || !file) {
      return res.status(400).json({ message: "Title and photo required" });
    }

    const filename = file.filename;
    const date = new Date();

    const result = await Photo.add(title, filename, date);
    res.status(201).json({
      message: "Photo added successfully",
      id: result.insertId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error" });
  }
};

exports.getAllPhotos = async (req, res) => {
  try {
    const rows = await Photo.getAll();

    // map karke photoUrl add karenge
    const photos = rows.map((p) => ({
      ...p,
      photoUrl: `${req.protocol}://${req.get("host")}/Galleryphoto/${p.filename}`, 
      created_at: new Date(p.date).toLocaleString()
    }));

    res.status(200).json(photos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching photos" });
  }
};


exports.deletePhoto = async (req, res) => {
  try {
    const { id } = req.params;
    const photo = await Photo.getById(id);

    if (!photo) return res.status(404).json({ message: "Photo not found" });

    const filePath = path.join(__dirname, "..", "Galleryphoto", photo.filename);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await Photo.deleteById(id);
    res.json({ message: "Photo deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Delete failed" });
  }
};
