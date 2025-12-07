const Donation = require('../models/donation.model');

// Função para criar uma nova doação
const createDonation = async (donationData) => {
    try {
        const donation = new Donation(donationData);
        await donation.save();
        return donation;
    } catch (error) {
        throw new Error('Erro ao criar doação: ' + error.message);
    }
};

// Função para obter todas as doações
const getDonations = async () => {
    try {
        const donations = await Donation.find();
        return donations;
    } catch (error) {
        throw new Error('Erro ao obter doações: ' + error.message);
    }
};

// Função para remover uma doação pelo ID
const deleteDonation = async (id) => {
    try {
        const result = await Donation.findByIdAndDelete(id);
        if (!result) {
            throw new Error('Doação não encontrada');
        }
        return result;
    } catch (error) {
        throw new Error('Erro ao remover doação: ' + error.message);
    }
};

module.exports = {
    createDonation,
    getDonations,
    deleteDonation,
};