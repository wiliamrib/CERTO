const express = require('express');
const DonationController = require('../controllers/donationController');

const router = express.Router();
const donationController = new DonationController();

router.post('/', donationController.createDonation.bind(donationController));
router.get('/', donationController.getDonations.bind(donationController));
router.delete('/:id', donationController.deleteDonation.bind(donationController));

module.exports = router;