const express = require('express');

const router = express.Router();

const schoolRepository = require('../repositories/school.repositories');
const { successResponse, errorResponse } = require('../utils/baseResponse');
// Get all schools
async function getAllSchools(req, res) {
    try {
        const schools = await schoolRepository.getAllSchools();
        successResponse(res, 200, "Schools successfully retrieved", schools);
    } catch (error) {
        errorResponse(res, 500, "Failed to retrieve schools", error);
    }
}

module.exports = {
    getAllSchools
};