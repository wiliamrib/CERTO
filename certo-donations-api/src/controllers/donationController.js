
const Donation = require('../models/donationModel');

class DonationController {
  async createDonation(req, res, next) {
    try {
      const { name, cpf } = req.body;
      
      const donation = new Donation({
        name: name || null,
        cpf: cpf || null
      });
      
      await donation.save();
      res.status(201).json(donation);
    } catch (err) {
      next(err);
    }
  }

  async getDonations(req, res, next) {
    try {
      const donations = await Donation.find().sort({ createdAt: -1 });
      res.status(200).json(donations);
    } catch (err) {
      next(err);
    }
  }

  async deleteDonation(req, res, next) {
    try {
      const { id } = req.params;
      const donation = await Donation.findByIdAndDelete(id);
      
      if (!donation) {
        return res.status(404).json({ message: 'Doação não encontrada' });
      }
      
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = DonationController;