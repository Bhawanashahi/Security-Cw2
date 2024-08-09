const Vendor = require('../model/vendorMakeupModel');
const cloudinary = require('cloudinary');

const vendorMakeupController = {
  createMakeup: async (req, res) => {
    try {
      const { title, experience, type, payment, delivery, travel, location } = req.body;
      const { image } = req.files;

      if (!title || !experience || !type || !payment || !delivery || !travel || !location) {
        return res.json({
          success: false,
          message: "Please fill all the fields."
        });
      }

      const uploadedImage = await cloudinary.v2.uploader.upload(image.path, {
        folder: "vendors",
        crop: "scale"
      });

      const newVendor = new Vendor({
        title,
        experience,
        type,
        payment,
        delivery,
        location,
        travel,
        imageUrl: uploadedImage.secure_url,
      });

      await newVendor.save();
      res.status(201).json({
        success: true,
        message: "Vendor created successfully",
        data: newVendor
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  getAllMakeups: async (req, res) => {
    try {
      const vendors = await Vendor.find();
      res.json(vendors);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getSingleMakeup: async (req, res) => {
    try {
      const vendor = await Vendor.findById(req.params.id);
      if (!vendor) {
        return res.status(404).json({ message: 'Vendor not found' });
      }
      res.json(vendor);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  updateMakeup: async (req, res) => {
    try {
      const { title, experience, type, payment, delivery, location, travel } = req.body;
      const { image } = req.files;
      const id = req.params.id;

      const updatedData = {
        title,
        experience,
        type,
        payment,
        delivery,
        location,
        travel,
      };

      if (image) {
        const uploadedImage = await cloudinary.v2.uploader.upload(image.path, {
          folder: "vendors",
          crop: "scale"
        });
        updatedData.imageUrl = uploadedImage.secure_url;
      }

      const updatedVendor = await Vendor.findByIdAndUpdate(id, updatedData, { new: true });

      if (!updatedVendor) {
        return res.status(404).json({ message: 'Vendor not found' });
      }

      res.json({
        success: true,
        message: "Vendor updated successfully",
        data: updatedVendor
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  deleteMakeup: async (req, res) => {
    try {
      const deletedVendor = await Vendor.findByIdAndDelete(req.params.id);
      if (!deletedVendor) {
        return res.status(404).json({ message: 'Vendor not found' });
      }
      res.json({ message: 'Vendor deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

module.exports = vendorMakeupController;