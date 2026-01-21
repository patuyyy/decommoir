async function checkHealth(req, res) {
    try {
        return res.status(200).json({ status: 'OK' });
    } catch (error) {
        return res.status(500).json({ status: 'ERROR', error: error.toString() });
    }
}

module.exports = {
    checkHealth
};